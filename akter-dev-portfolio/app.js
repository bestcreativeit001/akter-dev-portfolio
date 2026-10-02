/**
 * Akter Dev — Full-Stack Web Developer Portfolio Engine
 * Dynamic Particles • Project Modals • Fiverr Message Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Ambient Particle Canvas
    initParticleCanvas();

    // 2. Navigation & Mobile Menu
    initNavigation();

    // 3. Skills Filtering Tabs
    initSkillsFilter();

    // 4. Projects Filtering
    initProjectsFilter();

    // 5. Project Case Study Modals
    initProjectModals();

    // 6. Interactive Fiverr Inquiry Generator
    initFiverrScopeGenerator();

    // 7. Package Selector Hookup
    initPackageButtons();

    // 8. FAQ Accordion
    initFaqAccordion();

    // 9. Code Snippet Copy Action
    initCodeCopy();
});

/* ==========================================================================
   1. Interactive Background Particle Canvas
   ========================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('bgParticleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(45, Math.floor(w / 35));

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 1.8 + 0.8,
            color: i % 2 === 0 ? 'rgba(29, 191, 115, ' : 'rgba(0, 229, 255, '
        });
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '0.5)';
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(29, 191, 115, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. Navigation & Smooth Scrolling
   ========================================================================== */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const icon = mobileToggle ? mobileToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    // Active Section Spy
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ==========================================================================
   3. Skills Filter Tabs
   ========================================================================== */
function initSkillsFilter() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillItems = document.querySelectorAll('.skill-item');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            skillItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   4. Projects Filter Tabs
   ========================================================================== */
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   5. Project Case Study Modals
   ========================================================================== */
const projectData = {
    chronocanvas: {
        tag: 'Featured Flagship Project • Web AI & Pre-Press',
        title: 'ChronoCanvas Studio — 300 DPI Pre-Press Engine',
        desc: 'A commercial in-browser design suite for manufacturing personalized canvas wall-clocks. Designed with an advanced 2D rendering pipeline capable of exporting 300 DPI print-ready master files.',
        features: [
            'Client-Side Neural AI Background Remover (RMBG-1.4 & ModNet via ONNX Web)',
            '6 Floating Transparent Dial Styles (Gold Roman, Minimal Ring, Frosted Glass, Skeleton Wireframe, Frameless)',
            'Dynamic Layer Hierarchy (Clock over Person or Person over Clock Face)',
            'Precision Center Drill Hole Punch Marker (Ø 8mm) for physical quartz motor mounting',
            'Live DPI Scaler supporting 12x12 up to 20x30 inch prints (6000x9000px)'
        ],
        techStack: 'HTML5 2D Canvas, Web AI / Transformers.js, Vanilla ES6+, PowerShell Server, CSS Glassmorphism',
        github: 'https://github.com/bestcreativeit001',
        fiverrPackage: 'Premium ($250)'
    },
    realestate: {
        tag: 'Full-Stack Solution • Property CRM',
        title: 'MeluxCity — Luxury Property & Real Estate Hub',
        desc: 'A complete full-stack real estate discovery portal engineered for high conversion and lead acquisition. Featuring dynamic multi-parameter property filtering and agent dashboard.',
        features: [
            'Multi-Criteria Live Search (Price slider, bedrooms, amenities, map coordinates)',
            'Automated Lead Routing to assigned real estate agents via webhooks',
            'Interactive High-Res Floorplans and responsive gallery showcase',
            'Optimized relational database schema handling thousands of listings with sub-second queries'
        ],
        techStack: 'PHP / Laravel, MySQL, JavaScript, REST APIs, Tailwind Architecture',
        github: 'https://github.com/bestcreativeit001',
        fiverrPackage: 'Standard ($120)'
    },
    decomart: {
        tag: 'eCommerce Engine • Conversion Focused',
        title: 'Decomart — High-Conversion eCommerce Platform',
        desc: 'Engineered for online merchants seeking fast load times and zero-friction checkout. Features an interactive product matrix and dynamic invoice generation.',
        features: [
            'Instant Slide-in Cart Drawer with live item calculations and discount logic',
            'Dynamic Product Variant Matrix (Live color, size, and stock level switching)',
            'Automated PDF / HTML Invoice Generator for commercial accounting',
            'Mobile-first responsive UX with 98+ Google PageSpeed score'
        ],
        techStack: 'JavaScript ES6+, PHP Backend, MySQL, CSS Grid, Payment Gateway Hooks',
        github: 'https://github.com/bestcreativeit001',
        fiverrPackage: 'Standard ($120)'
    },
    asmaul: {
        tag: 'Interactive Cultural Web App',
        title: 'Asmaul Husna — Interactive Spiritual Explorer',
        desc: 'A multilingual web exploration tool featuring synchronized audio recitations and graceful cultural Arabic typography with dark/light visual ambiance.',
        features: [
            'Web Audio API integration with synchronized visual audio waveform feedback',
            'Multilingual Translation indexing (English, Bengali, Urdu, and Arabic)',
            'Local Storage persistence for bookmarked favorites and audio playlist state',
            'Smooth SVG animations and accessibility compliant typography'
        ],
        techStack: 'Web Audio API, Vanilla JavaScript, Semantic HTML5, CSS Flex/Grid',
        github: 'https://github.com/bestcreativeit001',
        fiverrPackage: 'Basic ($45)'
    }
};

function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const triggers = document.querySelectorAll('.btn-preview-modal, .btn-modal-trigger');

    if (!modal || !modalContent) return;

    triggers.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const pKey = btn.dataset.project;
            const data = projectData[pKey];
            if (!data) return;

            modalContent.innerHTML = `
                <div class="modal-header-row">
                    <span class="modal-tag">${data.tag}</span>
                    <h3 class="modal-title">${data.title}</h3>
                </div>
                <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 20px;">
                    ${data.desc}
                </p>
                <h4 style="font-size: 15px; color: var(--text-highlight); margin-bottom: 10px;">🌟 Key Architecture &amp; Features:</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; margin-bottom: 22px;">
                    ${data.features.map(f => `<li style="font-size: 14px; color: var(--text-primary); display: flex; align-items: flex-start; gap: 10px;"><i class="fa-solid fa-check-circle text-fiverr" style="margin-top: 3px;"></i> <span>${f}</span></li>`).join('')}
                </ul>
                <div class="modal-highlights">
                    <div class="m-highlight-item">
                        <strong>Tech Stack</strong>
                        <span>${data.techStack}</span>
                    </div>
                    <div class="m-highlight-item">
                        <strong>Fiverr Tier</strong>
                        <span>${data.fiverrPackage}</span>
                    </div>
                    <div class="m-highlight-item">
                        <strong>Code Ownership</strong>
                        <span>Full Source Included</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="https://github.com/bestcreativeit001" target="_blank" rel="noopener noreferrer" class="btn-link-action">
                        <i class="fa-brands fa-github"></i> Inspect GitHub
                    </a>
                    <a href="#contact" class="btn-fiverr-primary btn-modal-order" style="margin-left: auto;">
                        <i class="fa-solid fa-bolt"></i> Order Similar on Fiverr
                    </a>
                </div>
            `;

            // Modal CTA hookup
            const orderBtn = modalContent.querySelector('.btn-modal-order');
            if (orderBtn) {
                orderBtn.addEventListener('click', () => {
                    closeModal();
                    selectProjectInForm(data.title);
                });
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. Interactive Fiverr Inquiry Generator
   ========================================================================== */
function initFiverrScopeGenerator() {
    const projectType = document.getElementById('projectType');
    const budgetRange = document.getElementById('budgetRange');
    const timelineTarget = document.getElementById('timelineTarget');
    const customNotes = document.getElementById('customNotes');
    const previewText = document.getElementById('previewText');
    const btnCopyFiverrMsg = document.getElementById('btnCopyFiverrMsg');
    const btnGoToFiverr = document.getElementById('btnGoToFiverr');

    if (!projectType || !budgetRange || !timelineTarget || !previewText) return;

    function updatePreview() {
        const type = projectType.value;
        const budget = budgetRange.value;
        const timeline = timelineTarget.value;
        const notes = customNotes.value.trim();

        let msg = `Hi Akter! I reviewed your developer portfolio and would like to hire you for a ${type}. Budget: ${budget}, Timeline: ${timeline}.`;
        if (notes) {
            msg += ` Project details: "${notes}".`;
        }
        msg += ` Looking forward to discussing this and receiving your Fiverr custom offer!`;

        previewText.textContent = msg;

        // Update Fiverr button link (standard Fiverr profile message)
        const encodedMsg = encodeURIComponent(msg);
        btnGoToFiverr.href = `https://www.fiverr.com`;
    }

    projectType.addEventListener('change', updatePreview);
    budgetRange.addEventListener('change', updatePreview);
    timelineTarget.addEventListener('change', updatePreview);
    customNotes.addEventListener('input', updatePreview);

    // Initial update
    updatePreview();

    // Copy to clipboard
    if (btnCopyFiverrMsg) {
        btnCopyFiverrMsg.addEventListener('click', () => {
            const textToCopy = previewText.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Fiverr message copied! Ready to paste into Fiverr inbox.');
            }).catch(() => {
                // Fallback
                const ta = document.createElement('textarea');
                ta.value = textToCopy;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                showToast('Fiverr message copied! Ready to paste into Fiverr inbox.');
            });
        });
    }
}

function selectProjectInForm(projectTitle) {
    const customNotes = document.getElementById('customNotes');
    if (customNotes) {
        customNotes.value = `I am interested in a web solution similar to your "${projectTitle}" project.`;
        customNotes.dispatchEvent(new Event('input'));
    }
}

/* ==========================================================================
   7. Package Action Hookups
   ========================================================================== */
function initPackageButtons() {
    const packageBtns = document.querySelectorAll('.btn-package-action');
    const budgetSelect = document.getElementById('budgetRange');

    packageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tier = btn.dataset.tier;
            if (budgetSelect && tier) {
                if (tier.includes('Basic')) budgetSelect.value = '$45 - $100 (Starter)';
                else if (tier.includes('Standard')) budgetSelect.value = '$120 - $250 (Standard)';
                else if (tier.includes('Premium')) budgetSelect.value = '$250 - $500 (Advanced)';

                budgetSelect.dispatchEvent(new Event('change'));
            }
        });
    });
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   9. Code Snippet Copy Action
   ========================================================================== */
function initCodeCopy() {
    const btnCopyCode = document.getElementById('btnCopyCode');
    if (!btnCopyCode) return;

    btnCopyCode.addEventListener('click', () => {
        const codeText = document.querySelector('.terminal-body code');
        if (!codeText) return;

        navigator.clipboard.writeText(codeText.innerText).then(() => {
            showToast('Akter Dev stack snippet copied to clipboard!');
        });
    });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}
