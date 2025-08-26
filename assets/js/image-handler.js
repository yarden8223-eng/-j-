// Image Handler - Implements the design guide image system
class ImageHandler {
    constructor() {
        this.validImages = [
            'habait.jpg',
            'therapy.jpg', 
            'red-door.jpg',
            'rainbow.jpg',
            'ipad.jpg',
            'books-in-the-back.jpg',
            'writing.jpg',
            'coffee.jpg',
            'desk-ipad.jpg',
            'couch.jpg'
        ];
        this.imagesPath = '/images/';
        this.init();
    }

    init() {
        this.setupImageErrorHandling();
        this.setupLazyLoading();
        this.wrapImagesInFigures();
    }

    // Handle missing images with visible placeholders
    setupImageErrorHandling() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', (e) => {
                    this.handleImageError(e.target);
                });
            });
        });
    }

    handleImageError(img) {
        const filename = this.extractFilename(img.src);
        const placeholder = this.createImagePlaceholder(filename);
        
        // Replace the broken image with placeholder
        if (img.parentNode) {
            img.parentNode.replaceChild(placeholder, img);
        }
    }

    extractFilename(src) {
        const url = new URL(src, window.location.origin);
        const pathname = url.pathname;
        return pathname.split('/').pop() || 'unknown.jpg';
    }

    createImagePlaceholder(filename) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.innerHTML = `IMAGE MISSING: ${filename}`;
        return placeholder;
    }

    // Setup lazy loading for images
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.addEventListener('DOMContentLoaded', () => {
                const lazyImages = document.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => imageObserver.observe(img));
            });
        }
    }

    // Wrap images in figure elements with proper markup
    wrapImagesInFigures() {
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img:not([data-figure-wrapped])');
            images.forEach(img => {
                if (!this.isAlreadyWrapped(img)) {
                    this.wrapImageInFigure(img);
                }
            });
        });
    }

    isAlreadyWrapped(img) {
        return img.parentElement && img.parentElement.tagName === 'FIGURE';
    }

    wrapImageInFigure(img) {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        
        // Move the image into the figure
        img.parentNode.insertBefore(figure, img);
        figure.appendChild(img);
        
        // Add alt text as caption if no existing caption
        if (img.alt && img.alt.trim() !== '') {
            figcaption.textContent = img.alt;
            figure.appendChild(figcaption);
        }
        
        // Mark as wrapped to prevent double wrapping
        img.setAttribute('data-figure-wrapped', 'true');
    }

    // Utility method to create properly formatted image elements
    createImage(src, alt = '', caption = '', className = '') {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        
        // Set image attributes
        img.src = src;
        img.alt = alt;
        img.loading = 'lazy';
        
        if (className) {
            img.className = className;
        }
        
        // Add to figure
        figure.appendChild(img);
        
        // Add caption if provided
        if (caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = caption;
            figure.appendChild(figcaption);
        }
        
        return figure;
    }

    // Validate image filename
    isValidImage(filename) {
        return this.validImages.includes(filename.toLowerCase());
    }

    // Get full image path
    getImagePath(filename) {
        if (this.isValidImage(filename)) {
            return this.imagesPath + filename.toLowerCase();
        }
        return null;
    }
}

// Initialize the image handler when the script loads
const imageHandler = new ImageHandler();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageHandler;
}
