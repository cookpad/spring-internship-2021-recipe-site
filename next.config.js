module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/recipes',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['img.cpcdn.com'],
    },
}