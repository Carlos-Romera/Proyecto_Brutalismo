(function(){
    // ---- 1. Cursor personalizado con inercia ----
    const cursor = document.getElementById('brutalCursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
        document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2) rotate(45deg)';
        });
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
        });
    }

    // ---- 2. Reveal Observer ----
    const revealElements = document.querySelectorAll('.brutal-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));

    // ---- 3. Galería Drag ----
    const gallery = document.getElementById('galleryScroll');
    if (gallery) {
        let isDown = false, startX, scrollLeft;
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        window.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 1.5;
            gallery.scrollLeft = scrollLeft - walk;
        });
    }

    // ---- 4. CTA Hero Scroll ----
    const ctaBtn = document.getElementById('ctaHero');
    if(ctaBtn){
        ctaBtn.addEventListener('click', () => {
            const servicios = document.querySelector('.services-section');
            if(servicios){
                servicios.scrollIntoView({ behavior: 'smooth', block: 'start' });
                ctaBtn.innerText = '⚡ BAJANDO ⚡';
                setTimeout(() => { ctaBtn.innerText = 'EMPUJA EL LÍMITE →'; }, 1200);
            }
        });
    }

    // ---- 5. Dark Mode Toggle ----
    const logoTrigger = document.getElementById('darkModeTrigger');
    let darkActive = false;
    logoTrigger.addEventListener('click', () => {
        const root = document.documentElement;
        if(!darkActive){
            root.style.setProperty('--bg', '#050505');
            root.style.setProperty('--text', '#00ff6c');
            root.style.setProperty('--hard-gray', '#1a1a1a');
            document.body.style.backgroundColor = '#050505';
            darkActive = true;
        } else {
            root.style.setProperty('--bg', '#ffffff');
            root.style.setProperty('--text', '#000000');
            root.style.setProperty('--hard-gray', '#e5e5e5');
            document.body.style.backgroundColor = '#ffffff';
            darkActive = false;
        }
    });

    // ---- 6. Formulario feedback ----
    const form = document.getElementById('brutalForm');
    const feedbackP = document.getElementById('formFeedback');
    if(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            if(!nombre || !email){
                feedbackP.innerText = '❌ ERROR: CAMPOS VACÍOS.';
                return;
            }
            feedbackP.innerText = `✔ ENVÍO EXITOSO, ${nombre.toUpperCase()}!`;
            feedbackP.style.color = '#00ff6c';
            setTimeout(() => feedbackP.innerText = '', 4000);
            form.reset();
        });
    }

    // ---- 7. Reset Button ----
    const resetBtn = document.getElementById('resetViewTrigger');
    if(resetBtn){
        resetBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const msg = document.createElement('div');
            msg.innerText = '⚡ RESET COMPLETADO ⚡';
            msg.style.cssText = 'position:fixed; bottom:20px; right:20px; background:black; color:lime; padding:12px; border:4px solid white; z-index:9999; font-weight:bold;';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 1500);
        });
    }

    // ---- 8. Efecto Glitch Hero ----
    const glitchEl = document.querySelector('.glitch');
    if(glitchEl){
        setInterval(() => {
            if(Math.random() > 0.93){
                glitchEl.style.transform = 'skew(2deg, 1deg)';
                setTimeout(() => glitchEl.style.transform = 'skew(0deg, 0deg)', 80);
            }
        }, 400);
    }

    // ---- 9. Manifesto Item Hovers ----
    const manifestoItems = document.querySelectorAll('.manifesto-item');
    manifestoItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'var(--text)';
            item.style.color = 'var(--neon-yellow)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.color = 'var(--text)';
        });
    });
})();