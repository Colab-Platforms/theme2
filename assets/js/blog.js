type = "module"
import {
  db,
  collection,
  getDocs,
  query,
  orderBy
} from './assets/firebase/firebase.js';

const blogQuery = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
const snapshot = await getDocs(blogQuery);

let html = '';

snapshot.forEach(docSnap => {
  const blog = docSnap.data();
  const id = docSnap.id;

  html += `
    <div class="blog-card">
      <h2><a href="blog-details.html?id=${id}">${blog.title}</a></h2>
      <small>By ${blog.author} • ${new Date(blog.createdAt?.seconds * 1000).toLocaleDateString()}</small>
      <p>${blog.description.substring(0, 120)}...</p>
      <a href="blog-details.html?id=${id}">Read More →</a>
    </div>
  `;
});

const blogContainer = document.getElementById("blogContainer");

async function renderBlogs() {
  const blogRef = collection(db, "blogs");
  const q = query(blogRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    blogContainer.innerHTML = `<p style="color: white;">No blog posts found.</p>`;
    return;
  }

  let html = '';

  snapshot.forEach((doc) => {
    const blog = doc.data();
    html += `
      <div class="vs-blog">
        <div class="vs-blog__img">
          <a class="vs-blog__img_link" href="blog-details.html?id=${doc.id}">
            <img src="${blog.imageUrl}"  alt="${blog.title}" class="vs-blog__img_img" ">
          </a>
        </div>
        <div class="vs-blog__content">
          <div class="vs-blog__meta">
            <span class="vs-blog__meta_text vs-blog__meta_admin">Written by: 
              <a class="vs-blog__meta_link" href="#">${blog.author}</a>
            </span>
            <span class="vs-blog__meta_text">
              ${blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : ''}
            </span>
          </div>
          <h2 class="vs-blog__title">
            <a class="vs-blog__title_link" href="blog-details.html?id=${doc.id}">${blog.title}</a>
          </h2>
          <p class="vs-blog__desc">${blog.description}</p>
          <div class="vs-blog__footer">
            <a class="vs-blog__link" href="blog-details.html?id=${doc.id}">read more <i class="fa-solid fa-angles-right"></i></a>
            <div class="vs-blog__share">
              <span>Share</span>
              <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://youtube.com" target="_blank"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
      `;
  });

  blogContainer.innerHTML = html;
}

renderBlogs();

document.addEventListener('DOMContentLoaded', function () {
  const updateMetaTags = (blog) => {
    if (!blog) return;

    document.title = `${blog.title} - ColabEsports Blog`;
    document.querySelector('meta[name="description"]').content = blog.description;

    document.querySelector('meta[property="og:title"]').content = blog.title;
    document.querySelector('meta[property="og:description"]').content = blog.description;
    if (blog.imageUrl) {
      document.querySelector('meta[property="og:image"]').content = blog.imageUrl;
    }
    document.querySelector('meta[name="twitter:title"]').content = blog.title;
    document.querySelector('meta[name="twitter:description"]').content = blog.description;
    if (blog.imageUrl) {
      document.querySelector('meta[name="twitter:image"]').content = blog.imageUrl;
    }
    const articleSchema = document.querySelector('script[type="application/ld+json"]');
    if (articleSchema) {
      const schema = JSON.parse(articleSchema.textContent);
      schema.headline = blog.title;
      schema.description = blog.description;
      if (blog.imageUrl) {
        schema.image = blog.imageUrl;
      }
      if (blog.createdAt) {
        schema.datePublished = new Date(blog.createdAt.seconds * 1000).toISOString();
        schema.dateModified = new Date(blog.createdAt.seconds * 1000).toISOString();
      }
      articleSchema.textContent = JSON.stringify(schema);
    }
  };
  const originalShowBlogDetails = window.showBlogDetails;
  if (originalShowBlogDetails) {
    window.showBlogDetails = async function () {
      const result = await originalShowBlogDetails();
      if (result && result.blog) {
        updateMetaTags(result.blog);
      }
      return result;
    };
  }
});








!function (e) { "use strict"; var t = function (t, n, r) { function o(e) { if (i.body) return e(); setTimeout(function () { o(e) }) } function a() { d.addEventListener && d.removeEventListener("load", a), d.media = r || "all" } var l, i = e.document, d = i.createElement("link"); if (n) l = n; else { var s = (i.body || i.getElementsByTagName("head")[0]).childNodes; l = s[s.length - 1] } var u = i.styleSheets; d.rel = "stylesheet", d.href = t, d.media = "only x", o(function () { l.parentNode.insertBefore(d, n ? l : l.nextSibling) }); var f = function (e) { for (var t = d.href, n = u.length; n--;)if (u[n].href === t) return e(); setTimeout(function () { f(e) }) }; return d.addEventListener && d.addEventListener("load", a), d.onloadcssdefined = f, f(a), d }; "undefined" != typeof exports ? exports.loadCSS = t : e.loadCSS = t }("undefined" != typeof global ? global : this);



type = "module"
import {
  db,
  doc,
  getDoc
} from './assets/firebase/firebase.js';

function getBlogIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}
function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function showBlogDetails() {
  const id = getBlogIdFromUrl();
  const container = document.getElementById('blogDetailsContainer');
  if (!id) {
    container.innerHTML = "<p style='color:#fff'>No blog ID provided.</p>";
    return;
  }

  try {
    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      container.innerHTML = "<p style='color:#fff'>Blog not found.</p>";
      return;
    }

    const blog = blogSnap.data();
    const fullContent = blog.detailLink && blog.detailLink.trim() ? blog.detailLink : blog.description;

    const contentHtml = escapeHTML(fullContent).replace(/\n/g, "<br>");

    container.innerHTML = `
          <img src="${escapeHTML(blog.imageUrl)}" alt="${escapeHTML(blog.title)}" class="blog-details-image">
          <div class="blog-details-meta">
            <span>By ${escapeHTML(blog.author)}</span> &nbsp;|&nbsp;
            <span>${blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : ''}</span>
          </div>
          <h2 class="blog-details-title">${escapeHTML(blog.title)}</h2>
          <div class="blog-details-content">${contentHtml}</div>
          
          <!-- Related Content Section -->
          <div class="blog-related-content">
            <h3>Explore More Gaming Content</h3>
            <div class="related-links">
              <!-- Internal Links -->
              <div class="internal-links">
                <h4>More from ColabEsports</h4>
                <ul>
                  <li><a href="/tournaments.html">Browse Upcoming Tournaments</a></li>
                  <li><a href="/team.html">Meet Our Pro Teams</a></li>
                  <li><a href="/how-to-play.html">Gaming Guides & Tutorials</a></li>
                  <li><a href="/News.html">Latest Esports News</a></li>
                  <li><a href="/leaderboard.html">Top Players & Rankings</a></li>
                </ul>
              </div>
              <!-- External Links -->
              <div class="external-links">
                <h4>Additional Resources</h4>
                <ul>
                  <li><a href="https://blog.counter-strike.net/" target="_blank" rel="noopener">Official CS2 Blog</a></li>
                  <li><a href="https://playvalorant.com/en-us/news/" target="_blank" rel="noopener">Valorant Updates</a></li>
                  <li><a href="https://esports.battlegrounds.pubg.com/" target="_blank" rel="noopener">BGMI Esports Hub</a></li>
                  <li><a href="https://www.hltv.org/" target="_blank" rel="noopener">HLTV Tournament Coverage</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="blog-details-share">
            <span>Share:</span>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener"><i class="fab fa-x-twitter"></i></a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
          </div>
        `;
  } catch (err) {
    container.innerHTML = "<p style='color:#fff'>Error loading blog details.</p>";
    console.error(err);
  }
}

showBlogDetails();


src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"