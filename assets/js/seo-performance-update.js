// SEO and Performance Update Helper
function updateHTMLFiles() {
    const files = document.querySelectorAll('*.html');
    files.forEach(file => {
        // Add preconnect and dns-prefetch
        addResourceHints(file);
        // Update image tags for lazy loading
        updateImageTags(file);
        // Add image optimization script
        addImageOptimization(file);
        // Add performance monitoring
        addPerformanceMonitoring(file);
    });
}

function addResourceHints(file) {
    const hints = `
  <!-- Performance Optimizations -->
  <link rel="preconnect" href="https://cdn.shopify.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://cdn.shopify.com">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">`;
    
    insertAfterMetaViewport(file, hints);
}


function updateImageTags(file) {
    const images = file.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            img.setAttribute('data-src', src);
            img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E');
            img.classList.add('lazy');
        }
    });

    const bgElements = file.querySelectorAll('[style*="background-image"]');
    bgElements.forEach(el => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match) {
            el.setAttribute('data-bg', match[1]);
            el.setAttribute('style', style.replace(match[0], ''));
        }
    });
}

function addImageOptimization(file) {
    const script = `
  <!-- Image Optimization -->
  <script src="assets/js/image-loader.min.js" defer></script>`;
    
    insertBeforeBodyEnd(file, script);
}

function addPerformanceMonitoring(file) {
    const script = `
  <!-- Performance Monitoring -->
  <script>
    window.addEventListener('load', function() {
      // Report Core Web Vitals
      if (window.performance && window.performance.getEntriesByType) {
        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1];
          console.log('LCP:', lcpEntry.startTime);
        }).observe({entryTypes: ['largest-contentful-paint']});

        // FID
        new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            console.log('FID:', entry.duration);
          });
        }).observe({entryTypes: ['first-input']});

        // CLS
        new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            console.log('CLS:', entry.value);
          });
        }).observe({entryTypes: ['layout-shift']});
      }
    });
  </script>`;
    
    insertBeforeBodyEnd(file, script);
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', updateHTMLFiles);
