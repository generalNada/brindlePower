// Slideshow Data - Using images from slideImages folder
const slideshowData = [
  {
    type: "intro",
    title: "Welcome to My Kitchen Design Portfolio",
    description:
      "Explore my approach to creating beautiful, functional kitchen spaces that blend modern aesthetics with timeless design principles. Each project reflects a unique vision tailored to the client's lifestyle and needs.",
    image: "images/slideImages/petSlide_lead.png",
  },
  {
    type: "project",
    title: "Design Project 1",
    description:
      "A beautiful kitchen design showcasing modern functionality and elegant aesthetics.",
    image: "images/slideImages/petSlide_1.jpg",
  },
  {
    type: "project",
    title: "Design Project 2",
    description:
      "Thoughtful design that combines style and practicality for everyday living.",
    image: "images/slideImages/petSlide_2.jpg",
  },
  {
    type: "project",
    title: "Design Project 3",
    description:
      "Creating spaces that inspire and delight through careful attention to detail.",
    image: "images/slideImages/petSlide_3.jpg",
  },
  {
    type: "project",
    title: "Design Project 4",
    description:
      "Custom solutions tailored to each client's unique needs and preferences.",
    image: "images/slideImages/petSlide_4.jpg",
  },
  {
    type: "project",
    title: "Design Project 5",
    description:
      "Innovative layouts that maximize both space and functionality.",
    image: "images/slideImages/petSlide_5.jpg",
  },
  {
    type: "project",
    title: "Design Project 6",
    description:
      "Timeless designs that blend classic elements with contemporary style.",
    image: "images/slideImages/petSlide_6.jpg",
  },
  {
    type: "project",
    title: "Design Project 7",
    description:
      "Premium materials and finishes create luxurious yet livable spaces.",
    image: "images/slideImages/petSlide_7.jpg",
  },
  {
    type: "project",
    title: "Design Project 8",
    description: "Seamless integration of form and function in every design.",
    image: "images/slideImages/petSlide_8.jpg",
  },
  {
    type: "project",
    title: "Design Project 9",
    description:
      "Transformative designs that enhance the way you live and cook.",
    image: "images/slideImages/petSlide_9.jpg",
  },
];

// Gallery Images - Using images from galleryImages folder
const galleryImages = [
  "images/galleryImages/kitchen_1.jpg",
  "images/galleryImages/kitchen_2.jpg",
  "images/galleryImages/kitchen_3.jpg",
  "images/galleryImages/kitchen_4.jpg",
  "images/galleryImages/kitchen_5.jpg",
  "images/galleryImages/kitchen_6.jpg",
];

// Initialize the slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSlideshow();
  initializeGallery();
  setupSectionNavigation();
  setupSmoothScrolling();
});

// Initialize Swiper slideshow
function initializeSlideshow() {
  const slideshowContainer = document.getElementById("slideshow-container");

  // Clear any existing content
  slideshowContainer.innerHTML = "";

  // Generate slides from data
  slideshowData.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = "swiper-slide";

    if (slide.type === "intro") {
      slideElement.innerHTML = `
                <div class="intro-slide">
                    <img src="${slide.image}" alt="${slide.title}" class="intro-image expandable-image" data-image-src="${slide.image}" onerror="this.style.display='none'">
                    <h2 class="intro-title">${slide.title}</h2>
                    <p class="intro-description">${slide.description}</p>
                </div>
            `;
    } else {
      slideElement.innerHTML = `
                <div class="slide-content">
                    <img src="${slide.image}" alt="${slide.title}" class="slide-image expandable-image" data-image-src="${slide.image}" onerror="this.src='https://via.placeholder.com/800x400/ebe6d9/2d5016?text=Kitchen+Design'">
                    <h3 class="slide-title">${slide.title}</h3>
                    <p class="slide-description">${slide.description}</p>
                </div>
            `;
    }

    // Add click handlers to images after they're added to DOM
    setTimeout(() => {
      const images = slideElement.querySelectorAll(".expandable-image");
      images.forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          const imageSrc = img.getAttribute("data-image-src") || img.src;
          expandImage(imageSrc, slide.title);
        });
      });
    }, 0);

    slideshowContainer.appendChild(slideElement);
  });

  // Initialize Swiper
  const swiper = new Swiper(".gallery-swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
    },
    effect: "slide",
    speed: 600,
  });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Skip links with data-section attribute (handled by setupSectionNavigation)
    if (anchor.hasAttribute("data-section")) return;

    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // If it's a hidden section, show it first
        if (targetElement.classList.contains("hidden-section")) {
          // Hide all hidden sections
          document.querySelectorAll(".hidden-section").forEach((section) => {
            section.classList.remove("active");
          });
          // Show the target section
          targetElement.classList.add("active");
        }

        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize Gallery Grid
function initializeGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  galleryGrid.innerHTML = "";

  galleryImages.forEach((imagePath, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.innerHTML = `
      <img src="${imagePath}" alt="Kitchen Design ${
      index + 1
    }" class="gallery-image" loading="lazy" data-image-src="${imagePath}">
      <div class="gallery-overlay">
        <span class="gallery-number">${index + 1}</span>
      </div>
    `;
    galleryGrid.appendChild(galleryItem);

    // Add click handler to expand image - attach to gallery item to avoid overlay blocking
    galleryItem.addEventListener("click", (e) => {
      e.preventDefault();
      expandImage(imagePath, `Kitchen Design ${index + 1}`);
    });
  });
}

// Setup Section Navigation (show/hide sections with toggle)
function setupSectionNavigation() {
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const hiddenSections = document.querySelectorAll(".hidden-section");
  const landingSection = document.querySelector(".landing-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionName = link.getAttribute("data-section");

      // Handle Home link - return to landing content
      if (sectionName === "home") {
        // Hide all hidden sections
        hiddenSections.forEach((section) => {
          section.classList.remove("active");
        });

        // Show landing section
        if (landingSection) {
          landingSection.classList.remove("hidden");
        }

        // Scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetSection = document.getElementById(sectionName);

      if (targetSection) {
        const isCurrentlyActive = targetSection.classList.contains("active");

        if (isCurrentlyActive) {
          // If already active, hide it and show landing
          targetSection.classList.remove("active");
          if (landingSection) {
            landingSection.classList.remove("hidden");
          }

          // Scroll to top
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          // Hide all hidden sections first
          hiddenSections.forEach((section) => {
            section.classList.remove("active");
          });

          // Hide landing section when showing other content
          if (landingSection) {
            landingSection.classList.add("hidden");
          }

          // Show the selected section
          targetSection.classList.add("active");

          // Scroll to section
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Update Swiper if slideshow section
          if (sectionName === "slideshow") {
            setTimeout(() => {
              const swiper = document.querySelector(".gallery-swiper");
              if (swiper && swiper.swiper) {
                swiper.swiper.update();
              }
            }, 100);
          }
        }
      }
    });
  });

  // Check if any section is active on page load and hide landing if so
  const hasActiveSection = Array.from(hiddenSections).some((section) =>
    section.classList.contains("active")
  );
  if (hasActiveSection && landingSection) {
    landingSection.classList.add("hidden");
  }
}

// Expand image function
function expandImage(imageSrc, altText) {
  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <div class="image-modal-content">
      <button class="image-modal-close" aria-label="Close">&times;</button>
      <img src="${imageSrc}" alt="${altText}" class="image-modal-image">
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Close on X button click
  const closeBtn = modal.querySelector(".image-modal-close");
  closeBtn.addEventListener("click", () => closeImageModal(modal));

  // Close on overlay click (outside image)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeImageModal(modal);
    }
  });

  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === "Escape") {
      closeImageModal(modal);
      document.removeEventListener("keydown", escapeHandler);
    }
  };
  document.addEventListener("keydown", escapeHandler);

  // Trigger animation
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

// Close image modal function
function closeImageModal(modal) {
  modal.classList.remove("active");
  setTimeout(() => {
    document.body.removeChild(modal);
    document.body.style.overflow = ""; // Restore scrolling
  }, 300);
}

// Optional: Add keyboard navigation for slideshow
document.addEventListener("keydown", function (e) {
  const slideshowSection = document.getElementById("slideshow");
  if (!slideshowSection) return;

  const rect = slideshowSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  const isActive = slideshowSection.classList.contains("active");

  if (isInView && isActive) {
    const swiper = document.querySelector(".gallery-swiper");
    if (swiper && swiper.swiper) {
      if (e.key === "ArrowLeft") {
        swiper.swiper.slidePrev();
      } else if (e.key === "ArrowRight") {
        swiper.swiper.slideNext();
      }
    }
  }
});
