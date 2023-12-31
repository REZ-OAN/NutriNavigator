// get token and store it on cookie
export const sendToken = (user, statusCode, res) => {
    const token = user.getJWT();
    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};
