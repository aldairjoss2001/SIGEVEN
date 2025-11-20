/**
 * API Module - Centralized API communication layer
 * This module provides a wrapper for all API calls with mock data support
 * In the future, this will connect to a real backend API
 */

const API = {
    // Base URL - will be configured to point to real API in the future
    baseURL: '/api',
    
    // Mock data flag - set to false when real API is available
    useMockData: true,
    
    /**
     * Generic fetch wrapper with error handling
     * @param {string} endpoint - API endpoint
     * @param {object} options - Fetch options
     * @returns {Promise} Response data
     */
    async request(endpoint, options = {}) {
        // If using mock data, return mock responses
        if (this.useMockData) {
            return this._mockRequest(endpoint, options);
        }
        
        // Real API call (for future implementation)
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },
    
    /**
     * Mock request handler for development
     * Simulates API responses with delays
     */
    async _mockRequest(endpoint, options) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;
        
        // Mock responses for different endpoints
        if (endpoint === '/auth/login' && method === 'POST') {
            return this._mockLogin(body);
        } else if (endpoint === '/auth/logout' && method === 'POST') {
            return this._mockLogout();
        } else if (endpoint === '/auth/register' && method === 'POST') {
            return this._mockRegister(body);
        } else if (endpoint === '/auth/verify' && method === 'GET') {
            return this._mockVerifySession();
        }
        
        // Default response for unknown endpoints
        return {
            success: true,
            data: null,
            message: 'Mock response'
        };
    },
    
    /**
     * Mock login response
     */
    _mockLogin(credentials) {
        const { username, password, tipo_usuario } = credentials;
        
        // Mock user data - these would come from the database in production
        const mockUsers = {
            estudiante: {
                'E20250-1': { password: 'test123', nombre: 'Juan Pérez González', correo: 'juan.perez@est.emi.edu.bo' },
                'E20250-2': { password: 'test123', nombre: 'María López Silva', correo: 'maria.lopez@est.emi.edu.bo' }
            },
            docente: {
                'A20250-1': { password: 'test123', nombre: 'Dr. Roberto Gutiérrez', correo: 'roberto.gutierrez@doc.emi.edu.bo' },
                'A20250-2': { password: 'test123', nombre: 'Ing. Ana Fernández', correo: 'ana.fernandez@doc.emi.edu.bo' }
            },
            admin: {
                'admin': { password: 'admin123', nombre: 'Administrador del Sistema', correo: 'admin@emi.edu.bo' }
            }
        };
        
        // Check if user exists and password matches
        const userType = mockUsers[tipo_usuario];
        if (userType && userType[username] && userType[username].password === password) {
            return {
                success: true,
                data: {
                    id: Math.floor(Math.random() * 1000),
                    tipo_usuario: tipo_usuario,
                    nombre: userType[username].nombre,
                    codigo: username,
                    correo: userType[username].correo
                },
                message: 'Login exitoso'
            };
        }
        
        return {
            success: false,
            message: 'Credenciales incorrectas o usuario inactivo'
        };
    },
    
    /**
     * Mock logout response
     */
    _mockLogout() {
        return {
            success: true,
            message: 'Sesión cerrada correctamente'
        };
    },
    
    /**
     * Mock register response
     */
    _mockRegister(userData) {
        const { codigo, nombre, correo, tipo_usuario } = userData;
        
        // Validate required fields
        if (!nombre || !correo || !tipo_usuario) {
            return {
                success: false,
                message: 'Todos los campos son obligatorios'
            };
        }
        
        // Validate code format for institutional users (not for external)
        if (tipo_usuario !== 'externo') {
            if (!codigo) {
                return {
                    success: false,
                    message: 'El código de usuario es obligatorio'
                };
            }
            
            if (tipo_usuario === 'estudiante' && !/^E[0-9]{5}-[0-9]$/.test(codigo)) {
                return {
                    success: false,
                    message: 'El formato del código de estudiante debe ser E00000-0'
                };
            }
            
            if (tipo_usuario === 'docente' && !/^A[0-9]{5}-[0-9]$/.test(codigo)) {
                return {
                    success: false,
                    message: 'El formato del código de docente debe ser A00000-0'
                };
            }
        }
        
        // Simulate successful registration
        return {
            success: true,
            message: 'Usuario registrado correctamente. Ya puedes iniciar sesión.',
            data: {
                id: Math.floor(Math.random() * 1000),
                tipo_usuario: tipo_usuario,
                nombre: nombre,
                correo: correo,
                codigo: codigo || `EXT${Math.floor(Math.random() * 10000)}`
            }
        };
    },
    
    /**
     * Mock session verification
     */
    _mockVerifySession() {
        // Check if there's a session in sessionStorage
        const sessionData = sessionStorage.getItem('user_session');
        
        if (sessionData) {
            const user = JSON.parse(sessionData);
            return {
                autenticado: true,
                usuario: user
            };
        }
        
        return {
            autenticado: false
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
