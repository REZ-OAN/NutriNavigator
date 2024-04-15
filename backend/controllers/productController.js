import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrorHandlingMiddleware.js";
import ApiFeatures from "../utils/apiFeatures.js";
import { v2 as cloudinary } from "cloudinary";
// creating product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "avatars",
        });

        imagesLinks.push({
            public_id: result["public_id"],
            url: result["secure_url"],
        });
    }

    req.body.images = [...imagesLinks];
    req.body.user = req.user.id.toString();
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product: newProduct,
    });
});

// get All Products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    // result per page
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const uniqueCategories = await Product.distinct("category");
    const apifeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let productsQuery = await apifeature.query.clone();
    const filteredProductsCount = productsQuery.length;
    apifeature.pagination(resultPerPage);
    productsQuery = await apifeature.query;
    res.status(201).json({
        success: true,
        products: productsQuery,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        uniqueCategories,
    });
});

export const getAllAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(201).json({
        success: true,
        products,
    });
});

// get a single product
export const getProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    product = await Product.findOne({ _id: req.params.id });
    res.status(201).json({
        success: true,
        product,
    });
});
// update a product
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "avatars",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = [...imagesLinks];
    }

    product = await Product.updateOne({ _id: req.params.id }, { ...req.body });
    res.status(201).json({
        success: true,
        product,
    });
});

// delete a product
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 403));
    }
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
    }
    product = await Product.deleteOne({ _id: req.params.id });
    res.status(201).json({
        success: true,
        product,
    });
});

// create review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product Is Not Available", 404));
    }
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user.id.toString()
    );
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.reviewscount = product.reviews.length;
    }
    let avg = 0.0;
    product.rating =
        product.reviews
            .map((rev) => rev.rating)
            .reduce((acc, rating) => acc + rating, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
        review,
    });
});

// get all reviews (admin)
export const getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find({}, { reviews: 1 });
    let allReviews = [];
    products.forEach((product) => {
        allReviews = [...allReviews, ...product.reviews];
    });
    res.status(200).json({
        success: true,
        reviews: allReviews,
    });
});
// get Product reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});
// delete reviews
export const deleteReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            rating: ratings,
            reviewscount: numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});

export const getProducts = catchAsyncErrors(async (req, res, next) => {
    const { keywords } = req.body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return next(new ErrorHandler("Products Not Found", 404));
    }
    const processedKeys = keywords.map((key) => {
        return key.split(" (")[0].trim();
    });
    const regexPattern = new RegExp(processedKeys.join("|"), "i");
    const results = await Product.find({
        name: {
            $regex: regexPattern,
        },
    }).select("name _id");
    res.status(200).json({
        recommended_foods: results,
    });
});
