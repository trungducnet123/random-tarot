/** @type {import('next').NextConfig} */
module.exports = {
    basePath: '/random-tarot',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/random-tarot',
                basePath: false,
                permanent: false
            }
        ]
    }
};