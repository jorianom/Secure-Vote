
export const Footer = () => {

    return (

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            <div className="mt-8 text-center animate-fadeIn">
                <p
                    className="text-gray-600 text-lg"
                    style={{
                        fontFamily: "'Pacifico', cursive",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                        background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    Made with 🌙 by {" "}
                    <a
                        href="https://github.com/jorianom"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 transition-colors duration-300"
                    >
                        @us
                    </a>
                </p>
            </div>
        </footer>
    )
}
