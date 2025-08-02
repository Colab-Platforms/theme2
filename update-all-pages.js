const fs = require('fs');
const path = require('path');

// Get all HTML files
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (path.extname(file) === '.html') {
            results.push(filePath);
        }
    });
    
    return results;
}

// Update each HTML file
function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add resource hints
    const resourceHints = `
  <!-- Performance Optimizations -->
  <link rel="preconnect" href="https://cdn.shopify.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://cdn.shopify.com">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">`;
    
    content = content.replace('</head>', `${resourceHints}\n</head>`);
    
    // Add image optimization script
    const imageScript = `
  <!-- Image Optimization -->
  <script src="assets/js/image-loader.min.js" defer></script>`;
    
    content = content.replace('</body>', `${imageScript}\n</body>`);
    
    // Update image tags for lazy loading
    content = content.replace(/<img([^>]*)src="([^"]*)"([^>]*)>/g, 
        '<img$1data-src="$2"$3 src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\'/%3E" class="lazy">');
    
    // Update background images
    content = content.replace(/style="([^"]*?)background-image:\s*url\(['"]?([^'")\s]+)['"]?\)([^"]*?)"/g,
        'data-bg="$2" style="$1$3"');
    
    fs.writeFileSync(filePath, content);
}

// Main execution
const baseDir = process.cwd();
const htmlFiles = getHtmlFiles(baseDir);

htmlFiles.forEach(file => {
    console.log(`Updating ${file}...`);
    updateFile(file);
});

console.log('All files updated successfully!');
