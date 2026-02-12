/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4F46E5", // Indigo/Blue
                secondary: "#10B981", // Emerald/Green
                background: "#F8FAFC",
                text: "#1E293B",
                error: "#EF4444",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 25px rgba(0,0,0,0.1)',
            },
            animation: {
                'fade-in': 'fadeIn 300ms ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
