document.addEventListener("DOMContentLoaded", () => {

        /* ==========================================
       TRANSIÇÃO ENTRE PÁGINAS
    ========================================== */

    const transition = document.getElementById("transition");
    if (transition) {
        setTimeout(() => {
            transition.classList.remove("active");
        }, 100);
    }

    document.querySelectorAll(".page-link").forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");

            if (!href || href.startsWith("#")) return;

            e.preventDefault();

            transition.classList.add("active");

            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    /* =====================================================
            ELEMENTOS PRINCIPAIS
    =====================================================*/

    const loadingScreen = document.getElementById("loading-screen");
    const btnEntrar = document.getElementById("btn-entrar");

/* ==========================================
   MÚSICA COM LOCALSTORAGE
========================================== */
    const musica = document.getElementById("musica");
    if (musica) {
        // Restaurar volume
        const volumeGuardado = localStorage.getItem("volume");
        if (volumeGuardado !== null) {
            musica.volume = parseFloat(volumeGuardado);
        } else {
            musica.volume = 0.5;
        }

        // Restaurar posição
        const tempoGuardado = localStorage.getItem("tempoMusica");
        if (tempoGuardado !== null) {
            musica.currentTime = parseFloat(tempoGuardado);
        }

        // Restaurar estado (a tocar ou em pausa)
        const estavaATocar = localStorage.getItem("musicaATocar");
        document.body.addEventListener("click", () => {

            if (estavaATocar !== "false") {
                musica.play().catch(() => {});
            }
        }, { once: true });

        // Guardar posição a cada segundo
        setInterval(() => {
            localStorage.setItem("tempoMusica", musica.currentTime);
        }, 1000);

        // Guardar estado
        musica.addEventListener("play", () => {
            localStorage.setItem("musicaATocar", "true");
        });

        musica.addEventListener("pause", () => {
            localStorage.setItem("musicaATocar", "false");
        });
    }

    const playPause = document.getElementById("playPause");
    if (playPause && musica) {
        playPause.addEventListener("click", () => {

            if (musica.paused) {
                musica.play();
                playPause.innerHTML = "⏸";
            } else {
                musica.pause();
                playPause.innerHTML = "▶";
            }
        });
    }

    const volume = document.getElementById("volume");
    if (volume && musica) {
        volume.value = musica.volume * 100;

        volume.addEventListener("input", () => {
            musica.volume = volume.value / 100;
            localStorage.setItem("volume", musica.volume);
        });
    }

    /* =====================================================
            MODAL DOS PLANETAS
    =====================================================*/
    const modal = document.getElementById("planet-modal");
    if (modal) {

        const titulo = document.getElementById("modal-title");
        const texto = document.getElementById("modal-text");
        document.querySelectorAll(".planet").forEach(planet => {
            planet.addEventListener("click", () => {

                titulo.textContent = planet.dataset.title;
                texto.textContent = planet.dataset.text;
                modal.style.display = "flex";
            });
        });
        document.getElementById("close-modal").onclick = () => {
            modal.style.display = "none";
        };

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-image");
    const btnTopo = document.getElementById("btn-topo");

    const cursor = document.getElementById("cursor");

    /* =====================================================
            ENTRAR NO SITE
    =====================================================*/
        btnEntrar.addEventListener("click", () => {

            loadingScreen.style.opacity = "0";

            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 800);

            musica.volume = 0.5;
            musica.play();
        });

    const heroButton = document.querySelector(".hero-button");
    if(heroButton){
        heroButton.addEventListener("click", () => {
            document.getElementById("galaxia").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    /* =====================================================
            PLAY / PAUSE MÚSICA
    =====================================================*/
    playPause.addEventListener("click", () => {

        if (musica.paused) {
            musica.play();
            playPause.innerHTML = "⏸";

        } else {
            musica.pause();
            playPause.innerHTML = "▶";
        }
    });

    /* VOLUME */
    volume.addEventListener("input", () => {

        musica.volume = volume.value / 100;
    });

    /* fechar clicando fora */
    window.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    /* =====================================================
            LIGHTBOX GALERIA
    =====================================================*/
    document.querySelectorAll(".foto img").forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    lightbox.addEventListener("click", () => {

        lightbox.style.display = "none";
    });

    /* =====================================================
            BOTÃO TOPO
    =====================================================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            btnTopo.style.display = "block";
        } else {
            btnTopo.style.display = "none";
        }
    });

    btnTopo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    /* =====================================================
            CURSOR PERSONALIZADO
    =====================================================*/

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.pageX + "px";
        cursor.style.top = e.pageY + "px";

    });

    /* =====================================================
            ESTRELAS DINÂMICAS
    =====================================================
    const stars = document.getElementById("stars");
    if(stars){
        for (let i = 0; i < 180; i++) {
            const stars = document.getElementById("span")

            star.style.position = "absolute";
            star.style.width = Math.random() * 3 + "px";
            star.style.height = star.style.width;
            star.style.background = "white";
            star.style.borderRadius = "50%";
            star.style.top = Math.random() * 100 + "%";
            star.style.left = Math.random() * 100 + "%";
            star.style.opacity = Math.random();

            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite alternate`;
            stars.appendChild(star);
        }
    }*/

    /*====================================
      ESTRELAS AUTOMÁTICAS
    =====================================*/
    const starsContainer = document.getElementById("stars");
    if (starsContainer) {

        const quantidade = 500;
        for (let i = 0; i < quantidade; i++) {

            const star = document.createElement("div");
            star.className = "star";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            const size = Math.random() * 3 + 1;
            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.opacity = Math.random();

            star.style.animationDuration = (2 + Math.random() * 5) + "s";
            starsContainer.appendChild(star);
        }
    }

    const canvas = document.getElementById("starsCanvas");
    if (canvas) {

        const ctx = canvas.getContext("2d");
        // ajustar tamanho
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resize();
        window.addEventListener("resize", resize);
        // criar estrelas
        const stars = [];

        for (let i = 0; i < 250; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                alpha: Math.random(),
                speed: Math.random() * 0.3 + 0.1
            });
        }

        // animação
        function animate() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let star of stars) {

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

                ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
                ctx.fill();

                // brilho leve
                star.alpha += (Math.random() - 0.5) * 0.02;
                star.alpha = Math.max(0.2, Math.min(1, star.alpha));
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    /* =====================================================
            SCROLL SUAVE EXTRA
    =====================================================*/

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });

    /* =====================================================
            ANIMAÇÃO DE ENTRADA (HERO)
    =====================================================*/

    const hero = document.querySelector("#hero");

    window.addEventListener("scroll", () => {

        let rect = hero.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {

            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";

        }

    });

});
