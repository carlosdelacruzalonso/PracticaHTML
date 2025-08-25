console.log("Script iniciado correctamente");

// variables globales
let loadingComplete = false;
var loadingStarted = false;

function startLoading() {
    if (loadingStarted) return;
    loadingStarted = true;
    
    console.log("Iniciando carga...");  // debug
    
    const progressBar = document.getElementById('progressFill');
    let progressText = document.querySelector('.progress-text');
    var progress = 0;
    
    function updateProgress() {
        progress += 25;  // mas facil que progress = progress + 25
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (progressText) {
            progressText.textContent = progress + '%';
        }
        
        console.log("Progreso: " + progress + "%");
        
        if (progress >= 100) {
            setTimeout(finishLoading, 500);
        } else {
            // actualiza cada 400ms
            setTimeout(updateProgress, 400);
        }
    }
    
    setTimeout(updateProgress, 300);
}

function finishLoading() {
    console.log("Terminando carga...");
    
    let loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            loadingComplete = true;
            console.log("Carga completada!");
        }, 500);
    } else {
        loadingComplete = true;
        console.log("Carga completada (sin pantalla)!");
    }
}

// navegacion smooth scroll (copie esto de stackoverflow y lo modifique)
function setupNavigation() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let target = document.querySelector(targetId);
            
            if (target) {
                // esto hace el scroll suave
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Menu hamburguesa para movil
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // toggle del menu (abrir/cerrar)
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                console.log("menu cerrado"); 
            } else {
                navMenu.classList.add('active');
                console.log("menu abierto");
            }
        });
        
    }
}

// Formulario de contacto
function setupForm() {
    var form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // evita que se envie de verdad
            
            // cojo los valores del form
            const name = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('mensaje').value;
            
            // validacion basica
            if (name && email && message) {
                // aqui deberia enviar a un servidor pero no tengo backend
                alert('Mensaje enviado correctamente!\n\nGracias ' + name + '.');
                form.reset();
                
                // guardo en localStorage para pruebas
                localStorage.setItem('lastMessage', JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    date: new Date().toISOString()
                }));
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    }
}

// Reloj del sistema
function setupClock() {
    let timeElement = document.getElementById('systemTime');
    
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            
            // añado el 0 delante si es menor de 10
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;
            
            timeElement.textContent = hours + ':' + minutes;
        }
        
        updateTime(); // actualiza inmediatamente
        setInterval(updateTime, 1000); // actualiza cada segundo
    }
}

// Popup de cookies (obligatorio por RGPD)
function showCookies() {
    const cookieDialog = document.getElementById('cookieDialog');
    
    // solo muestra si no ha aceptado antes
    if (!localStorage.getItem('cookiesAccepted')) {
        if (cookieDialog) {
            setTimeout(function() {
                cookieDialog.style.display = 'block';
            }, 3000); // espera 3 segundos para no molestar
        }
    }
}

function acceptCookies() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
    // guardo que acepto cookies
    localStorage.setItem('cookiesAccepted', 'true');
    console.log('Cookies aceptadas');
}

function declineCookies() {
    const cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
    // no guardo nada si rechaza
    console.log('Cookies rechazadas');
}

function hideCookieDialog() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
}

// Easter egg: info del sistema
function showSystemInfo() {
    let info = 'Información del Sistema\n';
    info += '======================\n\n';
    info += 'Portfolio v1.0 Beta\n'; 
    info += 'Autor: Carlos de la Cruz\n';
    info += 'ASIR 2024\n';
    info += 'Navegador: ' + navigator.userAgent.substring(0, 30) + '...\n';
    info += 'Resolución: ' + window.innerWidth + ' x ' + window.innerHeight + '\n\n';
    info += 'Estado: OK\n';
    
    alert(info);
}

// Politica de privacidad (texto provisional)
function showPrivacyPolicy(event) {
    if (event) event.preventDefault();
    
    let policy = 'POLÍTICA DE PRIVACIDAD\n\n';
    policy += 'Este sitio web utiliza cookies técnicas necesarias.\n';
    policy += 'No compartimos tus datos con terceros.\n';
    policy += 'Cumplimos con el RGPD y LOPD.\n\n';
    policy += 'Para más información: carlosdelacruzalonso@gmail.com';
    
    alert(policy);
}

// Inicializar todo cuando carga la pagina
function initializeEverything() {
    console.log("Inicializando componentes...");
    
    try {
        setupNavigation();
        setupMobileMenu();
        setupForm();
        setupClock();
        showCookies();
        
        // enlace de privacidad
        const privacyLink = document.getElementById('privacyLink');
        if (privacyLink) {
            privacyLink.addEventListener('click', showPrivacyPolicy);
        }
        
        console.log("Todo inicializado OK!");
    } catch(error) {
        console.error("Error al inicializar:", error);
    }
}

// Eventos cuando carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado");
    
    // pequeño delay para que se vea la pantalla de carga
    setTimeout(startLoading, 100);
    setTimeout(initializeEverything, 2000);
});

// Por si acaso el DOMContentLoaded no funciona
window.addEventListener('load', function() {
    console.log("Window load");
    if (!loadingStarted) {
        setTimeout(startLoading, 100);
    }
});

// Timeout de seguridad por si algo falla
setTimeout(function() {
    if (!loadingStarted) {
        console.warn("Forzando inicio de carga");
        startLoading();
    }
    if (!loadingComplete) {
        setTimeout(finishLoading, 1000);
    }
}, 1500);

// Saltar pantalla de carga al hacer click
document.addEventListener('click', function() {
    if (loadingStarted && !loadingComplete) {
        console.log("Saltando pantalla de carga");
        finishLoading();
    }
});

// Por si se queda colgado
setTimeout(function() {
    if (!loadingComplete) {
        console.warn("Timeout - forzando fin de carga");
        finishLoading();
    }
}, 4000);

console.log("script.js cargado");

// Exportar funciones al window para poder usarlas desde HTML
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.hideCookieDialog = hideCookieDialog;
window.showSystemInfo = showSystemInfo;

// Debug: ver que hay en localStorage
console.log("LocalStorage actual:", localStorage);