import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrorHandlingMiddleware.js";
import ApiFeatures from "../utils/apiFeatures.js";

// creating product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        success: true,
        newProduct,
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
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev.user.toString() !== req.user.id
    );
    let avg = 0.0;
    const ratings =
        reviews
            .map((rev) => rev.rating)
            .reduce((acc, rating) => acc + rating, 0) / reviews.length;
    const reviewscount = reviews.length;
    await Product.updateOne(
        { _id: req.query.id },
        { reviews, rating: ratings, reviewscount }
    );
    res.status(200).json({
        success: true,
        reviewscount,
    });
});
