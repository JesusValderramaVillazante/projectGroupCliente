const PROXY_CONFIG = [
    {
        context: [
            "/evento/*/*",
            "/evento/*",
            "/auth/*",
            "/usuario/*/*", 
            "/usuario/*",
            "/admin/*",        
        ],
        target: "http://group.es",
        secure: false,
        changeOrigin : false
    }
]

module.exports = PROXY_CONFIG;