const PROXY_CONFIG = [
    {
        context: [
            "/usuario/*",
            "/auth/*"
        ],
        target: "http://group.es",
        secure: false,
        changeOrigin : false
    }
]

module.exports = PROXY_CONFIG;