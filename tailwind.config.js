module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'), require('flowbite/plugin'),
    ],
}
