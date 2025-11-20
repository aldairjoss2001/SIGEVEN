/**
 * User Management Module
 * Utility functions for user-related operations
 */

const User = {
    /**
     * Display user information in the page
     * Updates elements with user data
     */
    displayUserInfo() {
        const userData = Session.get();
        
        if (!userData) {
            return;
        }
        
        // Update elements with specific IDs if they exist
        const nameElement = document.getElementById('user-name') || 
                          document.querySelector('.user-name') ||
                          document.querySelector('[data-user-name]');
        
        const codeElement = document.getElementById('user-code') || 
                          document.querySelector('.user-code') ||
                          document.querySelector('[data-user-code]');
        
        const emailElement = document.getElementById('user-email') || 
                           document.querySelector('.user-email') ||
                           document.querySelector('[data-user-email]');
        
        const typeElement = document.getElementById('user-type') || 
                          document.querySelector('.user-type') ||
                          document.querySelector('[data-user-type]');
        
        if (nameElement) {
            nameElement.textContent = userData.nombre;
        }
        
        if (codeElement) {
            codeElement.textContent = userData.codigo;
        }
        
        if (emailElement) {
            emailElement.textContent = userData.correo;
        }
        
        if (typeElement) {
            const typeNames = {
                estudiante: 'Estudiante',
                docente: 'Docente',
                admin: 'Administrador'
            };
            typeElement.textContent = typeNames[userData.tipo_usuario] || userData.tipo_usuario;
        }
    },
    
    /**
     * Get user type label in Spanish
     * @param {string} tipo - User type
     * @returns {string} User type label
     */
    getUserTypeLabel(tipo) {
        const labels = {
            estudiante: 'Estudiante',
            docente: 'Docente',
            admin: 'Administrador'
        };
        return labels[tipo] || tipo;
    },
    
    /**
     * Format user code for display
     * @param {string} codigo - User code
     * @param {string} tipo - User type
     * @returns {string} Formatted code with label
     */
    formatUserCode(codigo, tipo) {
        const prefixes = {
            estudiante: 'Código de Estudiante: ',
            docente: 'Código de Docente: ',
            admin: 'Usuario: '
        };
        return (prefixes[tipo] || '') + codigo;
    },
    
    /**
     * Validate user code format
     * @param {string} codigo - User code to validate
     * @param {string} tipo - User type
     * @returns {boolean} True if valid, false otherwise
     */
    isValidCode(codigo, tipo) {
        if (tipo === 'estudiante') {
            return /^E[0-9]{5}-[0-9]$/.test(codigo);
        } else if (tipo === 'docente') {
            return /^A[0-9]{5}-[0-9]$/.test(codigo);
        }
        return true; // Admin can have any format
    },
    
    /**
     * Get user initials for avatar
     * @param {string} nombre - User name
     * @returns {string} User initials
     */
    getInitials(nombre) {
        if (!nombre) return '??';
        
        const words = nombre.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return nombre.substring(0, 2).toUpperCase();
    },
    
    /**
     * Update logout links to use JavaScript handler
     */
    setupLogoutLinks() {
        const logoutLinks = document.querySelectorAll('a[href*="logout"], a[href*="php/logout"]');
        
        logoutLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                
                // Get user type before logout
                const userType = Session.getUserType();
                
                // Perform logout
                const result = await Auth.logout();
                
                // Redirect to appropriate login page
                Session.redirectToLogin(userType);
            });
        });
    },
    
    /**
     * Initialize user-related functionality on page load
     */
    init() {
        // Display user info if authenticated
        if (Session.isAuthenticated()) {
            this.displayUserInfo();
        }
        
        // Setup logout links
        this.setupLogoutLinks();
    }
};

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => User.init());
    } else {
        User.init();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = User;
}
