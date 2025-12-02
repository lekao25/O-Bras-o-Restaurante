/* =============== ARQUIVO: scripts.js (VERSÃO CORRIGIDA) =============== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica do Menu Hambúrguer ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
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

    if (btnAumentar && btnDiminuir) {
        let fontSize = 16;
        const updateFontSize = () => { document.documentElement.style.fontSize = `${fontSize}px`; };
        btnAumentar.addEventListener('click', () => { fontSize = Math.min(24, fontSize + 1); updateFontSize(); });
        btnDiminuir.addEventListener('click', () => { fontSize = Math.max(12, fontSize - 1); updateFontSize(); });
    }
    if (btnTema) {
        if (localStorage.getItem('theme') === 'dark') { body.classList.add('dark-mode'); }
        btnTema.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- Lógica do Carrossel Multi-Slide (Página de Fotos) ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        let currentStartIndex = 0;
        let autoSlideTimer;

        const getSlidesPerView = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1200) return 2;
            return 3;
        };

        const moveCarousel = (newIndex) => {
            const slidesPerView = getSlidesPerView();
            if (newIndex >= slides.length - slidesPerView + 1) {
                currentStartIndex = 0;
            } else if (newIndex < 0) {
                currentStartIndex = slides.length - slidesPerView;
            } else {
                currentStartIndex = newIndex;
            }
            const movePercentage = currentStartIndex * (100 / slidesPerView);
            carouselContainer.style.transform = `translateX(-${movePercentage}%)`;
        };

        const startAutoSlide = () => {
            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(() => {
                moveCarousel(currentStartIndex + 1);
            }, 5000); // Muda a cada 5 segundos
        };

        if(nextBtn) nextBtn.addEventListener('click', () => { moveCarousel(currentStartIndex + 1); startAutoSlide(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { moveCarousel(currentStartIndex - 1); startAutoSlide(); });
        
        window.addEventListener('resize', () => { moveCarousel(currentStartIndex); startAutoSlide(); });
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        carouselContainer.addEventListener('mouseleave', startAutoSlide);

        moveCarousel(0);
        startAutoSlide();
    }
});
