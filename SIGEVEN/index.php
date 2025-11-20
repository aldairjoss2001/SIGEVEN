<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGEVEN - Sistema de Gestión de Eventos Universitarios</title>
    <link rel="stylesheet" href="sistema_de_eventos/css/auth.css">
    <!-- Material Icons from Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, #163E8C 0%, #1a4ba8 100%);
            padding: 4rem 2rem;
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }
        
        .hero-section h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        
        .hero-section .hero-icon {
            font-size: 3rem !important;
        }
        
        .hero-section p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto 4rem;
            padding: 0 2rem;
        }
        
        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-top: 4px solid #FED600;
        }
        
        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
        
        .feature-icon {
            font-size: 4rem !important;
            color: #163E8C;
            margin-bottom: 1rem;
        }
        
        .feature-card h3 {
            color: #163E8C;
            margin-bottom: 0.75rem;
            font-size: 1.3rem;
        }
        
        .feature-card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .feature-card ul {
            text-align: left;
            color: #555;
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }
        
        .feature-card ul li {
            margin-bottom: 0.5rem;
        }
        
        /* Enhanced Footer */
        .enhanced-footer {
            background: #1a2947;
            color: white;
            padding: 3rem 2rem 1.5rem;
            margin-top: 4rem;
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-section h3 {
            color: #FED600;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .footer-section ul {
            list-style: none;
            padding: 0;
        }
        
        .footer-section li {
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .footer-section a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
            color: #FED600;
        }
        
        .footer-icon {
            font-size: 1.2rem !important;
            color: #FED600;
        }
        
        .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 1.5rem;
            text-align: center;
            color: rgba(255,255,255,0.7);
            font-size: 0.9rem;
        }
        
        .footer-bottom p {
            margin: 0.5rem 0;
        }
        
        .btn-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 2rem;
            background: #163E8C;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            margin: 0.5rem;
        }
        
        .btn-cta:hover {
            background: #0f2d6b;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .btn-cta-secondary {
            background: #FED600;
            color: #163E8C;
        }
        
        .btn-cta-secondary:hover {
            background: #e5c200;
        }
    </style>
</head>
<body>
    <a class="skip-link" href="#main">Saltar al contenido</a>

    <header>
        <div class="header-inner">
            <img src="sistema_de_eventos/assets/icons/logo.png" alt="logo" class="logo" />
            <nav class="main-nav" aria-label="Menú principal">
                <ul class="main-menu">
                    <li><a href="index.php">INICIO</a></li>
                    <li><a href="#">AYUDA</a></li>
                    <li><a href="#">CONTACTO</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main id="main">
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>
                <span class="material-symbols-outlined hero-icon">event_note</span>
                SIGEVEN
            </h1>
            <p>Sistema de Gestión de Eventos Universitarios - EMI</p>
            <div>
                <a href="login.php" class="btn-cta">
                    <span class="material-symbols-outlined">login</span>
                    Iniciar Sesión
                </a>
                <a href="crear_usuario_demo.php" class="btn-cta btn-cta-secondary">
                    <span class="material-symbols-outlined">person_add</span>
                    Registrarse
                </a>
            </div>
        </section>

        <!-- Features Grid -->
        <div class="features-grid">
            <!-- Students Card -->
            <div class="feature-card">
                <span class="material-symbols-outlined feature-icon">groups</span>
                <h3>Para Estudiantes</h3>
                <p>Accede a eventos universitarios de manera fácil y organizada</p>
                <ul>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Consulta eventos académicos</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Registro a actividades</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Calendario integrado</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Notificaciones en tiempo real</li>
                </ul>
            </div>

            <!-- Teachers Card -->
            <div class="feature-card">
                <span class="material-symbols-outlined feature-icon">school</span>
                <h3>Para Docentes</h3>
                <p>Gestiona y organiza eventos académicos de manera eficiente</p>
                <ul>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Creación de eventos</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Gestión de participantes</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Seguimiento y reportes</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Comunicación directa</li>
                </ul>
            </div>

            <!-- Admin Card -->
            <div class="feature-card">
                <span class="material-symbols-outlined feature-icon">admin_panel_settings</span>
                <h3>Para Administrativos</h3>
                <p>Control completo del sistema de gestión de eventos</p>
                <ul>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Panel de control completo</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Gestión de usuarios</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Aprobación de eventos</li>
                    <li><span class="material-symbols-outlined" style="font-size: 1rem; vertical-align: middle; color: #FED600;">check_circle</span> Estadísticas y reportes</li>
                </ul>
            </div>
        </div>
    </main>

    <!-- Enhanced Footer -->
    <footer class="enhanced-footer">
        <div class="footer-content">
            <!-- EMI Central -->
            <div class="footer-section">
                <h3>
                    <span class="material-symbols-outlined footer-icon">location_on</span>
                    EMI Central
                </h3>
                <ul>
                    <li>
                        <span class="material-symbols-outlined footer-icon">home</span>
                        Av. Arce No. 2642, Zona San Jorge
                    </li>
                    <li>La Paz, Bolivia</li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">phone</span>
                        +591 2432266
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">phone_android</span>
                        +591 71535093
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">email</span>
                        dnis@adm.emi.edu.bo
                    </li>
                </ul>
            </div>

            <!-- Unidades Académicas -->
            <div class="footer-section">
                <h3>
                    <span class="material-symbols-outlined footer-icon">apartment</span>
                    Unidades Académicas
                </h3>
                <ul>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="#">La Paz</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="#">Santa Cruz</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="#">Cochabamba</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="#">Riberalta</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="#">Trópico</a>
                    </li>
                </ul>
            </div>

            <!-- Páginas Relacionadas -->
            <div class="footer-section">
                <h3>
                    <span class="material-symbols-outlined footer-icon">link</span>
                    Páginas Relacionadas
                </h3>
                <ul>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="https://www.mindef.gob.bo" target="_blank">Ministerio de Defensa del Estado Plurinacional de Bolivia</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="https://www.ejercito.mil.bo" target="_blank">Ejército de Bolivia</a>
                    </li>
                    <li>
                        <span class="material-symbols-outlined footer-icon">chevron_right</span>
                        <a href="https://www.ceub.edu.bo" target="_blank">Comité Ejecutivo de la Universidad Boliviana</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <p><strong>2025 © Escuela Militar de Ingeniería</strong></p>
            <p>Fecha de última actualización: 20/11/2025</p>
        </div>
    </footer>
</body>
</html>
