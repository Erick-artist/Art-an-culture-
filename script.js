class Navigation {
    constructor() {
        this.nav = document.querySelector('.glass-nav');
        this.toggle = document.querySelector('.nav-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        window.addEventListener('scroll', () => this.handleScroll());
        
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
    }
    
    handleScroll() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 100) {
            this.nav.style.transform = 'none';
        } else if (currentScroll > this.lastScroll) {
            this.nav.style.transform = 'translateY(-100%)';
        } else {
            this.nav.style.transform = 'none';
        }
        
        this.nav.style.boxShadow = currentScroll > 10 ? 
            '0 5px 30px rgba(0,0,0,0.2)' : 'none';
        
        this.lastScroll = currentScroll;
    }
}

class Testimonials {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.init();
    }
    
    init() {
        // Add any interactive functionality if needed
        this.testimonials.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.querySelector('.client-image').style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.querySelector('.client-image').style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Testimonials();
    // ... rest of your initialization code
});

class CartSystem {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('art-cart')) || [];
        this.cart = document.getElementById('cart');
        this.cartToggle = document.getElementById('cart-toggle');
        this.closeCart = document.getElementById('close-cart');
        
        this.init();
    }
    
    init() {
        this.updateCart();
        this.cartToggle.addEventListener('click', () => this.toggleCart());
        this.closeCart.addEventListener('click', () => this.closeCartFn());
        
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', () => this.addItem(btn));
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                this.removeItem(e.target.dataset.id);
            }
        });
    }
    
    updateCart() {
        document.getElementById('cart-count').textContent = this.items.length;
        document.querySelector('.cart-badge').textContent = this.items.length;
        
        const cartItemsEl = document.querySelector('.cart-items');
        cartItemsEl.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" width="50">
                <div>
                    <h4>${item.title}</h4>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');
        
        localStorage.setItem('art-cart', JSON.stringify(this.items));
    }
    
    addItem(btn) {
        const item = btn.closest('.art-item');
        const id = item.getAttribute('data-id');
        const title = item.querySelector('h3').textContent;
        const image = item.querySelector('img').src;
        
        this.items.push({ id, title, image });
        this.updateCart();
        this.cart.classList.add('active');
        
        btn.textContent = '✓ Added!';
        setTimeout(() => btn.textContent = 'Order Print', 2000);
    }
    
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateCart();
    }
    
    toggleCart() {
        this.cart.classList.toggle('active');
    }
    
    closeCartFn() {
        this.cart.classList.remove('active');
    }
}

class ModalSystem {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.art-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('close-modal') && 
                    !e.target.classList.contains('story-btn') && 
                    !e.target.classList.contains('view-btn') &&
                    !e.target.classList.contains('order-btn')) {
                    this.openModal(item);
                }
            });
            
            const modal = item.querySelector('.art-modal');
            if (modal) {
                modal.querySelector('.close-modal').addEventListener('click', () => this.closeModal(modal));
                modal.querySelector('.story-btn').addEventListener('click', () => this.toggleStory(modal));
            }
        });
    }
    
    openModal(item) {
        const modal = item.querySelector('.art-modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    toggleStory(modal) {
        const story = modal.querySelector('.story-text');
        story.style.display = story.style.display === 'none' ? 'block' : 'none';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new TestimonialCarousel();
    new CartSystem();
    new ModalSystem();
    
    // Particles effect
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const particles = hero.querySelector('.particles');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            particles.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
        });
    }
    
    // Social sharing
    window.shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };
    
    window.shareOnTwitter = () => {
        const text = encodeURIComponent("Check out this amazing artwork!");
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };
    
    window.shareOnInstagram = () => {
        alert("Save the image and share directly on Instagram!");
    };
});