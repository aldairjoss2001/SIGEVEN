/**
 * Session Management Module
 * Handles user sessions using sessionStorage (client-side)
 * In production, this would work in conjunction with server-side sessions
 */

const Session = {
    // Session storage key
    SESSION_KEY: 'user_session',
    SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
    
    /**
     * Initialize session
     * @param {object} userData - User data to store in session
     */
    create(userData) {
        const sessionData = {
            id: userData.id,
            tipo_usuario: userData.tipo_usuario,
            nombre: userData.nombre,
            codigo: userData.codigo,
            correo: userData.correo,
            timestamp: Date.now()
        };
        
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
        
        // Also store in a separate key for timeout check
        sessionStorage.setItem('session_start', Date.now().toString());
        
        return sessionData;
    },
    
    /**
     * Get current session data
     * @returns {object|null} Session data or null if not authenticated
     */
    get() {
        const sessionData = sessionStorage.getItem(this.SESSION_KEY);
        
        if (!sessionData) {
            return null;
        }
        
        // Check if session has expired
        if (this.isExpired()) {
            this.destroy();
            return null;
        }
        
        try {
            return JSON.parse(sessionData);
        } catch (e) {
            console.error('Error parsing session data:', e);
            return null;
        }
    },
    
    /**
     * Check if user is authenticated
     * @returns {boolean} True if authenticated, false otherwise
     */
    isAuthenticated() {
        return this.get() !== null;
    },
    
    /**
     * Check if session has expired
     * @returns {boolean} True if expired, false otherwise
     */
    isExpired() {
        const startTime = sessionStorage.getItem('session_start');
        
        if (!startTime) {
            return true;
        }
        
        const elapsed = Date.now() - parseInt(startTime, 10);
        return elapsed > this.SESSION_TIMEOUT;
    },
    
    /**
     * Verify user type
     * @param {string} requiredType - Required user type
     * @returns {boolean} True if user type matches, false otherwise
     */
    verifyUserType(requiredType) {
        const session = this.get();
        
        if (!session) {
            return false;
        }
        
        return session.tipo_usuario === requiredType;
    },
    
    /**
     * Get user type
     * @returns {string|null} User type or null
     */
    getUserType() {
        const session = this.get();
        return session ? session.tipo_usuario : null;
    },
    
    /**
     * Update last activity timestamp
     */
    updateActivity() {
        if (this.isAuthenticated()) {
            sessionStorage.setItem('session_start', Date.now().toString());
        }
    },
    
    /**
     * Destroy current session
     */
    destroy() {
        sessionStorage.removeItem(this.SESSION_KEY);
        sessionStorage.removeItem('session_start');
    },
    
    /**
     * Redirect to login page based on user type
     * @param {string} userType - User type (estudiante, docente, admin)
     */
    redirectToLogin(userType = null) {
        const type = userType || this.getUserType() || 'estudiante';
        
        // Determine current location to build correct path
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // Check if we're in sistema_de_eventos or sistema_de_eventos_admin
        if (currentPath.includes('sistema_de_eventos_admin')) {
            basePath = '';
        } else if (currentPath.includes('sistema_de_eventos')) {
            basePath = '';
        } else {
            // We're in root, go into sistema_de_eventos
            basePath = 'sistema_de_eventos/';
        }
        
        const loginUrls = {
            estudiante: basePath + 'loginEstudiante.html',
            docente: basePath + 'loginDocente.html',
            admin: basePath ? '../sistema_de_eventos_admin/login.html' : 'login.html'
        };
        
        const url = loginUrls[type] || loginUrls.estudiante;
        window.location.href = url;
    },
    
    /**
     * Redirect to profile page based on user type
     * @param {string} userType - User type
     */
    redirectToProfile(userType) {
        // Determine current location to build correct path
        const currentPath = window.location.pathname;
        let basePath = '';
        
        // Check if we're in sistema_de_eventos or sistema_de_eventos_admin or root
        if (currentPath.includes('sistema_de_eventos_admin')) {
            basePath = '../';
        } else if (currentPath.includes('sistema_de_eventos')) {
            basePath = '../';
        } else {
            // We're in root
            basePath = '';
        }
        
        const profileUrls = {
            estudiante: basePath + 'dashboard_estudiante.html',
            docente: basePath + 'dashboard_docente.html',
            admin: basePath + 'dashboard_admin.html'
        };
        
        const url = profileUrls[userType];
        if (url) {
            window.location.href = url;
        }
    },
    
    /**
     * Protect page - redirect if not authenticated or wrong user type
     * Call this function at the beginning of protected pages
     * @param {string} requiredType - Required user type (optional)
     */
    requireAuth(requiredType = null) {
        if (!this.isAuthenticated()) {
            this.redirectToLogin(requiredType);
            return false;
        }
        
        if (requiredType && !this.verifyUserType(requiredType)) {
            // Wrong user type - logout and redirect
            this.destroy();
            this.redirectToLogin(requiredType);
            return false;
        }
        
        // Update activity on each page load
        this.updateActivity();
        return true;
    }
};

// Auto-update activity every 5 minutes if page is active
if (typeof window !== 'undefined') {
    setInterval(() => {
        if (Session.isAuthenticated() && document.visibilityState === 'visible') {
            Session.updateActivity();
        }
    }, 5 * 60 * 1000); // 5 minutes
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Session;
}
