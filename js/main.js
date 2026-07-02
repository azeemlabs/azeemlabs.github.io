// Azeem Labs - Dynamic Content Fetcher Engine

async function loadBlogs() {
    try {
        const response = await fetch('blogs/blogs_list.json');
        const blogFiles = await response.json();
        const container = document.getElementById('blogs-container');
        container.innerHTML = '';

        for (const filename of blogFiles) {
            const res = await fetch(`blogs/${filename}.json`);
            const blog = await res.json();
            
            const card = document.createElement('div');
            card.className = 'bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg';
            card.innerHTML = `
                <div class="h-48 bg-slate-700 flex items-center justify-center text-slate-500 relative">
                    <i class="fas fa-image text-4xl"></i>
                    <span class="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded">${blog.date}</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3 text-white">${blog.title}</h3>
                    <p class="text-slate-400 text-sm mb-4 line-clamp-3">${blog.content}</p>
                    <a href="#" class="text-indigo-400 hover:text-indigo-300 font-medium text-sm inline-flex items-center space-x-1">
                        <span>Read Full Post</span> <i class="fas fa-arrow-right text-xs"></i>
                    </a>
                </div>
            `;
            container.appendChild(card);
        }
    } catch (error) {
        console.error("Error loading blogs:", error);
        document.getElementById('blogs-container').innerHTML = '<p class="text-red-400">Failed to load blogs.</p>';
    }
}

async function loadUpdates() {
    try {
        const response = await fetch('updates/updates_list.json');
        const updateFiles = await response.json();
        const container = document.getElementById('updates-container');
        container.innerHTML = '';

        for (const filename of updateFiles) {
            const res = await fetch(`updates/${filename}.json`);
            const log = await res.json();
            
            const logBox = document.createElement('div');
            logBox.className = 'bg-slate-800/80 border border-slate-700/60 p-6 rounded-xl shadow-md';
            
            let featuresList = '';
            log.changes.forEach(change => {
                featuresList += `<li class="flex items-start space-x-2 text-slate-300 text-sm"><span class="text-purple-400 font-bold mr-1">•</span> <span>${change}</span></li>`;
            });

            logBox.innerHTML = `
                <div class="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-2">
                    <div class="flex items-center space-x-3">
                        <span class="bg-purple-500/10 text-purple-400 text-xs font-bold px-2.5 py-1 rounded-md border border-purple-500/20">${log.version}</span>
                        <h4 class="font-bold text-white text-base">${log.appName}</h4>
                    </div>
                    <span class="text-xs text-slate-400">${log.date}</span>
                </div>
                <ul class="space-y-2">
                    ${featuresList}
                </ul>
            `;
            container.appendChild(logBox);
        }
    } catch (error) {
        console.error("Error loading updates:", error);
        document.getElementById('updates-container').innerHTML = '<p class="text-red-400">Failed to load updates.</p>';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
    loadUpdates();
});