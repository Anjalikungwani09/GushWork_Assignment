// STICKY HEADER
window.addEventListener('scroll', function () {
    const header = document.getElementById('header-sticky');
    const firstFold = document.querySelector('.hero-section').offsetHeight;

    // Trigger sticky header after scrolling past the first fold
    if (window.scrollY > firstFold) {
        header.classList.add('is-sticky');
    } else {
        header.classList.remove('is-sticky');
    }
});


//Toggle Button

const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active'); // Animates the hamburger
    navMenu.classList.toggle('active');    // Slides the menu in/out
});



//Hero section carousel

const mainProductImage = document.querySelector(".main-product-image");
const thumbnails = document.querySelectorAll(".thumbnail");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const thumbContainer = thumbnails[0]?.parentElement; // Reference to the parent for delegation

let currentIndex = 0;
const totalThumbs = thumbnails.length;

if (mainProductImage && totalThumbs > 0) {

    function updateImage(index) {
        // Find the currently active thumb and remove the class
        const currentActive = thumbContainer.querySelector(".thumbnail.active") || thumbnails[currentIndex];
        currentActive.classList.remove("active");

        // Set the new active thumb and update source
        const newActive = thumbnails[index];
        newActive.classList.add("active");
        mainProductImage.src = newActive.src;

        currentIndex = index;
    }

    // Optimization: Event Delegation
    // Instead of multiple listeners, we use one on the parent container
    if (thumbContainer) {
        thumbContainer.addEventListener("click", (e) => {
            const clickedThumb = e.target.closest(".thumbnail");
            if (clickedThumb) {
                const index = Array.from(thumbnails).indexOf(clickedThumb);
                updateImage(index);
            }
        });
    }

    // Combined Arrow Logic
    const handleArrowClick = (direction) => {
        currentIndex = (currentIndex + direction + totalThumbs) % totalThumbs;
        updateImage(currentIndex);
    };

    if (rightArrow) {
        rightArrow.addEventListener("click", () => handleArrowClick(1));
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", () => handleArrowClick(-1));
    }
}


//IMAGE ZOOMING SECTION

const mainImageContainer = document.querySelector(".main-image-container");
const zoomPreview = document.querySelector(".thumbnail-zoom-preview");

// Note: mainProductImage must be defined from your previous carousel logic
if (mainImageContainer && zoomPreview && mainProductImage) {
    let ticking = false;

    const updateZoom = (e) => {
        const rect = mainImageContainer.getBoundingClientRect();

        // Calculate relative coordinates
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage for background-position
        const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

        // Apply styles via a single update
        // Using backgroundSize: "200%" or similar makes the zoom effect visible
        Object.assign(zoomPreview.style, {
            display: "block",
            backgroundImage: `url('${mainProductImage.src}')`,
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            left: `${rect.right + 20}px`,
            top: `${rect.top}px`
        });

        ticking = false;
    };

    mainImageContainer.addEventListener("mousemove", (e) => {
        if (!ticking) {
            // requestAnimationFrame ensures updates happen only when the browser is ready to paint
            window.requestAnimationFrame(() => updateZoom(e));
            ticking = true;
        }
    });

    mainImageContainer.addEventListener("mouseleave", () => {
        zoomPreview.style.display = "none";
    });
}


//Company logo adjustment

function handleCompanyLogos() {
    const logos = document.querySelectorAll('.company-logos img');
    if (!logos.length) return;

    const width = window.innerWidth;

    // Determine limit: 6 for desktop, 5 for large tablet, 4 for small tablet, 3 for mobile
    const limit = width >= 1240 ? 6 : width >= 1000 ? 5 : width >= 550 ? 4 : 3;

    logos.forEach((img, i) => {
        img.style.display = i < limit ? 'block' : 'none';
    });
}

// Listeners
window.addEventListener('resize', handleCompanyLogos);
document.addEventListener('DOMContentLoaded', handleCompanyLogos);



const slider = document.getElementById('logo-slider');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    // Mouse Events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events (For Mobile)
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}




//   FAQ SECTION

document.addEventListener("DOMContentLoaded", () => {
    // --- FAQ Functionality ---
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")
        const answer = item.querySelector(".faq-answer")

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active")

            // Close all FAQ items
            faqItems.forEach((faqItem) => {
                faqItem.classList.remove("active")
                faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false")
            })

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add("active")
                question.setAttribute("aria-expanded", "true")
            }
        })
    })




    // VERSATILE APPLICATIONS
    const carouselTrack = document.querySelector(".carousel-track")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const cards = document.querySelectorAll(".application-card")

    if (carouselTrack && cards.length > 0) {
        let currentIndex = 0
        const cardWidth = cards[0].offsetWidth + 12 // Card width + gap
        const visibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
        const maxIndex = Math.max(0, cards.length - visibleCards)

        function updateCarousel() {
            const translateX = -currentIndex * cardWidth
            carouselTrack.style.transform = `translateX(${translateX}px)`

            // Update button states
            if (prevBtn) prevBtn.disabled = currentIndex === 0
            if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--
                    updateCarousel()
                }
            })
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (currentIndex < maxIndex) {
                    currentIndex++
                    updateCarousel()
                }
            })
        }

        // Initialize carousel
        updateCarousel()

        // Handle window resize
        window.addEventListener("resize", () => {
            const newVisibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
            const newMaxIndex = Math.max(0, cards.length - newVisibleCards)

            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex
            }
            updateCarousel()
        })
    }



    // --- Touch Scrolling for Mobile Carousel ---
    let isDown = false
    let startX
    let scrollLeft

    if (carouselTrack) {
        carouselTrack.addEventListener("mousedown", (e) => {
            isDown = true
            carouselTrack.style.cursor = "grabbing"
            startX = e.pageX - carouselTrack.offsetLeft
            scrollLeft = carouselTrack.scrollLeft
        })

        carouselTrack.addEventListener("mouseleave", () => {
            isDown = false
            carouselTrack.style.cursor = "grab"
        })

        carouselTrack.addEventListener("mouseup", () => {
            isDown = false
            carouselTrack.style.cursor = "grab"
        })

        carouselTrack.addEventListener("mousemove", (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - carouselTrack.offsetLeft
            const walk = (x - startX) * 2
            carouselTrack.scrollLeft = scrollLeft - walk
        })
    }

    // --- Smooth Scroll Animation for Tab Content ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"
                entry.target.style.transform = "translateY(0)"
            }
        })
    }, observerOptions)

    // Observe tab contents for animation
    tabContents.forEach((content) => {
        content.style.opacity = "0"
        content.style.transform = "translateY(20px)"
        content.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        contentObserver.observe(content)
    })

    // --- Utility Functions ---
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

})



document.addEventListener("DOMContentLoaded", () => {
    // --- Testimonials Carousel Functionality ---
    const testimonialsCarousel = document.querySelector(".testimonials-carousel")
    const carouselTrack = testimonialsCarousel ? testimonialsCarousel.querySelector(".carousel-track") : null
    const testimonialCards = testimonialsCarousel ? testimonialsCarousel.querySelectorAll(".testimonial-card") : []

    if (carouselTrack && testimonialCards.length > 0) {
        let isDown = false
        let startX
        let scrollLeft

        // Mouse events for desktop drag
        carouselTrack.addEventListener("mousedown", (e) => {
            isDown = true
            carouselTrack.classList.add("active-drag")
            startX = e.pageX - carouselTrack.offsetLeft
            scrollLeft = carouselTrack.scrollLeft
        })

        carouselTrack.addEventListener("mouseleave", () => {
            isDown = false
            carouselTrack.classList.remove("active-drag")
        })

        carouselTrack.addEventListener("mouseup", () => {
            isDown = false
            carouselTrack.classList.remove("active-drag")
        })

        carouselTrack.addEventListener("mousemove", (e) => {
            if (!isDown) return
            e.preventDefault()
            const x = e.pageX - carouselTrack.offsetLeft
            const walk = (x - startX) * 1.5 // Adjust scroll speed
            carouselTrack.scrollLeft = scrollLeft - walk
        })

        // Touch events for mobile swipe
        carouselTrack.addEventListener("touchstart", (e) => {
            isDown = true
            startX = e.touches[0].pageX - carouselTrack.offsetLeft
            scrollLeft = carouselTrack.scrollLeft
        })

        carouselTrack.addEventListener("touchend", () => {
            isDown = false
        })

        carouselTrack.addEventListener("touchmove", (e) => {
            if (!isDown) return
            const x = e.touches[0].pageX - carouselTrack.offsetLeft
            const walk = (x - startX) * 1.5
            carouselTrack.scrollLeft = scrollLeft - walk
        })
    }

    // --- Learn More Button Functionality (Portfolio Cards) ---
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn")

    learnMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // In a real application, this would navigate to a product detail page
            // or open a modal with more information.
            const cardTitle = button.closest(".portfolio-card").querySelector("h3").textContent
            alert(`You clicked "Learn More" for: ${cardTitle}`)
            console.log(`Learn More clicked for: ${cardTitle}`)
        })
    })

    // --- Talk to an Expert Button Functionality (CTA Section) ---
    const talkToExpertBtn = document.querySelector(".talk-to-expert-btn")

    if (talkToExpertBtn) {
        talkToExpertBtn.addEventListener("click", () => {
            // In a real application, this would open a contact form modal,
            // redirect to a contact page, or initiate a chat.
            alert("Connecting you with an expert! Please wait...")
            console.log("Talk to an Expert button clicked.")
        })
    }

    // --- Intersection Observer for Section Animations ---
    const sectionsToAnimate = document.querySelectorAll(
        ".testimonials-section .section-title, .testimonials-section .section-subtitle, .testimonial-card, " +
        ".portfolio-section .section-title, .portfolio-section .section-subtitle, .portfolio-card, " +
        ".cta-section .cta-box",
    )

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Adjust when element enters viewport
    }

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-up") // Add a class for animation
                observer.unobserve(entry.target) // Stop observing once animated
            }
        })
    }, observerOptions)

})

    //DATASHEET MODEL
    ;(function () {
        const modal = document.getElementById("datasheetModal");
        const openBtn = document.getElementById("dataModal");
        const closeBtn = document.getElementById("dsModalClose");
        const emailInput = document.getElementById("dsEmail");
        const submitBtn = document.getElementById("dsSubmitBtn");
        const form = document.getElementById("dsModalForm");

        if (!modal || !openBtn) return;

        function openModal() {
            modal.classList.add("ds-open");
            document.body.style.overflow = "hidden";
            emailInput.focus();
        }

        function closeModal() {
            modal.classList.remove("ds-open");
            document.body.style.overflow = "";
            form.reset();
            submitBtn.disabled = true;
        }

        // Open on button click
        openBtn.addEventListener("click", openModal);

        // Close on X button
        closeBtn.addEventListener("click", closeModal);

        // Close when clicking the backdrop (outside the box)
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("ds-open")) closeModal();
        });

        // Enable submit only when email field has a valid value
        emailInput.addEventListener("input", () => {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            submitBtn.disabled = !isValid;
        });
    })();


//REQUEST MODEL POPUP
; (function () {
    // This wrapper ensures the script waits for the HTML to load
    const initModal = () => {
        const modal = document.getElementById("quoteModal");
        const openBtn = document.getElementById("RequestModel");
        const closeBtn = document.getElementById("quoteModalClose");
        const form = document.getElementById("quoteModalForm");
        const submitBtn = document.getElementById("quoteSubmitBtn");

        // If the button or modal doesn't exist yet, stop the script
        if (!modal || !openBtn || !submitBtn) {
            console.warn("Modal elements not found. Check your IDs.");
            return;
        }

        const openModal = () => {
            modal.classList.add("ds-open");
            document.body.style.overflow = "hidden";
        };

        const closeModal = () => {
            modal.classList.remove("ds-open");
            document.body.style.overflow = "";
            if (form) form.reset();
        };

        // Attach Listeners safely
        openBtn.addEventListener("click", openModal);
        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("ds-open")) closeModal();
        });


    };

    // Check if DOM is already loaded, otherwise wait for it
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initModal);
    } else {
        initModal();
    }
})();