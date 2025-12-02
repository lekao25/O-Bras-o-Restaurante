document.addEventListener('DOMContentLoaded', () => {
    console.log("Script de funcionalidades carregado com sucesso!");

    // --- 1) Acessibilidade: Fonte + Tema ---
    const body = document.body;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnTema = document.getElementById('btn-tema');

    let fontSize = parseInt(localStorage.getItem('userFontSize')) || 16;
    const maxFontSize = 24;
    const minFontSize = 12;

    function updateFontSize() {
        document.documentElement.style.fontSize = `${fontSize}px`;
        localStorage.setItem('userFontSize', fontSize);
    }
    updateFontSize();

    if (btnAumentar) {
        btnAumentar.addEventListener('click', () => {
            if (fontSize < maxFontSize) {
                fontSize += 1;
                updateFontSize();
            }
        });
    }
    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', () => {
            if (fontSize > minFontSize) {
                fontSize -= 1;
                updateFontSize();
            }
        });
    }

    const userTheme = localStorage.getItem('userTheme');
    if (userTheme === 'dark') body.classList.add('dark-mode');

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('userTheme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- 2) Menu mobile ---
    const nav = document.querySelector('.navbar nav');
    const menuButton = document.getElementById('menu-toggle');
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // --- 3) Carrossel: responsivo + autoplay ---
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');

        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1200) return 2;
            return 3;
        }

        let slidesPerView = getSlidesPerView();
        let currentStartIndex = 0;
        let movePercentage = 100 / slidesPerView;

        const autoSlideDuration = 5000;
        let autoSlideTimer;

        function startAutoSlide() {
            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(() => {
                showSlides(currentStartIndex + 1);
            }, autoSlideDuration);
        }

        function showSlides(index) {
            if (index > slides.length - slidesPerView) {
                currentStartIndex = 0;
            } else if (index < 0) {
                currentStartIndex = slides.length - slidesPerView;
            } else {
                currentStartIndex = index;
            }
            const moveAmount = currentStartIndex * movePercentage;
            carouselContainer.style.transform = `translateX(-${moveAmount}%)`;
            startAutoSlide();
        }

        window.addEventListener('resize', () => {
            const old = slidesPerView;
            slidesPerView = getSlidesPerView();
            if (slidesPerView !== old) {
                movePercentage = 100 / slidesPerView;
                showSlides(currentStartIndex);
            }
        });

        showSlides(0);

        if (prevBtn) prevBtn.addEventListener('click', () => showSlides(currentStartIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlides(currentStartIndex + 1));

        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // --- Ajuste automático para o cabeçalho fixo ---
    function ajustarPaddingDoCorpo() {
        const header = document.querySelector('.navbar');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.body.style.paddingTop = headerHeight + 'px';
        }
    }

    window.addEventListener('load', ajustarPaddingDoCorpo);
    window.addEventListener('resize', ajustarPaddingDoCorpo);
});
document.addEventListener('DOMContentLoaded', () => {
    // Menu hambúrguer
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Resto do seu código de acessibilidade e carrossel...
});

