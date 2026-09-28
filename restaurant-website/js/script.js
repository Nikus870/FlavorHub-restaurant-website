const money=n=>`₹${Number(n).toLocaleString("en-IN")}`;
function renderHeader(){
const el=document.getElementById("site-header"); if(!el)return;
const page=location.pathname.split("/").pop()||"index.html";
el.innerHTML=`<nav class="navbar"><div class="nav-container"><a class="logo" href="index.html"><span>🍽️</span> FlavorHub</a>
<button class="hamburger" id="hamburger">☰</button><ul class="nav-links" id="nav-links">
<li><a class="${page==="index.html"?"active":""}" href="index.html">Home</a></li>
<li><a class="${page==="menu.html"?"active":""}" href="menu.html">Menu</a></li>
<li><a class="${page==="reservations.html"?"active":""}" href="reservations.html">Reservations</a></li>
<li><a class="${page==="order.html"?"active":""}" href="order.html">Order Online</a></li>
<li><a class="${page==="about.html"?"active":""}" href="about.html">About</a></li>
<li><a class="${page==="gallery.html"?"active":""}" href="gallery.html">Gallery</a></li>
<li><a class="${page==="reviews.html"?"active":""}" href="reviews.html">Reviews</a></li>
<li><a class="${page==="contact.html"?"active":""}" href="contact.html">Contact</a></li>
<li><a class="login-link" href="login.html">Login</a></li></ul></div></nav>`;
document.getElementById("hamburger").onclick=()=>document.getElementById("nav-links").classList.toggle("open");
}
function renderFooter(){const el=document.getElementById("site-footer");if(!el)return;el.innerHTML=`<footer class="footer"><div class="footer-grid"><div><a class="logo" href="index.html">🍽️ FlavorHub</a><p>Fresh flavours. Warm moments.</p></div><div><h4>Explore</h4><a href="menu.html">Menu</a><a href="reservations.html">Reservations</a><a href="order.html">Order Online</a></div><div><h4>Contact</h4><p>MG Road, New Delhi</p><p>+91 98765 43210</p><p>hello@flavorhub.example</p></div><div><h4>Hours</h4><p>Mon–Thu: 11 AM–10 PM</p><p>Fri–Sat: 11 AM–11 PM</p><p>Sun: 12 PM–9 PM</p></div></div><div class="footer-bottom">© 2026 FlavorHub. Built for internship project WD-RES-001.</div></footer>`}
function dishCard(item,order=false){return `<article class="food-card"><div class="food-image">${item.image}</div><div class="food-body"><div class="food-top"><h3>${item.name}</h3><strong>${money(item.price)}</strong></div><p>${item.description}</p><div class="tags">${item.dietary_tags.map(t=>`<span>${t}</span>`).join("")}</div>${order?`<button class="btn btn-primary add-cart" data-id="${item.id}">Add to Cart</button>`:`<a class="text-link" href="order.html">Order this →</a>`}</div></article>`}
function stars(n){return "★".repeat(n)+"☆".repeat(5-n)}
function renderHome(){const f=document.getElementById("featured-menu");if(f)f.innerHTML=menuItems.slice(0,6).map(x=>dishCard(x)).join("");const r=document.getElementById("home-reviews");if(r)r.innerHTML=defaultReviews.map(x=>`<article class="review-card"><div class="stars">${stars(x.rating)}</div><p>"${x.comment}"</p><b>${x.customer_name}</b></article>`).join("")}
function renderAbout(){const t=document.getElementById("team-grid");if(t)t.innerHTML=chefs.map(x=>`<article class="team-card"><div class="avatar">${x.emoji}</div><h3>${x.name}</h3><p>${x.role}</p></article>`).join("")}
function renderGallery(){const g=document.getElementById("gallery-grid");if(g)g.innerHTML=galleryItems.map(x=>`<article class="gallery-item"><div>${x[1]}</div><span>${x[0]}</span></article>`).join("")}
document.addEventListener("DOMContentLoaded",()=>{renderHeader();renderFooter();renderHome();renderAbout();renderGallery();const cf=document.getElementById("contact-form");if(cf)cf.onsubmit=e=>{e.preventDefault();document.getElementById("contact-message").innerHTML='<div class="success">Thank you! Your message has been submitted.</div>';cf.reset()}})
