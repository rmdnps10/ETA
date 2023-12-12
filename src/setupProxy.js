const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    // app.use(
    //     "/api",
    //     createProxyMiddleware({
    //         target: "http://localhost:3000",
    //         changeOrigin: true,
    //     })
    // );
    // app.use(
    //     createProxyMiddleware("/database",{
    //         target: "http://localhost:8000",
    //         pathRewrite: {
    //             '^/database':''
    //         },
    //         changeOrigin: true
    //     })
    // );
    app.use(
        createProxyMiddleware('/database', {
            target: process.env.REACT_APP_DB_URL,
            pathRewrite: {
                '^/database':''
            },
            changeOrigin: true
        })
    );
};
