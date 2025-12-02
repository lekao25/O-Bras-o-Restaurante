/* =============== ARQUIVO: scripts.js =============== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica do Menu Hambúrguer ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        // Abre e fecha o menu
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (útil em mobile)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // --- Lógica de Acessibilidade (Fonte e Tema) ---
    const body = document.body;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnTema = document.getElementById('btn-tema');

    // Fonte
    if (btnAumentar && btnDiminuir) {
        let fontSize = 16;
        const updateFontSize = () => {
            document.documentElement.style.fontSize = `${fontSize}px`;
        };
        btnAumentar.addEventListener('click', () => {
            fontSize = Math.min(24, fontSize + 1);
            updateFontSize();
        });
        btnDiminuir.addEventListener('click', () => {
            fontSize = Math.max(12, fontSize - 1);
            updateFontSize();
        });
    }
    
    // Tema Escuro
    if (btnTema) {
        // Verifica se o usuário já tinha um tema salvo
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }
        btnTema.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            // Salva a preferência do usuário
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- Lógica do Carrossel Automático (para a página de fotos) ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        let currentIndex = 0;
        let slideInterval;

        const showSlide = (index) => {
            // Garante que o índice esteja dentro dos limites
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
        };
        
        const startSlideShow = () => {
            stopSlideShow(); // Garante que não haja múltiplos intervalos rodando
            slideInterval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 4000); // Muda a cada 4 segundos
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        if(nextBtn) nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
        if(prevBtn) prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

        // Pausa quando o mouse está sobre o carrossel
        carouselContainer.addEventListener('mouseenter', stopSlideShow);
        carouselContainer.addEventListener('mouseleave', startSlideShow);

        // Inicia o show
        startSlideShow();
    }
});
