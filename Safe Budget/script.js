// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// Testimonials carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentTestimonial = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}
function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevTestimonial);
  nextBtn.addEventListener('click', nextTestimonial);
}
// Auto-rotate testimonials every 7 seconds
timer = setInterval(nextTestimonial, 7000);

// Newsletter form validation and feedback
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterFeedback = document.getElementById('newsletter-feedback');
// Confetti Animation on Newsletter Success
function confettiBurst() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  const confetti = [];
  const colors = ['#5f6fff', '#38c172', '#7f53ac', '#e0e7ff', '#fff'];
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 40 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    });
  }
  let angle = 0;
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.01;
    for (let i = 0; i < confetti.length; i++) {
      let c = confetti[i];
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) * 0.7;
      c.x += Math.sin(angle);
      c.tiltAngle += c.tiltAngleIncremental;
      c.tilt = Math.sin(c.tiltAngle) * 15;
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
      ctx.stroke();
    }
    frame++;
    if (frame < 80) {
      requestAnimationFrame(draw);
    } else {
      canvas.style.display = 'none';
    }
  }
  draw();
}
// Newsletter form: trigger confetti on success
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newsletterFeedback.textContent = 'Please enter a valid email address.';
      newsletterFeedback.style.color = '#e53e3e';
      return;
    }
    newsletterFeedback.textContent = 'Thank you for subscribing!';
    newsletterFeedback.style.color = '#38c172';
    newsletterEmail.value = '';
    confettiBurst();
    setTimeout(() => {
      newsletterFeedback.textContent = '';
    }, 4000);
  });
}

// Back to Top button
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
function setDarkMode(enabled) {
  if (enabled) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('safeBudgetDarkMode', 'true');
  } else {
    body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('safeBudgetDarkMode', 'false');
  }
}
darkModeToggle.addEventListener('click', () => {
  setDarkMode(!body.classList.contains('dark-mode'));
});
// On load, set dark mode if user previously enabled it
if (localStorage.getItem('safeBudgetDarkMode') === 'true') {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

// Section fade-in animation
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// Button Ripple Effect
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  circle.classList.add('ripple');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  const rect = button.getBoundingClientRect();
  circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
  circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
  button.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}
[...document.querySelectorAll('button'), ...document.querySelectorAll('.cta')].forEach(btn => {
  btn.addEventListener('click', createRipple);
});
// FAQ Chevron Animation
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const chevron = question.querySelector('.chevron');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
    if (item.classList.contains('open')) {
      chevron.classList.add('open');
    } else {
      chevron.classList.remove('open');
    }
  });
});
// Header Shrink on Scroll
const mainNav = document.querySelector('.main-nav');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    mainNav.classList.add('shrink');
  } else {
    mainNav.classList.remove('shrink');
  }
});
// Download Button Explosion Effect
const downloadBtn = document.querySelector('.download .cta');
downloadBtn.addEventListener('click', function(e) {
  const btn = this;
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('span');
    particle.className = 'ripple';
    particle.style.background = `hsl(${Math.random()*360},80%,60%)`;
    const size = Math.random() * 12 + 8;
    particle.style.width = particle.style.height = `${size}px`;
    particle.style.position = 'absolute';
    particle.style.left = `${e.offsetX}px`;
    particle.style.top = `${e.offsetY}px`;
    particle.style.opacity = 1;
    particle.style.pointerEvents = 'none';
    btn.appendChild(particle);
    setTimeout(() => {
      particle.style.transform = `translate(${Math.cos(i/3)*60}px,${Math.sin(i/3)*60}px) scale(1.5)`;
      particle.style.opacity = 0;
    }, 10);
    setTimeout(() => particle.remove(), 700);
  }
});
// Parallax Hero Background
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
  if (window.innerWidth > 700) {
    hero.style.backgroundPosition = `center ${window.scrollY * 0.3}px`;
  }
});
// FAQ Smooth Expand/Collapse
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const chevron = question.querySelector('.chevron');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
    if (item.classList.contains('open')) {
      chevron.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      chevron.classList.remove('open');
      answer.style.maxHeight = '0px';
    }
  });
  // Set initial state
  answer.style.overflow = 'hidden';
  answer.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)';
  answer.style.maxHeight = '0px';
});
// Testimonials Carousel: Drag/Swipe & Keyboard
let startX = 0, isDragging = false;
const testimonialList = document.querySelector('.testimonial-list');
function announceTestimonial(idx) {
  testimonialList.setAttribute('aria-live', 'polite');
  testimonialList.setAttribute('aria-label', testimonials[idx].textContent.trim());
}
testimonialList.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevTestimonial();
    announceTestimonial(currentTestimonial);
  } else if (e.key === 'ArrowRight') {
    nextTestimonial();
    announceTestimonial(currentTestimonial);
  }
});
testimonialList.addEventListener('focus', () => announceTestimonial(currentTestimonial));
// Touch/drag support
function handleDragStart(e) {
  isDragging = true;
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
}
function handleDragMove(e) {
  if (!isDragging) return;
  const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  if (x - startX > 40) {
    prevTestimonial();
    announceTestimonial(currentTestimonial);
    isDragging = false;
  } else if (x - startX < -40) {
    nextTestimonial();
    announceTestimonial(currentTestimonial);
    isDragging = false;
  }
}
function handleDragEnd() {
  isDragging = false;
}
testimonialList.addEventListener('mousedown', handleDragStart);
testimonialList.addEventListener('mousemove', handleDragMove);
testimonialList.addEventListener('mouseup', handleDragEnd);
testimonialList.addEventListener('mouseleave', handleDragEnd);
testimonialList.addEventListener('touchstart', handleDragStart);
testimonialList.addEventListener('touchmove', handleDragMove);
testimonialList.addEventListener('touchend', handleDragEnd); 

// Live animated blob background
(function animateBlobs() {
  const canvas = document.getElementById('live-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();
  // More, smaller, faster blobs
  const pastelColors = [
    'rgba(163, 216, 244, 0.32)', // pastel blue
    'rgba(228, 193, 249, 0.28)', // pastel purple
    'rgba(255, 234, 246, 0.22)', // pastel blush
    'rgba(184, 242, 230, 0.22)', // pastel mint
    'rgba(255, 255, 255, 0.18)', // white
    'rgba(181, 126, 230, 0.18)', // soft violet
    'rgba(63, 167, 245, 0.18)',  // blue
    'rgba(67, 217, 163, 0.18)'   // green
  ];
  const blobs = Array.from({length: 10}, (_, i) => ({
    color: pastelColors[i % pastelColors.length],
    r: 40 + Math.random() * 50, // 40-90px
    x: Math.random(),
    y: Math.random(),
    a: Math.random() * Math.PI * 2,
    s: 2 + Math.random() * 1.5 // speed: 2-3.5
  }));
  function drawBlob(blob, t) {
    const cx = width * blob.x + Math.sin(t * blob.s + blob.a) * 40;
    const cy = height * blob.y + Math.cos(t * blob.s + blob.a) * 40;
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const rad = blob.r + Math.sin(t * 2.2 + angle * 2 + blob.a) * 10;
      const x = cx + Math.cos(angle) * rad;
      const y = cy + Math.sin(angle) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = blob.color;
    ctx.filter = 'blur(1.5px)';
    ctx.fill();
    ctx.restore();
  }
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const t = performance.now() / 900; // faster
    blobs.forEach(blob => drawBlob(blob, t));
    ctx.filter = 'none';
    requestAnimationFrame(animate);
  }
  animate();
})();

// Screenshot lightbox functionality
const screenshotImages = document.querySelectorAll('.screenshots-grid img');
let currentImageIndex = 0;

// Create lightbox modal
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#8592;</button>
    <button class="lightbox-next" aria-label="Next image">&#8594;</button>
    <img class="lightbox-image" alt="Screenshot" />
    <div class="lightbox-counter"></div>
  </div>
`;
document.body.appendChild(lightbox);

// Add click handlers to screenshots
screenshotImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentImageIndex = index;
    showLightbox();
  });
});

function showLightbox() {
  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const counter = lightbox.querySelector('.lightbox-counter');
  const currentImg = screenshotImages[currentImageIndex];
  
  lightboxImg.src = currentImg.src;
  lightboxImg.alt = currentImg.alt;
  counter.textContent = `${currentImageIndex + 1} / ${screenshotImages.length}`;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % screenshotImages.length;
  showLightbox();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + screenshotImages.length) % screenshotImages.length;
  showLightbox();
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) hideLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') hideLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// Screenshot filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const screenshotItems = document.querySelectorAll('.screenshot-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter screenshots
    screenshotItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
        setTimeout(() => {
          item.style.display = 'block';
        }, 300);
      } else {
        item.classList.add('hidden');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
    
    // Reorder visible items
    setTimeout(() => {
      const visibleItems = document.querySelectorAll('.screenshot-item:not(.hidden)');
      visibleItems.forEach((item, index) => {
        const number = item.querySelector('.screenshot-number');
        if (number) {
          number.textContent = index + 1;
        }
      });
    }, 350);
  });
});