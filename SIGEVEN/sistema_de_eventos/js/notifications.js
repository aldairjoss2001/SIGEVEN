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

/**
 * Mostrar detalles de un evento en un modal
 * @param {object} eventData - Datos del evento
 */
function showEventDetailsModal(eventData) {
    createNotificationContainer();
    const container = document.getElementById('notification-modal-container');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="
                padding: 2rem;
                border-bottom: 1px solid #e5e7eb;
                background: linear-gradient(135deg, #163E8C 0%, #FED600 100%);
                border-radius: 16px 16px 0 0;
                color: white;
            ">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h2 style="font-size: 1.5rem; margin: 0; flex: 1;">${eventData.title}</h2>
                    <button onclick="this.closest('div').closest('div').closest('div').remove()" 
                            style="background: rgba(255,255,255,0.2); border: none; color: white; cursor: pointer; 
                                   border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; 
                                   justify-content: center; font-size: 24px; margin-left: 16px;">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            
            <div style="padding: 2rem;">
                ${eventData.image ? `
                    <img src="${eventData.image}" alt="${eventData.title}" 
                         style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;">
                ` : ''}
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; color: #163E8C;">
                        <span class="material-symbols-outlined">event</span>
                        <strong>Fecha:</strong>
                        <span>${eventData.date}</span>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; color: #163E8C;">
                        <span class="material-symbols-outlined">schedule</span>
                        <strong>Hora:</strong>
                        <span>${eventData.time || 'Por definir'}</span>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; color: #163E8C;">
                        <span class="material-symbols-outlined">location_on</span>
                        <strong>Ubicación:</strong>
                        <span>${eventData.location}</span>
                    </div>
                    
                    ${eventData.organizer ? `
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; color: #163E8C;">
                            <span class="material-symbols-outlined">person</span>
                            <strong>Organizador:</strong>
                            <span>${eventData.organizer}</span>
                        </div>
                    ` : ''}
                </div>
                
                <div style="background: #f9fafb; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #163E8C; font-size: 1.1rem;">Descripción</h3>
                    <p style="margin: 0; line-height: 1.6; color: #374151;">${eventData.description}</p>
                </div>
                
                ${eventData.capacity ? `
                    <div style="background: #eff6ff; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span class="material-symbols-outlined" style="color: #2563eb;">group</span>
                            <strong style="color: #1e40af;">Capacidad:</strong>
                        </div>
                        <p style="margin: 0; color: #1e40af;">${eventData.attendees || 0} / ${eventData.capacity} inscritos</p>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button onclick="this.closest('div').closest('div').closest('div').closest('div').remove()" 
                            style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 2px solid #163E8C; 
                                   background: white; color: #163E8C; font-weight: 600; cursor: pointer; 
                                   font-size: 1rem;">
                        Cerrar
                    </button>
                    ${eventData.canRegister ? `
                        <button onclick="confirmarAsistenciaEvento('${eventData.id}')" 
                                style="flex: 1; padding: 0.75rem; border-radius: 8px; border: none; 
                                       background: #163E8C; color: white; font-weight: 600; cursor: pointer; 
                                       font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                            <span class="material-symbols-outlined">check_circle</span>
                            Inscribirse
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(modal);
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Mostrar detalles de una solicitud en un modal
 * @param {object} requestData - Datos de la solicitud
 */
function showRequestDetailsModal(requestData) {
    createNotificationContainer();
    const container = document.getElementById('notification-modal-container');
    
    const statusConfig = {
        'pendiente': { color: '#f59e0b', bg: '#fef3c7', icon: 'schedule', text: 'Pendiente' },
        'aprobado': { color: '#22c55e', bg: '#dcfce7', icon: 'check_circle', text: 'Aprobado' },
        'rechazado': { color: '#ef4444', bg: '#fee2e2', icon: 'cancel', text: 'Rechazado' },
        'en_revision': { color: '#3b82f6', bg: '#dbeafe', icon: 'hourglass_empty', text: 'En Revisión' }
    };
    
    const status = statusConfig[requestData.status] || statusConfig['pendiente'];
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="
                padding: 2rem;
                border-bottom: 1px solid #e5e7eb;
                background: ${status.bg};
            ">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h2 style="font-size: 1.5rem; margin: 0 0 0.5rem 0; color: ${status.color};">
                            Detalles de Solicitud
                        </h2>
                        <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; 
                                    background: white; border-radius: 20px; color: ${status.color}; font-weight: 600;">
                            <span class="material-symbols-outlined">${status.icon}</span>
                            ${status.text}
                        </div>
                    </div>
                    <button onclick="this.closest('div').closest('div').closest('div').remove()" 
                            style="background: white; border: none; color: ${status.color}; cursor: pointer; 
                                   border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; 
                                   justify-content: center; font-size: 24px; margin-left: 16px;">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
            
            <div style="padding: 2rem;">
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.75rem 0; color: #163E8C; font-size: 1.2rem;">
                        ${requestData.title || 'Solicitud de Espacio'}
                    </h3>
                </div>
                
                <div style="background: #f9fafb; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #6b7280;">
                            <span class="material-symbols-outlined">meeting_room</span>
                            <strong>Espacio:</strong>
                        </div>
                        <p style="margin: 0 0 0 2rem; color: #111827;">${requestData.space}</p>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #6b7280;">
                            <span class="material-symbols-outlined">event</span>
                            <strong>Fecha:</strong>
                        </div>
                        <p style="margin: 0 0 0 2rem; color: #111827;">${requestData.date}</p>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #6b7280;">
                            <span class="material-symbols-outlined">schedule</span>
                            <strong>Horario:</strong>
                        </div>
                        <p style="margin: 0 0 0 2rem; color: #111827;">${requestData.time}</p>
                    </div>
                    
                    ${requestData.activity ? `
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #6b7280;">
                                <span class="material-symbols-outlined">description</span>
                                <strong>Actividad:</strong>
                            </div>
                            <p style="margin: 0 0 0 2rem; color: #111827;">${requestData.activity}</p>
                        </div>
                    ` : ''}
                    
                    ${requestData.capacity ? `
                        <div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #6b7280;">
                                <span class="material-symbols-outlined">group</span>
                                <strong>Capacidad:</strong>
                            </div>
                            <p style="margin: 0 0 0 2rem; color: #111827;">${requestData.capacity}</p>
                        </div>
                    ` : ''}
                </div>
                
                ${requestData.reason ? `
                    <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; 
                                border-left: 4px solid #f59e0b;">
                        <strong style="color: #92400e; display: block; margin-bottom: 0.5rem;">
                            <span class="material-symbols-outlined" style="vertical-align: middle; font-size: 18px;">info</span>
                            Motivo de la solicitud:
                        </strong>
                        <p style="margin: 0; color: #78350f; line-height: 1.5;">${requestData.reason}</p>
                    </div>
                ` : ''}
                
                ${requestData.notes ? `
                    <div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                        <strong style="color: #1e40af; display: block; margin-bottom: 0.5rem;">Notas adicionales:</strong>
                        <p style="margin: 0; color: #1e3a8a; line-height: 1.5;">${requestData.notes}</p>
                    </div>
                ` : ''}
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button onclick="this.closest('div').closest('div').closest('div').closest('div').remove()" 
                            style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 2px solid #163E8C; 
                                   background: white; color: #163E8C; font-weight: 600; cursor: pointer; 
                                   font-size: 1rem;">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(modal);
    
    // Cerrar al hacer clic fuera del modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(20px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Exportar funciones si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        showSuccessNotification,
        showErrorNotification,
        showWarningNotification,
        showInfoNotification,
        showEventDetailsModal,
        showRequestDetailsModal
    };
}
