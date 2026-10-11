/* =========================================
   DEEPAKFOLIO - ADVANCED JAVASCRIPT
   ========================================= */
 
 
/* =========================================
   1. DOM ELEMENTS
   ========================================= */
 
const menuToggle = document.getElementById("navBtn");
const navLinks = document.getElementById("navlinks");
const navItems = document.querySelectorAll("#navlinks a");
 
const progressBar = document.querySelector(".scroll-progress");
const backToTop = document.querySelector(".back-to-top");
const cursorGlow = document.querySelector(".cursor-glow");
 
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .interests-card, .skill-item, .project-card, .timeline-item, .contact-container"
);
 
 
/* =========================================
   2. MOBILE MENU
   ========================================= */
 
if (menuToggle && navLinks) {
 
    menuToggle.addEventListener("click", () => {
 
        navLinks.classList.toggle("open");
 
    });
 
 
    // Close menu after clicking navigation link
 
    navItems.forEach(link => {
 
        link.addEventListener("click", () => {
 
            navLinks.classList.remove("open");
 
        });
 
    });
 
}
 
 
/* =========================================
   3. SMOOTH INTERNAL NAVIGATION
   ========================================= */
 
document.querySelectorAll('a[href^="#"]').forEach(link => {
 
    link.addEventListener("click", function (event) {
 
        const targetId = this.getAttribute("href");
 
        if (!targetId || targetId === "#") {
            return;
        }
 
        const target = document.querySelector(targetId);
 
        if (!target) {
            return;
        }
 
        event.preventDefault();
 
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
 
 
        // Highlight skill when clicking skill links
 
        if (targetId.startsWith("#skill-")) {
 
            highlightSkill(targetId);
 
        }
 
    });
 
});
 
 
/* =========================================
   4. SKILL HIGHLIGHT
   ========================================= */
 
function highlightSkill(targetId) {
 
    const skill = document.querySelector(targetId);
 
    if (!skill) {
        return;
    }
 
    // Remove old highlight
 
    document.querySelectorAll(".skill-focus").forEach(element => {
        element.classList.remove("skill-focus");
    });
 
 
    // Add highlight
 
    skill.classList.add("skill-focus");
 
 
    // Remove after 2 seconds
 
    setTimeout(() => {
 
        skill.classList.remove("skill-focus");
 
    }, 2000);
 
}
 
 
/* =========================================
   5. SCROLL PROGRESS BAR
   ========================================= */
 
function updateScrollProgress() {
 
    if (!progressBar) {
        return;
    }
 
    const scrollTop = window.scrollY;
 
    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
 
    if (documentHeight <= 0) {
        return;
    }
 
    const percentage =
        (scrollTop / documentHeight) * 100;
 
    progressBar.style.width = `${percentage}%`;
 
}
 
window.addEventListener("scroll", updateScrollProgress);
 
updateScrollProgress();
 
 
/* =========================================
   6. ACTIVE NAVIGATION
   ========================================= */
 
function updateActiveNavigation() {
 
    const scrollPosition =
        window.scrollY + 150;
 
    sections.forEach(section => {
 
        const sectionTop = section.offsetTop;
 
        const sectionHeight = section.offsetHeight;
 
        const sectionId = section.getAttribute("id");
 
        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
 
            navItems.forEach(link => {
 
                link.classList.remove("active");
 
            });
 
            const activeLink =
                document.querySelector(
                    `#navlinks a[href="#${sectionId}"]`
                );
 
            if (activeLink) {
 
                activeLink.classList.add("active");
 
            }
 
        }
 
    });
 
}
 
window.addEventListener("scroll", updateActiveNavigation);
 
updateActiveNavigation();
 
 
/* =========================================
   7. SCROLL REVEAL ANIMATION
   ========================================= */
 
if ("IntersectionObserver" in window) {
 
    const observer = new IntersectionObserver(
 
        (entries, observer) => {
 
            entries.forEach(entry => {
 
                if (entry.isIntersecting) {
 
                    entry.target.classList.add("visible");
 
                    observer.unobserve(entry.target);
 
                }
 
            });
 
        },
 
        {
            threshold: 0.15
        }
 
    );
 
 
    revealElements.forEach(element => {
 
        element.classList.add("reveal");
 
        observer.observe(element);
 
    });
 
}
 
 
/* =========================================
   8. PROGRESS BAR ANIMATION (Skills + Journey)
   ========================================= */
 
const skillSection = document.querySelector("#skills");
 
 
function animateFillsIn(container) {
 
    if (!container) {
        return;
    }
 
    const fills =
        container.querySelectorAll(".fill[data-w]");
 
    fills.forEach((fillEl, index) => {
 
        const targetWidth =
            fillEl.getAttribute("data-w") + "%";
 
        setTimeout(() => {
 
            fillEl.style.width = targetWidth;
 
        }, index * 120);
 
    });
 
}
 
 
if ("IntersectionObserver" in window) {
 
    const progressObserver =
        new IntersectionObserver(
 
            entries => {
 
                entries.forEach(entry => {
 
                    if (entry.isIntersecting) {
 
                        animateFillsIn(entry.target);
 
                        progressObserver.unobserve(
                            entry.target
                        );
 
                    }
 
                });
 
            },
 
            {
                threshold: 0.3
            }
 
        );
 
    document.querySelectorAll("section[id]").forEach(sec => {
 
        if (sec.querySelector(".fill[data-w]")) {
 
            progressObserver.observe(sec);
 
        }
 
    });
 
}
 
 
/* =========================================
   9. CURSOR GLOW EFFECT
   ========================================= */
 
if (cursorGlow) {
 
    document.addEventListener("mousemove", event => {
 
        cursorGlow.style.left =
            `${event.clientX}px`;
 
        cursorGlow.style.top =
            `${event.clientY}px`;
 
    });
 
}
 
 
/* =========================================
   10. PROJECT CARD 3D TILT
   ========================================= */
 
const projectCards =
    document.querySelectorAll(".project-card");
 
 
projectCards.forEach(card => {
 
    card.addEventListener("mousemove", event => {
 
        const rect =
            card.getBoundingClientRect();
 
        const x =
            event.clientX - rect.left;
 
        const y =
            event.clientY - rect.top;
 
 
        const centerX =
            rect.width / 2;
 
        const centerY =
            rect.height / 2;
 
 
        const rotateX =
            ((y - centerY) / centerY) * -5;
 
        const rotateY =
            ((x - centerX) / centerX) * 5;
 
 
        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;
 
    });
 
 
    card.addEventListener("mouseleave", () => {
 
        card.style.transform =
            "";
 
    });
 
});
 
 
/* =========================================
   11. BACK TO TOP BUTTON
   ========================================= */
 
function toggleBackToTop() {
 
    if (!backToTop) {
        return;
    }
 
    if (window.scrollY > 500) {
 
        backToTop.classList.add("show");
 
    } else {
 
        backToTop.classList.remove("show");
 
    }
 
}
 
window.addEventListener("scroll", toggleBackToTop);
 
toggleBackToTop();
 
 
if (backToTop) {
 
    backToTop.addEventListener("click", () => {
 
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
 
    });
 
}
 
 
/* =========================================
   12. CONTACT FORM
   ========================================= */
 
const contactForm =
    document.querySelector(".contact-form");
 
 
if (contactForm) {
 
    contactForm.addEventListener("submit", event => {
 
        event.preventDefault();
 
        showToast(
            "Message sent successfully!"
        );
 
        contactForm.reset();
 
    });
 
}
 
 
/* =========================================
   13. TOAST MESSAGE
   ========================================= */
 
const toast =
    document.querySelector(".toast");
 
 
function showToast(message) {
 
    if (!toast) {
        return;
    }
 
    const toastText =
        toast.querySelector("span");
 
    if (toastText) {
 
        toastText.textContent =
            message;
 
    } else {
 
        toast.textContent =
            message;
 
    }
 
    toast.classList.add("show");
 
 
    setTimeout(() => {
 
        toast.classList.remove("show");
 
    }, 3000);
 
}
 
 
/* =========================================
   14. PROJECT LINK INTERACTION
   ========================================= */
 
document.querySelectorAll(".project-link")
    .forEach(link => {
 
        link.addEventListener("click", () => {
 
            const target =
                link.getAttribute("href");
 
            if (target === "#contact") {
 
                setTimeout(() => {
 
                    showToast(
                        "Let's discuss this project!"
                    );
 
                }, 700);
 
            }
 
        });
 
    });
 
 
/* =========================================
   15. FLOATING SKILLS
   ========================================= */
 
document.querySelectorAll(".skills-float .chip")
    .forEach(chip => {
 
        chip.addEventListener("click", () => {
 
            const target =
                chip.getAttribute("href");
 
            if (
                target &&
                target.startsWith("#skill-")
            ) {
 
                setTimeout(() => {
 
                    highlightSkill(target);
 
                }, 500);
 
            }
 
        });
 
    });
 
 
/* =========================================
   16. PROJECT TECHNOLOGY LINKS
   ========================================= */
 
document.querySelectorAll(".stack-tags a")
    .forEach(tag => {
 
        tag.addEventListener("click", () => {
 
            const target =
                tag.getAttribute("href");
 
            if (
                target &&
                target.startsWith("#skill-")
            ) {
 
                setTimeout(() => {
 
                    highlightSkill(target);
 
                }, 500);
 
            }
 
        });
 
    });
 
 
/* =========================================
   17. INTERESTS HOVER / CLICK
   ========================================= */
 
document.querySelectorAll(".interest-item")
    .forEach(item => {
 
        item.addEventListener("click", () => {
 
            item.classList.add("clicked");
 
            setTimeout(() => {
 
                item.classList.remove("clicked");
 
            }, 500);
 
        });
 
    });
 
 
/* =========================================
   18. EXPLORING TAGS
   ========================================= */
 
document.querySelectorAll(".explore-tag")
    .forEach(tag => {
 
        tag.addEventListener("click", () => {
 
            tag.classList.add("active-tag");
 
            setTimeout(() => {
 
                tag.classList.remove("active-tag");
 
            }, 500);
 
        });
 
    });
 
 
/* =========================================
   19. KEYBOARD ACCESSIBILITY
   ========================================= */
 
projectCards.forEach(card => {
 
    card.setAttribute("tabindex", "0");
 
 
    card.addEventListener("keydown", event => {
 
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
 
            event.preventDefault();
 
            const link =
                card.querySelector(".project-link");
 
            if (link) {
 
                link.click();
 
            }
 
        }
 
    });
 
});
 
 
/* =========================================
   20. DYNAMIC FOOTER YEAR
   ========================================= */
 
const yearElement =
    document.querySelector("#year");
 
 
if (yearElement) {
 
    yearElement.textContent =
        new Date().getFullYear();
 
}
 
 
/* =========================================
   21. HEADER SHADOW ON SCROLL
   ========================================= */
 
const header =
    document.querySelector(".header");
 
 
function updateHeader() {
 
    if (!header) {
        return;
    }
 
    if (window.scrollY > 50) {
 
        header.classList.add("scrolled");
 
    } else {
 
        header.classList.remove("scrolled");
 
    }
 
}
 
window.addEventListener("scroll", updateHeader);
 
updateHeader();
 
 
/* =========================================
   22. ESCAPE KEY CLOSE MOBILE MENU
   ========================================= */
 
document.addEventListener("keydown", event => {
 
    if (event.key === "Escape") {
 
        if (navLinks) {
 
            navLinks.classList.remove("show");
 
        }
 
        if (menuToggle) {
 
            const icon =
                menuToggle.querySelector("i");
 
            if (icon) {
 
                icon.classList.remove(
                    "fa-xmark"
                );
 
                icon.classList.add(
                    "fa-bars"
                );
 
            }
 
        }
 
    }
 
});
 
 
/* =========================================
   23. PAGE LOADED
   ========================================= */
 
window.addEventListener("load", () => {
 
    document.body.classList.add("loaded");
 
});
 
 
/* =========================================
   24. BENTO — WRITING CODE (typing effect)
   ========================================= */
 
const codeBox = document.getElementById('codeBox');
const codeOutput = document.getElementById('codeOutput');
const lineNumbers = document.getElementById('lineNumbers');
 
if (codeBox && codeOutput) {
 
    const codeTokens = [
        { t: 'const ', c: 'kw' },
        { t: 'deepak', c: '' },
        { t: ' = ', c: '' },
        { t: '{\n', c: '' },
        { t: '  skills', c: '' },
        { t: ': ', c: '' },
        { t: "['C++', 'Python', 'Java']", c: 'str' },
        { t: ',\n', c: '' },
        { t: '  passion', c: '' },
        { t: ': ', c: '' },
        { t: "'solving real problems'", c: 'str' },
        { t: ',\n', c: '' },
        { t: '  experience', c: '' },
        { t: ': ', c: '' },
        { t: '3', c: 'num' },
        { t: ',\n', c: '' },
        { t: '  ', c: '' },
        { t: 'learn', c: 'fn' },
        { t: '() {\n', c: '' },
        { t: '    ', c: '' },
        { t: '// never stop\n', c: 'cm' },
        { t: '    return ', c: 'kw' },
        { t: 'this', c: 'kw' },
        { t: '.grow();\n', c: '' },
        { t: '  }\n', c: '' },
        { t: '};', c: '' }
    ];
 
    let typingTimer = null;
    let isTyping = false;
 
    function countCodeLines(tokens, upToTokenIndex) {
        let text = '';
        for (let i = 0; i <= upToTokenIndex && i < tokens.length; i++) text += tokens[i].t;
        return text.split('\n').length;
    }
 
    function renderLineNumbers(n) {
        if (!lineNumbers) return;
        let html = '';
        for (let i = 1; i <= n; i++) html += i + '\n';
        lineNumbers.textContent = html.trim();
    }
 
    function resetCodeOutput() {
        codeOutput.innerHTML = '';
        if (lineNumbers) lineNumbers.textContent = '1';
    }
 
    function fillCodeInstant() {
        codeOutput.innerHTML = '';
        let currentSpan = document.createElement('span');
        let currentClass = codeTokens[0].c || '';
        if (currentClass) currentSpan.className = currentClass;
        codeOutput.appendChild(currentSpan);
        codeTokens.forEach(token => {
            if ((token.c || '') !== currentClass) {
                currentSpan = document.createElement('span');
                currentClass = token.c || '';
                if (currentClass) currentSpan.className = currentClass;
                codeOutput.appendChild(currentSpan);
            }
            currentSpan.textContent += token.t;
        });
        renderLineNumbers(countCodeLines(codeTokens, codeTokens.length - 1));
    }
 
    function typeCode() {
        resetCodeOutput();
        isTyping = true;
        let tIndex = 0, cIndex = 0;
        let currentSpan = document.createElement('span');
        if (codeTokens[0].c) currentSpan.className = codeTokens[0].c;
        codeOutput.appendChild(currentSpan);
 
        function step() {
            if (!isTyping) return;
            if (tIndex >= codeTokens.length) return;
 
            const token = codeTokens[tIndex];
            if (currentSpan.className !== (token.c || '')) {
                currentSpan = document.createElement('span');
                if (token.c) currentSpan.className = token.c;
                codeOutput.appendChild(currentSpan);
            }
 
            currentSpan.textContent += token.t[cIndex];
            cIndex++;
 
            renderLineNumbers(countCodeLines(codeTokens, tIndex));
 
            if (cIndex >= token.t.length) {
                tIndex++;
                cIndex = 0;
            }
 
            typingTimer = setTimeout(step, 20 + Math.random() * 26);
        }
        step();
    }
 
    // Show the finished code right away — box is never empty.
    fillCodeInstant();
 
    codeBox.addEventListener('mouseenter', () => {
        clearTimeout(typingTimer);
        typeCode();
    });
 
    codeBox.addEventListener('mouseleave', () => {
        isTyping = false;
        clearTimeout(typingTimer);
        fillCodeInstant();
    });
}
 
 
/* =========================================
   25. BENTO — WEB DEV (address bar typing)
   ========================================= */
 
const webdevBox = document.getElementById('webdevBox');
const wfUrlText = document.getElementById('wfUrlText');
 
if (webdevBox && wfUrlText) {
 
    const urlString = 'deepakfolio.dev';
    let urlTimer = null;
    let urlTyping = false;
 
    function typeUrl() {
        wfUrlText.textContent = '';
        urlTyping = true;
        let i = 0;
        function step() {
            if (!urlTyping) return;
            if (i >= urlString.length) return;
            wfUrlText.textContent += urlString[i];
            i++;
            urlTimer = setTimeout(step, 45 + Math.random() * 40);
        }
        step();
    }
 
    // Pre-fill the address bar so it's never blank before hovering.
    wfUrlText.textContent = urlString;
 
    webdevBox.addEventListener('mouseenter', () => {
        clearTimeout(urlTimer);
        typeUrl();
    });
    webdevBox.addEventListener('mouseleave', () => {
        urlTyping = false;
        clearTimeout(urlTimer);
        wfUrlText.textContent = urlString;
    });
}
 
 
/* =========================================
   26. DARK / LIGHT MODE TOGGLE
   ========================================= */
 
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
 
function getSavedTheme() {
    try {
        return localStorage.getItem('deepakfolio-theme');
    } catch (e) {
        return null;
    }
}
 
function saveTheme(value) {
    try {
        localStorage.setItem('deepakfolio-theme', value);
    } catch (e) {
        /* storage unavailable — theme just won't persist across visits */
    }
}
 
function applyTheme(theme) {
    if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        root.removeAttribute('data-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}
 
// Respect a previously saved choice; otherwise default to dark.
applyTheme(getSavedTheme() === 'light' ? 'light' : 'dark');
 
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        applyTheme(next);
        saveTheme(next);
    });
}
 
 
/* =========================================
   27. GALLERY LIGHTBOX
   ========================================= */
 
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
 
let currentGalleryIndex = 0;
 
function imageLoadedOk(imgEl) {
    return !!(imgEl && imgEl.complete && imgEl.naturalWidth > 0 && imgEl.style.display !== 'none');
}
 
function openLightbox(index) {
    if (!lightbox || galleryItems.length === 0) return;
 
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || '';
 
    if (imageLoadedOk(img)) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || caption;
        lightboxImg.classList.add('show');
        lightboxPlaceholder.classList.remove('show');
    } else {
        lightboxImg.classList.remove('show');
        lightboxImg.src = '';
        lightboxPlaceholder.classList.add('show');
    }
 
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-lock');
}
 
function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-lock');
}
 
function showNextImage(step) {
    openLightbox(currentGalleryIndex + step);
}
 
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});
 
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => showNextImage(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => showNextImage(1));
 
if (lightbox) {
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });
}
 
document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showNextImage(-1);
    if (event.key === 'ArrowRight') showNextImage(1);
});
 
 
console.log(
    "🚀 DeepakFolio JavaScript Loaded Successfully!"
);
 