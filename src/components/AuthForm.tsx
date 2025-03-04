'use client'
import { useState } from "react";

interface ErrorAPI {
    error: string;
}
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../services/userService";
import { useUserStore } from "../store/userStore";

const initialFormState = {
    document_type: "DNI",
    document_number: "",
    name: "",
    password: "",
    birthDate: "",
};
export const AuthForm = () => {
    const [isRegistered, setIsRegistered] = useState(true);
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormState);

    const docTypes = ['DNI', 'Pasaporte', 'Cédula', 'Licencia'];
    const [formError, setFormError] = useState<string | null>(null); // Error general

    const resetForm = () => {
        setFormData(initialFormState);
    };
    const validateForm = (): boolean => {
        // Validar Número de Documento (solo números, mínimo 5 dígitos)
        if (!/^\d{5,15}$/.test(formData.document_number)) {
            setFormError("Número de documento inválido (5-15 dígitos numéricos).");
            return false;
        }

        // Validar Nombre (permitir espacios, pero no al inicio o final)
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+(?: [A-Za-zÁÉÍÓÚáéíóúñÑ]+)*$/.test(formData.name)) {
            setFormError("Nombre inválido. No debe contener espacios al inicio o final.");
        }

        // // Validar Contraseña (mínimo 8 caracteres, al menos una mayúscula y un número)
        if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
            setFormError("Contraseña inválida. Debe tener mínimo 8 caracteres, una mayúscula y un número.");
            return false;
        }

        // // Validar Fecha de Nacimiento (mayor de 18 años)
        // const birthDate = new Date(formData.birthDate);
        // const age = new Date().getFullYear() - birthDate.getFullYear();
        // if (isNaN(birthDate.getTime()) || age < 18) {
        //     setFormError("Debes ser mayor de 18 años para registrarte.");
        //     return false;
        // }

        setFormError(null);
        return true;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            console.log('formData:', formData);
            if (isRegistered) {
                const response = await loginUser({ document_number: formData.document_number, password: formData.password, document_type: formData.document_type });
                console.log("Usuario logueado: ", response);
                useUserStore.getState().setUserLogin(response.user.id, response.user.name, response.token);
                router.push("/vote");
            } else {
                const response = await registerUser(formData);
                resetForm();
                setIsRegistered(true);
                console.log("Usuario registrado: ", response);
                router.push("/");
            }

        } catch (error) {
            console.error('Error: funcion', error);
            if (error) {
                setFormError((error as ErrorAPI).error);
            } else {
                setFormError("An unknown error occurred.");
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {isRegistered ? 'Iniciar Sesión' : 'Registro de Votante'}
            </h2>
            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {formError}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Tipo de Documento</label>
                    <select
                        name="document_type"
                        value={formData.document_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        {docTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Número de Documento</label>
                    <input
                        type="text"
                        name="document_number"
                        value={formData.document_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12345678"
                    />
                </div>

                {!isRegistered && (
                    <>
                        <div>
                            <label className="block text-gray-700 mb-2">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Juan Pérez"
                            />
                        </div>
                        {/* 
                        <div>
                            <label className="block text-gray-700 mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div> */}
                    </>
                )}

                <div>
                    <label className="block text-gray-700 mb-2">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {isRegistered ? 'Ingresar' : 'Registrarse'}
                </button>

                <button
                    type="button"
                    onClick={() => setIsRegistered(!isRegistered)}
                    className="w-full text-center text-blue-600 hover:underline mt-4"
                >
                    {isRegistered
                        ? '¿No tienes cuenta? Regístrate aquí'
                        : '¿Ya estás registrado? Inicia sesión'}
                </button>
            </form>
        </div>
    );
};