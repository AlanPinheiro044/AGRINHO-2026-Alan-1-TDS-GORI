/* ============================================
   AGRINHO 2026 - JAVASCRIPT COMPLETO
   Funcionalidades e Interatividades
   ============================================ */

// ============================================
// 1. SCROLL SUAVE PARA SEÇÕES
// ============================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// 2. NAVEGAÇÃO ATIVA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        // Verifica qual seção está visível
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        // Atualiza a classe ativa
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ============================================
// 3. ANIMAÇÃO AO CARREGAR
// ============================================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    
    // Anima cards ao carregar
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ============================================
// 4. EFEITO HOVER NOS CARDS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ============================================
// 5. CONTADOR DE SCROLL
// ============================================
let scrollProgress = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = (scrollTop / docHeight) * 100;
    
    // Opcional: mostrar barra de progresso
    console.log(`Progresso de scroll: ${scrollProgress.toFixed(2)}%`);
});

// ============================================
// 6. BOTÕES DE NAVEGAÇÃO
// ============================================
function navigateToPage(pageName) {
    console.log(`Navegando para: ${pageName}`);
    
    // Simula navegação para outras páginas
    const pages = {
        'praticas-sustentaveis': 'Práticas Sustentáveis',
        'tecnologia-verde': 'Tecnologia Verde',
        'projetos-reais': 'Projetos Reais',
        'como-ajudar': 'Como Ajudar'
    };
    
    if (pages[pageName]) {
        alert(`Você será redirecionado para: ${pages[pageName]}`);
        // window.location.href = `/${pageName}`;
    }
}

// ============================================
// 7. MODO NOTURNO (OPCIONAL)
// ============================================
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Salva preferência no localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Carrega preferência ao iniciar
window.addEventListener('load', function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// ============================================
// 8. FORMULÁRIO DE CONTATO (EXEMPLO)
// ============================================
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        mensagem: formData.get('mensagem')
    };
    
    console.log('Dados do formulário:', data);
    alert('Mensagem enviada com sucesso!');
    form.reset();
}

// ============================================
// 9. VALIDAÇÃO DE EMAIL
// ============================================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// 10. DEBOUNCE PARA EVENTOS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exemplo de uso: redimensionamento de janela
window.addEventListener('resize', debounce(function() {
    console.log('Janela redimensionada');
}, 250));

// ============================================
// 11. LAZY LOADING DE IMAGENS
// ============================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 12. ANALYTICS SIMPLES
// ============================================
class Analytics {
    constructor() {
        this.events = [];
    }
    
    trackEvent(eventName, eventData = {}) {
        const event = {
            name: eventName,
            timestamp: new Date().toISOString(),
            data: eventData
        };
        this.events.push(event);
        console.log('Evento rastreado:', event);
    }
    
    getEvents() {
        return this.events;
    }
    
    clearEvents() {
        this.events = [];
    }
}

const analytics = new Analytics();

// Rastreia cliques em botões
document.addEventListener('click', function(e) {
    if (e.target.matches('button, a')) {
        analytics.trackEvent('click', {
            element: e.target.textContent,
            timestamp: new Date()
        });
    }
});

// ============================================
// 13. NOTIFICAÇÕES
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        background-color: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 14. ARMAZENAMENTO LOCAL
// ============================================
const Storage = {
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    get: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    
    remove: function(key) {
        localStorage.removeItem(key);
    },
    
    clear: function() {
        localStorage.clear();
    }
};

// ============================================
// 15. DETECÇÃO DE DISPOSITIVO
// ============================================
const Device = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isTablet: function() {
        return /iPad|Android/i.test(navigator.userAgent) && !/iPhone/i.test(navigator.userAgent);
    },
    
    isDesktop: function() {
        return !this.isMobile() && !this.isTablet();
    }
};

console.log('Dispositivo:', {
    mobile: Device.isMobile(),
    tablet: Device.isTablet(),
    desktop: Device.isDesktop()
});

// ============================================
// 16. INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site Agrinho 2026 carregado com sucesso!');
    
    // Carrega imagens lazy
    lazyLoadImages();
    
    // Inicializa analytics
    analytics.trackEvent('page_load', {
        url: window.location.href,
        device: Device.isMobile() ? 'mobile' : 'desktop'
    });
});

// ============================================
// 17. TRATAMENTO DE ERROS
// ============================================
window.addEventListener('error', function(event) {
    console.error('Erro:', event.error);
    showNotification('Ocorreu um erro. Por favor, recarregue a página.', 'error');
});

// ============================================
// 18. PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Tempo de carregamento: ${pageLoadTime}ms`);
    }
});

// ============================================
// 19. FUNÇÕES UTILITÁRIAS
// ============================================

// Formata data
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
}

// Formata moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Trunca texto
function truncateText(text, length) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// ============================================
// 20. EXPORTAR FUNÇÕES
// ============================================
window.Agrinho = {
    scrollToSection,
    navigateToPage,
    toggleDarkMode,
    submitForm,
    validateEmail,
    showNotification,
    Storage,
    Device,
    analytics,
    formatDate,
    formatCurrency,
    truncateText
};

console.log('🚀 Todas as funcionalidades carregadas!');
