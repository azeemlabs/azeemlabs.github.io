// Azeem Labs - Dynamic Navigation & Layout Engine

// 1. Menu ki data list (Yahan aap aasani se naye pages add kar sakte hain)
const menuItems = [
    { name: "Home", url: "index.html" },
    { name: "Blogs", url: "#blogs" },
    { name: "App Updates", url: "#updates" },
    { name: "Portfolio", url: "#portfolio" }
];

// 2. Menu links generate karne ka function (Desktop aur Mobile dono ke liye)
function generateMenuItems(isMobile = false) {
    let htmlOutput = "";
    
    menuItems.forEach(item => {
        if (isMobile) {
            // Mobile Menu Links Layout
            htmlOutput += `<a href="${item.url}" class="block py-2 px-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition">${item.name}</a>`;
        } else {
            // Desktop Menu Links Layout
            htmlOutput += `<a href="${item.url}" class="hover:text-indigo-400 transition">${item.name}</a>`;
        }
    });
    
    return htmlOutput;
}

// 3. Generate and Inject Header and Footer Layout automatically
function injectLayouts() {
    const headerContainer = document.getElementById('header-loader');
    const footerContainer = document.getElementById('footer-loader');

    if (headerContainer) {
        headerContainer.innerHTML = `
        <header class="navbar-custom border-b sticky top-0 z-50 transition-colors duration-300">
            <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl tracking-wider text-white shadow-lg shadow-indigo-500/30">AL</div>
                    <span class="text-xl font-bold tracking-tight .nav-link">Azeem <span class="text-indigo-400">Labs</span></span>
                </div>
                
                <!-- Center: Desktop Links (AUTOMATICALLY GENERATED) -->
                <nav class="hidden md:flex space-x-8 text-sm font-medium .nav-link">
                    ${generateMenuItems(false)}
                </nav>

                <!-- Right: Theme Switcher & Mobile Menu Trigger -->
                <div class="flex items-center space-x-4">
                    <button id="theme-toggle-btn" class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 focus:outline-none text-slate-300 transition">
                        <i id="theme-icon" class="fas fa-moon"></i>
                    </button>
                    <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none text-xl">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Dropdown Menu (AUTOMATICALLY GENERATED) -->
            <div id="mobile-menu-dropdown" class="hidden md:hidden border-t border-slate-800 px-4 pt-2 pb-4 space-y-2 bg-slate-900 shadow-xl transition-all duration-300">
                ${generateMenuItems(true)}
            </div>
        </header>
        `;
    }

  // js/main.js ke andar 'injectLayouts' function me footer wale hisse ko isse replace karein:

if (footerContainer) {
    // 1. Footer ke links ki list (Yahan se aap links control kar sakte hain)
    const footerLinks = [
        { name: "Home", url: "index.html" },
        { name: "About Us", url: "#portfolio" },
        { name: "Privacy Policy", url: "#" },
        { name: "Terms of Service", url: "#" }
    ];

    // 2. Links ka HTML generate karne ka loop
    let footerLinksHTML = "";
    footerLinks.forEach(link => {
        footerLinksHTML += `<a href="${link.url}" class="nav-link text-xs hover:text-indigo-400 transition mx-3 my-1">${link.name}</a>`;
    });

    // 3. Premium Footer Design Injection
    footerContainer.innerHTML = `
    <footer class="bg-slate-950 border-t border-slate-900 py-12 text-center text-sm text-slate-500 transition-colors duration-300">
        <div class="max-w-6xl mx-auto px-4">
            
            <!-- Top Section: Brand Name & Small Tagline -->
            <div class="mb-6">
                <span class="text-lg font-bold tracking-tight text-white">Azeem <span class="text-indigo-400">Labs</span></span>
                <p class="text-xs text-slate-400 mt-1">Building smart utilities and modern web structures.</p>
            </div>

            <!-- Middle Section: Dynamic Navigation Links (Jo humne upar banaye) -->
            <div class="flex flex-wrap justify-center mb-6">
                ${footerLinksHTML}
            </div>

            <!-- Border Line separating links from copyright -->
            <div class="w-16 h-[1px] bg-slate-800 mx-auto mb-6"></div>

            <!-- Bottom Section: Copyright Notice -->
            <p class="text-xs text-slate-500">&copy; 2026 Azeem Labs. All rights reserved.</p>
        </div>
    </footer>
    `;
}
}

// 4. Setup Responsive Mobile Hamburger Toggle and Light/Dark Theme Storage Engine
function setupInteractiveFeatures() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Toggle Mobile Menu Open/Close
    if (mobileMenuBtn && mobileMenuDropdown) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuDropdown.classList.toggle('hidden');
        });
    }

   // js/main.js ke andar is condition ko check karlein ya replace mardein:
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    if (mobileMenuDropdown) {
        mobileMenuDropdown.style.backgroundColor = "#ffffff";
        mobileMenuDropdown.style.borderColor = "#e2e8f0";
    }
}

    // Light / Dark Toggler Click Event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
                if (mobileMenuDropdown) mobileMenuDropdown.classList.replace('bg-slate-900', 'bg-white');
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
                if (mobileMenuDropdown) mobileMenuDropdown.classList.replace('bg-white', 'bg-slate-900');
            }
        });
    }
}

// 5. Load dynamic blogs content from target directory
async function loadBlogs() {
    const container = document.getElementById('blogs-container');
    if (!container) return; 

    try {
        const response = await fetch('blogs/blogs_list.json');
        const blogFiles = await response.json();
        container.innerHTML = '';

        for (const filename of blogFiles) {
            try {
                const res = await fetch(`blogs/${filename}.json`);
                const blog = await res.json();
                
                const card = document.createElement('div');
                card.className = 'bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg blog-card-custom';
                card.innerHTML = `
                    <div class="h-48 bg-slate-700 flex items-center justify-center text-slate-500 relative">
                        <i class="fas fa-image text-4xl"></i>
                        <span class="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded">${blog.date}</span>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-3 text-white">${blog.title}</h3>
                        <p class="text-slate-400 text-sm mb-4 line-clamp-3 dynamic-text">${blog.content}</p>
                        <a href="#" class="text-indigo-400 hover:text-indigo-300 font-medium text-sm inline-flex items-center space-x-1">
                            <span>Read Full Post</span> <i class="fas fa-arrow-right text-xs"></i>
                        </a>
                    </div>
                `;
                container.appendChild(card);
            } catch (err) {
                console.error(`Error loading single blog (${filename}):`, err);
            }
        }
    } catch (error) {
        console.error("Error loading blogs list:", error);
        container.innerHTML = '<p class="text-red-400">Failed to load blogs.</p>';
    }
}

// 6. Load dynamic version release content logs
async function loadUpdates() {
    const container = document.getElementById('updates-container');
    if (!container) return;

    try {
        const response = await fetch('updates/updates_list.json');
        const updateFiles = await response.json();
        container.innerHTML = '';

        for (const filename of updateFiles) {
            try {
                const res = await fetch(`updates/${filename}.json`);
                const log = await res.json();
                
                const logBox = document.createElement('div');
                logBox.className = 'bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl shadow-md social-card';
                
                let featuresList = '';
                log.changes.forEach(change => {
                    featuresList += `<li class="flex items-start space-x-2 text-sm"><span class="text-purple-400 font-bold mr-1">•</span> <span class="dynamic-text">${change}</span></li>`;
                });

                logBox.innerHTML = `
                    <div class="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-2">
                        <div class="flex items-center space-x-3">
                            <span class="bg-purple-500/10 text-purple-400 text-xs font-bold px-2.5 py-1 rounded-md border border-purple-500/20">${log.version}</span>
                            <h4 class="font-bold text-base card-title">${log.appName}</h4>
                        </div>
                        <span class="text-xs text-slate-400">${log.date}</span>
                    </div>
                    <ul class="space-y-2">
                        ${featuresList}
                    </ul>
                `;
                container.appendChild(logBox);
            } catch (err) {
                console.error(`Error loading single update (${filename}):`, err);
            }
        }
    } catch (error) {
        console.error("Error loading updates list:", error);
        container.innerHTML = '<p class="text-red-400">Failed to load updates.</p>';
    }
}

// Global Initialization runtime execution trigger
window.addEventListener('DOMContentLoaded', () => {
    // Pehle layout aur links load honge bina ruke
    injectLayouts();
    setupInteractiveFeatures();
    
    // Baad me background me content load hoga
    loadBlogs();
    loadUpdates();
});