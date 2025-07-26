console.log("Script iniciado correctamente");

var loadingComplete = false;
var loadingStarted = false;

function startLoading() {
    if (loadingStarted) return;
    loadingStarted = true;
    
    console.log("Iniciando carga...");
    
    var progressBar = document.getElementById('progressFill');
    var progressText = document.querySelector('.progress-text');
    var progress = 0;
    
    function updateProgress() {
        progress = progress + 25;
        
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
            setTimeout(updateProgress, 400);
        }
    }
    
    setTimeout(updateProgress, 300);
}

function finishLoading() {
    console.log("Terminando carga...");
    
    var loadingScreen = document.getElementById('loadingScreen');
    
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

function setupNavigation() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

function setupMobileMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            } else {
                navMenu.classList.add('active');
            }
        });
    }
}

function setupForm() {
    var form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('nombre').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('mensaje').value;
            
            if (name && email && message) {
                alert('Mensaje enviado correctamente!\n\nGracias ' + name + '.');
                form.reset();
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    }
}

function setupClock() {
    var timeElement = document.getElementById('systemTime');
    
    if (timeElement) {
        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;
            
            timeElement.textContent = hours + ':' + minutes;
        }
        
        updateTime();
        setInterval(updateTime, 1000);
    }
}

function showCookies() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        setTimeout(function() {
            cookieDialog.style.display = 'block';
        }, 3000);
    }
}

function acceptCookies() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
    console.log('Cookies aceptadas');
}

function declineCookies() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
    console.log('Cookies rechazadas');
}

function hideCookieDialog() {
    var cookieDialog = document.getElementById('cookieDialog');
    if (cookieDialog) {
        cookieDialog.style.display = 'none';
    }
}

function showSystemInfo() {
    var info = 'Información del Sistema\n';
    info += '======================\n\n';
    info += 'Portfolio GUI v2.1\n';
    info += 'Desarrollador: Carlos de la Cruz\n';
    info += 'Navegador: ' + navigator.userAgent.substring(0, 30) + '...\n';
    info += 'Resolución: ' + window.innerWidth + ' x ' + window.innerHeight + '\n\n';
    info += 'Estado: Operativo\n';
    info += 'Memoria: Óptima\n';
    info += 'Red: Conectado';
    
    alert(info);
}

function showPrivacyPolicy(event) {
    if (event) event.preventDefault();
    
    var policy = 'POLÍTICA DE PRIVACIDAD\n\n';
    policy += 'Este sitio web utiliza cookies técnicas.\n';
    policy += 'No recopilamos datos sin consentimiento.\n';
    policy += 'Cumplimos con el RGPD.\n\n';
    policy += 'Contacto: carlosdelacruzalonso@gmail.com';
    
    alert(policy);
}

function initializeEverything() {
    console.log("Inicializando componentes...");
    
    setupNavigation();
    setupMobileMenu();
    setupForm();
    setupClock();
    showCookies();
    
    var privacyLink = document.getElementById('privacyLink');
    if (privacyLink) {
        privacyLink.addEventListener('click', showPrivacyPolicy);
    }
    
    console.log("Componentes inicializados!");
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM listo - iniciando carga");
    setTimeout(startLoading, 100);
    setTimeout(initializeEverything, 2000);
});

window.addEventListener('load', function() {
    console.log("Window cargado");
    if (!loadingStarted) {
        setTimeout(startLoading, 100);
    }
});

setTimeout(function() {
    console.log("Timeout de seguridad");
    if (!loadingStarted) {
        startLoading();
    }
    if (!loadingComplete) {
        setTimeout(finishLoading, 1000);
    }
}, 1500);

document.addEventListener('click', function() {
    if (loadingStarted && !loadingComplete) {
        console.log("Click detectado - saltando carga");
        finishLoading();
    }
});

setTimeout(function() {
    if (!loadingComplete) {
        console.log("Forzando completado");
        finishLoading();
    }
}, 4000);

console.log("JavaScript cargado sin errores");

window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
window.hideCookieDialog = hideCookieDialog;
window.showSystemInfo = showSystemInfo;