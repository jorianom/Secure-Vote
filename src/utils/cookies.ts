import Cookies from "js-cookie";

export const login = (userId: string) => {
    Cookies.set("userId", userId, { expires: 1 }); // 🔹 Guardar userId por 1 día
};

export const logout = () => {
    Cookies.remove("userId"); // 🔹 Eliminar userId al cerrar sesión
    window.location.href = "/"; // 🔹 Redirigir al home
};
