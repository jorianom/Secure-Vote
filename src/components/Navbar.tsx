"use client";
import { useUserStore } from "../store/userStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; // Iconos para menú responsivo
import Link from "next/link";

const Navbar = () => {
    const { userId, name, clearUser } = useUserStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    console.log(name);
    const handleLogout = () => {
        clearUser();
        alert("Sesión cerrada");
        router.push("/");
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Botón Menú Móvil */}
                <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Links de navegación */}
                <ul className={`absolute top-16 left-0 w-full bg-blue-600 md:flex md:static md:w-auto md:space-x-6 md:items-center 
                    ${menuOpen ? "block" : "hidden"} md:flex-row`}>
                    {
                        !userId ? (
                            <li><Link href="/" className="block px-4 py-2 text-white hover:bg-blue-500 rounded-md">Inicio</Link></li>
                        ) : null
                    }
                    <li><Link href="/vote" className="block px-4 py-2 text-white hover:bg-blue-500 rounded-md">Votar</Link></li>
                    <li><Link href="/results" className="block px-4 py-2 text-white hover:bg-blue-500 rounded-md">Resultados</Link></li>
                </ul>

                {/* Usuario & Botón de sesión */}
                <div className="flex items-center space-x-4">
                    {userId ? (
                        <div className="flex items-center space-x-2">
                            <span className="text-white hidden md:block">👤 {name}</span>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <Link href="/" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
