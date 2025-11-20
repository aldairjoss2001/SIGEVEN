/**
 * Authentication Module
 * Handles user authentication (login, logout, registration)
 * Works with API and Session modules
 */

const Auth = {
    /**
     * Login user
     * @param {string} username - Username or user code
     * @param {string} password - Password
     * @param {string} tipo_usuario - User type (estudiante, docente, admin)
     * @returns {Promise<object>} Login result
     */
    async login(username, password, tipo_usuario) {
        try {
            // Validate inputs
            if (!username || !password || !tipo_usuario) {
                return {
                    success: false,
                    message: 'Todos los campos son obligatorios'
                };
            }
            
            // Call API
            const response = await API.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    tipo_usuario: tipo_usuario
                })
            });
            
            // If successful, create session
            if (response.success) {
                Session.create(response.data);
            }
            
            return response;
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Error al procesar la solicitud. Intente nuevamente.'
            };
        }
    },
    
    /**
     * Logout user
     * @returns {Promise<object>} Logout result
     */
    async logout() {
        try {
            // Call API to invalidate server session (in future)
            const response = await API.request('/auth/logout', {
                method: 'POST'
            });
            
            // Destroy local session
            Session.destroy();
            
            return response;
        } catch (error) {
            console.error('Logout error:', error);
            // Even if API call fails, destroy local session
            Session.destroy();
            return {
                success: true,
                message: 'Sesión cerrada localmente'
            };
        }
    },
    
    /**
     * Register new user
     * @param {object} userData - User registration data
     * @returns {Promise<object>} Registration result
     */
    async register(userData) {
        try {
            // Validate required fields
            const { nombre, correo, contrasena, codigo, tipo_usuario } = userData;
            
            if (!nombre || !correo || !contrasena || !codigo || !tipo_usuario) {
                return {
                    success: false,
                    message: 'Todos los campos son obligatorios'
                };
            }
            
            // Validate email format
            if (!this._isValidEmail(correo)) {
                return {
                    success: false,
                    message: 'El formato del correo electrónico no es válido'
                };
            }
            
            // Validate password length
            if (contrasena.length < 6) {
                return {
                    success: false,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                };
            }
            
            // Validate user code format
            const codeValidation = this._validateUserCode(codigo, tipo_usuario);
            if (!codeValidation.valid) {
                return {
                    success: false,
                    message: codeValidation.message
                };
            }
            
            // Call API
            const response = await API.request('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Error al procesar la solicitud. Intente nuevamente.'
            };
        }
    },
    
    /**
     * Verify current session
     * @returns {Promise<object>} Session verification result
     */
    async verifySession() {
        try {
            const response = await API.request('/auth/verify', {
                method: 'GET'
            });
            
            return response;
        } catch (error) {
            console.error('Session verification error:', error);
            return {
                autenticado: false
            };
        }
    },
    
    /**
     * Validate email format
     * @private
     */
    _isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    /**
     * Validate user code format
     * @private
     */
    _validateUserCode(codigo, tipo_usuario) {
        if (tipo_usuario === 'estudiante') {
            if (!/^E[0-9]{5}-[0-9]$/.test(codigo)) {
                return {
                    valid: false,
                    message: 'El formato del código de estudiante debe ser E00000-0'
                };
            }
        } else if (tipo_usuario === 'docente') {
            if (!/^A[0-9]{5}-[0-9]$/.test(codigo)) {
                return {
                    valid: false,
                    message: 'El formato del código de docente debe ser A00000-0'
                };
            }
        }
        
        return { valid: true };
    },
    
    /**
     * Get current user data
     * @returns {object|null} User data or null
     */
    getCurrentUser() {
        return Session.get();
    },
    
    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated() {
        return Session.isAuthenticated();
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
