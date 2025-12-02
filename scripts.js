document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hambúrguer ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.navbar nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }

    // --- Acessibilidade: Fonte + Tema ---
    const body = document.body;
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const btnTema = document.getElementById('btn-tema');

    if (btnAumentar && btnDiminuir) {
        let fontSize = parseInt(localStorage.getItem('userFontSize')) || 16;
        const maxFontSize = 24;
        const minFontSize = 12;

        const updateFontSize = () => {
            document.documentElement.style.fontSize = `${fontSize}px`;
            localStorage.setItem('userFontSize', fontSize);
        };
        updateFontSize();

        btnAumentar.addEventListener('click', () => {
            if (fontSize < maxFontSize) {
                fontSize += 1;
                updateFontSize();
            }
        });

        btnDiminuir.addEventListener('click', () => {
            if (fontSize > minFontSize) {
                fontSize -= 1;
                updateFontSize();
            }
        });
    }

    if (btnTema) {
        const userTheme = localStorage.getItem('userTheme');
        if (userTheme === 'dark') {
            body.classList.add('dark-mode');
        }

        btnTema.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('userTheme', currentTheme);
        });
    }

    // ========================================================
    // --- CARROSSEL (CÓDIGO CORRIGIDO) ---
    // ========================================================
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');

        let currentStartIndex = 0;
        const autoSlideDuration = 3000; // 3 segundos por slide
        let autoSlideTimer;

        // Função para calcular quantos slides devem ser visíveis
        const getSlidesPerView = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1200) return 2;
            return 3;
        };

        // Função que move o carrossel para a posição correta
        const moveCarousel = (newIndex) => {
            const slidesPerView = getSlidesPerView();
            
            // Lógica para o carrossel girar infinitamente
            if (newIndex >= slides.length - slidesPerView + 1) {
                currentStartIndex = 0; // Volta para o início
            } else if (newIndex < 0) {
                currentStartIndex = slides.length - slidesPerView; // Vai para o fim
            } else {
                currentStartIndex = newIndex;
            }

            const moveAmount = currentStartIndex * (100 / slidesPerView);
            carouselContainer.style.transform = `translateX(-${moveAmount}%)`;
        };

        // Função que inicia (ou reinicia) o temporizador do carrossel
        const startAutoSlide = () => {
            clearInterval(autoSlideTimer); // Limpa qualquer temporizador antigo
            autoSlideTimer = setInterval(() => {
                moveCarousel(currentStartIndex + 1); // Avança para o próximo slide
            }, autoSlideDuration);
        };
        
        // Eventos dos botões de avançar/voltar
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveCarousel(currentStartIndex + 1);
                startAutoSlide(); // Reinicia o temporizador após clique manual
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveCarousel(currentStartIndex - 1);
                startAutoSlide(); // Reinicia o temporizador após clique manual
            });
        }
        
        // Pausa o carrossel quando o mouse está sobre ele
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        // Retoma o carrossel quando o mouse sai
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Ajusta o carrossel se o tamanho da janela mudar
        window.addEventListener('resize', () => {
            moveCarousel(currentStartIndex); // Reposiciona sem pular
            startAutoSlide(); // Reinicia o ciclo com as novas dimensões
        });

        // Inicia o carrossel quando a página carrega
        moveCarousel(0);      // Define a posição inicial
        startAutoSlide();   // Começa a passar as fotos automaticamente
    }
});

