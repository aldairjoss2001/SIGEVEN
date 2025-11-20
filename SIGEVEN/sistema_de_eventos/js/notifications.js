/**
 * Sistema de Notificaciones Modales
 * Notificaciones atractivas con Material Icons de Google Fonts
 */

// Crear el contenedor de notificaciones si no existe
function createNotificationContainer() {
    if (!document.getElementById('notification-modal-container')) {
        const container = document.createElement('div');
        container.id = 'notification-modal-container';
        document.body.appendChild(container);
    }
}

/**
 * Mostrar notificación modal
 * @param {string} type - Tipo de notificación: 'success', 'error', 'warning', 'info'
 * @param {string} title - Título de la notificación
 * @param {string} message - Mensaje de la notificación
 * @param {function} onClose - Callback cuando se cierra la notificación
 * @param {string} redirectUrl - URL opcional para redireccionar al cerrar
 */
function showNotification(type, title, message, onClose = null, redirectUrl = null) {
    createNotificationContainer();
    
    const container = document.getElementById('notification-modal-container');
    
    // Configuración de iconos y colores según el tipo
    const config = {
        success: {
            icon: 'check_circle',
            color: '#22c55e',
            bgColor: '#dcfce7'
        },
        error: {
            icon: 'cancel',
            color: '#ef4444',
            bgColor: '#fee2e2'
        },
        warning: {
            icon: 'warning',
            color: '#f59e0b',
            bgColor: '#fef3c7'
        },
        info: {
            icon: 'info',
            color: '#3b82f6',
            bgColor: '#dbeafe'
        }
    };
    
    const style = config[type] || config.info;
    
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'notification-modal-overlay';
    modal.innerHTML = `
        <div class="notification-modal">
            <div class="notification-icon-container" style="background: ${style.bgColor};">
                <span class="material-symbols-outlined notification-icon" style="color: ${style.color}; font-size: 4rem;">
                    ${style.icon}
                </span>
            </div>
            <h2 class="notification-title">${title}</h2>
            <p class="notification-message">${message}</p>
            <button class="notification-btn" style="background: ${style.color};">
                <span class="material-symbols-outlined">check</span>
                Aceptar
            </button>
        </div>
    `;
    
    // Estilos inline para el modal
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .notification-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .notification-modal {
            background: white;
            border-radius: 16px;
            padding: 2.5rem;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.4s ease;
        }
        
        .notification-icon-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }
        
        .notification-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
        }
        
        .notification-title {
            color: #1f2937;
            font-size: 1.75rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        
        .notification-message {
            color: #6b7280;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .notification-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 2rem;
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .notification-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .notification-btn:active {
            transform: translateY(0);
        }
        
        .notification-btn .material-symbols-outlined {
            font-size: 1.25rem;
        }
    `;
    
    document.head.appendChild(styleSheet);
    container.appendChild(modal);
    
    // Cerrar al hacer clic en el botón
    const btn = modal.querySelector('.notification-btn');
    btn.addEventListener('click', () => {
        modal.remove();
        if (onClose) onClose();
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    });
    
    // Cerrar al hacer clic fuera del modal (opcional)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onClose) onClose();
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    });
}

// Funciones de conveniencia
function showSuccessNotification(title, message, onClose = null, redirectUrl = null) {
    showNotification('success', title, message, onClose, redirectUrl);
}

function showErrorNotification(title, message, onClose = null) {
    showNotification('error', title, message, onClose);
}

function showWarningNotification(title, message, onClose = null) {
    showNotification('warning', title, message, onClose);
}

function showInfoNotification(title, message, onClose = null) {
    showNotification('info', title, message, onClose);
}

// Exportar funciones si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        showSuccessNotification,
        showErrorNotification,
        showWarningNotification,
        showInfoNotification
    };
}
