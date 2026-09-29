let selectedCategory="all";
function renderMenu(){
const search=(document.getElementById("menu-search")?.value||"").toLowerCase();
const diet=document.getElementById("diet-filter")?.value||"all";
const list=menuItems.filter(x=>(selectedCategory==="all"||x.category===selectedCategory)&&(diet==="all"||x.dietary_tags.includes(diet))&&(x.name.toLowerCase().includes(search)||x.description.toLowerCase().includes(search)));
document.getElementById("menu-grid").innerHTML=list.length?list.map(x=>dishCard(x)).join(""):'<div class="empty-state">No dishes match your filters.</div>';
}
function setupMenu(){
const cats=["all",...new Set(menuItems.map(x=>x.category))];
document.getElementById("category-filters").innerHTML=cats.map(c=>`<button class="filter-btn ${c==="all"?"selected":""}" data-cat="${c}">${c==="all"?"All":c}</button>`).join("");
document.querySelectorAll(".filter-btn").forEach(b=>b.onclick=()=>{selectedCategory=b.dataset.cat;document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");renderMenu()});
document.getElementById("menu-search").oninput=renderMenu;document.getElementById("diet-filter").onchange=renderMenu;renderMenu();
}
document.addEventListener("DOMContentLoaded",setupMenu);