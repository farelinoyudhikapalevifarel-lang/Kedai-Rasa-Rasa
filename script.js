/**
 * Kedai Rasa Rasa - Standalone JavaScript Handler
 * Features: Loading, sticky navbar, mobile drawer, interactive review slider, real-time promo countdown, WA integration.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen Handler
    const loadingScreen = document.getElementById("loading-screen");
    const loadingBar = document.getElementById("loading-bar");
    
    // Simulate loading completion
    if (loadingBar) {
        loadingBar.style.width = "100%";
    }
    
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add("fade-out");
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 600);
        }
    }, 1200);

    // 2. Glass Sticky Navbar Effect on Scroll
    const navbar = document.getElementById("main-navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.classList.add("glass-effect", "shadow-md");
            navbar.classList.remove("py-5", "bg-transparent");
            navbar.classList.add("py-3.5");
        } else {
            navbar.classList.remove("glass-effect", "shadow-md", "py-3.5");
            navbar.classList.add("py-5", "bg-transparent");
        }
    });

    // 3. Mobile Navigation Toggle Drawer
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobilePanel = document.getElementById("mobile-nav-panel");
    
    if (menuToggle && mobilePanel) {
        menuToggle.addEventListener("click", () => {
            mobilePanel.classList.toggle("hidden");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (icon.classList.contains("fa-bars")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Close mobile drawer when links are selected
        const mobileLinks = mobilePanel.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobilePanel.classList.add("hidden");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // 4. Promo Countdown Timer (Counts down to 23:59:59 daily)
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function runCountdown() {
        const now = new Date();
        const target = new Date();
        target.setHours(23, 59, 59, 999);

        let diff = target.getTime() - now.getTime();
        
        if (diff <= 0) {
            diff = 0;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (hoursEl) hoursEl.textContent = h.toString().padStart(2, "0");
        if (minutesEl) minutesEl.textContent = m.toString().padStart(2, "0");
        if (secondsEl) secondsEl.textContent = s.toString().padStart(2, "0");
    }

    setInterval(runCountdown, 1000);
    runCountdown(); // Initial run

    // 5. Testimonial Carousel Slide Data
    window.testimonials = [
        {
            comment: "Es degannya segar banget! Pas diminum siang bolong sehabis olahraga.",
            name: "Andi Wijaya",
            role: "Tamu Kedai"
        },
        {
            comment: "Rasa Es Dawetnya authentic sekali! Santannya gurih bersih, gula merahnya kental.",
            name: "Siti Rahmawati",
            role: "Reviewer Kuliner"
        },
        {
            comment: "Tempat favorit sepulang kerja. Es teh melatimu harum dan murah meriah segar.",
            name: "Budi Santoso",
            role: "Warga Sekitar"
        }
    ];
    
    window.currentTestimonialIndex = 0;

    const testimonialComment = document.getElementById("testimonial-comment");
    const testimonialName = document.getElementById("testimonial-name");

    window.updateTestimonialUI = function() {
        const data = window.testimonials[window.currentTestimonialIndex];
        if (testimonialComment && testimonialName) {
            testimonialComment.style.opacity = 0;
            testimonialName.style.opacity = 0;
            
            setTimeout(() => {
                testimonialComment.textContent = `"${data.comment}"`;
                testimonialName.textContent = data.name;
                
                testimonialComment.style.opacity = 1;
                testimonialName.style.opacity = 1;
            }, 200);
        }
    };

    window.nextTestimonial = function() {
        window.currentTestimonialIndex = (window.currentTestimonialIndex + 1) % window.testimonials.length;
        window.updateTestimonialUI();
    };

    window.prevTestimonial = function() {
        window.currentTestimonialIndex = (window.currentTestimonialIndex - 1 + window.testimonials.length) % window.testimonials.length;
        window.updateTestimonialUI();
    };

    // Auto advancing slider slide every 6 seconds
    setInterval(() => {
        window.nextTestimonial();
    }, 6000);

    // 6. Direct WhatsApp Order Buttons from catalog
    window.orderViaWA = function(menuName) {
        const message = `Halo Kak Kedai Rasa Rasa! 🥤\n\nSaya ingin memesan menu segar ini:\n─────────────────────\n*Minuman:*  ${menuName}\n*Jumlah:*   1 Cup\n─────────────────────\nMohon dikirimkan harganya murni ya kak. Terima kasih! ✨`;
        const encodedText = encodeURIComponent(message);
        window.open(`https://wa.me/6289516459560?text=${encodedText}`, "_blank");
    };

    // 7. Contact Reservation Form submissions
    window.handleVanillaSubmit = function(e) {
        e.preventDefault();
        const nameVal = document.getElementById("v-name").value;
        const drinkVal = document.getElementById("v-drink").value;
        const qtyVal = document.getElementById("v-qty").value;
        const noteVal = document.getElementById("v-msg").value;

        const message = `Halo Kedai Rasa Rasa! 👋\n\nSaya ingin memesan menu segar:\n─────────────────────\n*Nama Pemesan:* ${nameVal}\n*Pesanan:*      ${drinkVal}\n*Jumlah:*       ${qtyVal} Cup\n*Catatan:*      ${noteVal || "-"}\n─────────────────────\nMohon segera diproses ya kak. Terima kasih banyak!`;
        const encodedText = encodeURIComponent(message);
        window.open(`https://wa.me/6289516459560?text=${encodedText}`, "_blank");
    };

});
