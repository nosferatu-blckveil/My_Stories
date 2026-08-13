document.addEventListener('DOMContentLoaded', function () {
    let currentImageIndex = 0;
    let galleryImages = [];

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'gallery-modal-overlay';

        const img = document.createElement('img');
        overlay.appendChild(img);

        const close = document.createElement('button');
        close.className = 'gallery-modal-close';
        close.setAttribute('aria-label', 'Close');
        close.innerHTML = '×';
        document.body.appendChild(close);

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-modal-nav gallery-modal-prev';
        prevBtn.setAttribute('aria-label', 'Previous image');
        prevBtn.innerHTML = '❮';
        overlay.appendChild(prevBtn);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-modal-nav gallery-modal-next';
        nextBtn.setAttribute('aria-label', 'Next image');
        nextBtn.innerHTML = '❯';
        overlay.appendChild(nextBtn);

        // Counter
        const counter = document.createElement('div');
        counter.className = 'gallery-modal-counter';
        overlay.appendChild(counter);

        function updateCounter() {
            counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        }

        function showImage(index) {
            if (index < 0) {
                currentImageIndex = galleryImages.length - 1;
            } else if (index >= galleryImages.length) {
                currentImageIndex = 0;
            } else {
                currentImageIndex = index;
            }

            img.src = galleryImages[currentImageIndex].src;
            img.alt = galleryImages[currentImageIndex].alt || 'Gallery image';
            updateCounter();
        }

        function removeOverlay() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            if (close.parentNode) close.parentNode.removeChild(close);
            document.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') removeOverlay();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }

        overlay.addEventListener('click', function (ev) {
            if (ev.target === overlay) removeOverlay();
        });

        close.addEventListener('click', removeOverlay);
        prevBtn.addEventListener('click', () => showImage(currentImageIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentImageIndex + 1));

        document.addEventListener('keydown', onKey);

        return {
            overlay,
            img,
            close,
            prevBtn,
            nextBtn,
            counter,
            updateCounter,
            showImage,
            remove: removeOverlay,
        };
    }

    function openImage(src, alt, index, allImages) {
        const existing = document.querySelector('.gallery-modal-overlay');
        if (existing) existing.parentNode.removeChild(existing);
        const existingClose = document.querySelector('.gallery-modal-close');
        if (existingClose) existingClose.parentNode.removeChild(existingClose);

        galleryImages = allImages;
        currentImageIndex = index;

        const o = createOverlay();
        o.img.src = src;
        if (alt) o.img.alt = alt;
        o.updateCounter();
        document.body.appendChild(o.overlay);
    }

    function attachHandlers() {
        const galleryContainers = document.querySelectorAll('.story-gallery, .character-gallery');

        galleryContainers.forEach(container => {
            const imgs = container.querySelectorAll('img');
            const imagesArray = Array.from(imgs).map((img, idx) => ({
                src: img.src || img.getAttribute('data-src'),
                alt: img.alt || '',
                element: img
            }));

            imgs.forEach((img, index) => {
                // Don't double-bind
                if (img.dataset.galleryBound) return;
                img.dataset.galleryBound = '1';
                img.style.touchAction = 'manipulation';
                img.addEventListener('click', function (e) {
                    e.preventDefault();
                    openImage(imagesArray[index].src, imagesArray[index].alt, index, imagesArray);
                });
            });
        });
    }

    // Initial attach
    attachHandlers();

    // Re-attach on DOM changes
    const obs = new MutationObserver(() => attachHandlers());
    obs.observe(document.body, { childList: true, subtree: true });
});
