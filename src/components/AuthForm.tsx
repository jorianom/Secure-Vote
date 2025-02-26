'use client'
import axios from "axios";
import { useState } from "react";

export const AuthForm = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState({
        docType: 'DNI',
        docNumber: '',
        fullName: '',
        password: '',
        birthDate: ''
    });

    const docTypes = ['DNI', 'Pasaporte', 'Cédula', 'Licencia'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isRegistered ? '/api/login' : '/api/register';

        try {
            const response = await axios.post(`http://localhost:3001${endpoint}`, formData);
            console.log(isRegistered ? 'Login exitoso' : 'Registro exitoso', response.data);
        } catch (error) {
            console.error('Error:', error);
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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2">Tipo de Documento</label>
                    <select
                        name="docType"
                        value={formData.docType}
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
                        name="docNumber"
                        value={formData.docNumber}
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
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Juan Pérez"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
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