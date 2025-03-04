import { NextRequest, NextResponse } from "next/server";

// 🔹 Definir rutas protegidas y rutas restringidas para usuarios autenticados
const protectedRoutes = ["/vote"]; // Rutas que requieren sesión
const guestOnlyRoutes = ["/"]; // Rutas que NO deben ser accesibles con sesión activa

export function middleware(req: NextRequest) {
    const userId = req.cookies.get("userId")?.value; // 🔹 Leer el userId desde cookies
    const currentPath = req.nextUrl.pathname; // 🔹 Obtener la ruta actual

    // 🔹 1️⃣ Si el usuario NO está autenticado y quiere entrar a una ruta protegida, redirigirlo a "/"
    if (!userId && protectedRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 🔹 2️⃣ Si el usuario YA está autenticado y quiere entrar a una ruta solo para invitados, redirigirlo a "/vote"
    if (userId && guestOnlyRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/vote", req.url));
    }

    return NextResponse.next(); // 🔹 Permite el acceso normal si no hay restricciones
}

// 🔹 Especificar qué rutas activan el middleware
export const config = {
    matcher: ["/", "/vote"], // Proteger tanto "/" como "/vote"
};
