document.addEventListener('DOMContentLoaded', function () {
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'gallery-modal-overlay';

        const img = document.createElement('img');
        overlay.appendChild(img);

        const close = document.createElement('button');
        close.className = 'gallery-modal-close';
        close.setAttribute('aria-label', 'Fechar');
        close.textContent = '×';
        document.body.appendChild(close);

        function removeOverlay() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (close.parentNode) close.parentNode.removeChild(close);
            document.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') removeOverlay();
        }

        overlay.addEventListener('click', function (ev) {
            // click outside image closes
            if (ev.target === overlay) removeOverlay();
        });

        close.addEventListener('click', removeOverlay);
        document.addEventListener('keydown', onKey);

        return {
            overlay,
            img,
            remove: removeOverlay,
        };
    }

    function openImage(src, alt) {
        const existing = document.querySelector('.gallery-modal-overlay');
        if (existing) existing.parentNode.removeChild(existing);
        const existingClose = document.querySelector('.gallery-modal-close');
        if (existingClose) existingClose.parentNode.removeChild(existingClose);

        const o = createOverlay();
        o.img.src = src;
        if (alt) o.img.alt = alt;
        document.body.appendChild(o.overlay);
    }

    function attachHandlers() {
        const imgs = document.querySelectorAll('.story-gallery img, .character-gallery img');
        imgs.forEach(img => {
            // Don't double-bind
            if (img.dataset.galleryBound) return;
            img.dataset.galleryBound = '1';
            img.style.touchAction = 'manipulation';
            img.addEventListener('click', function (e) {
                e.preventDefault();
                const src = img.src || img.getAttribute('data-src');
                openImage(src, img.alt || '');
            });
        });
    }

    // Initial attach
    attachHandlers();

    // Re-attach on DOM changes (in case images are injected later)
    const obs = new MutationObserver(() => attachHandlers());
    obs.observe(document.body, { childList: true, subtree: true });
});
