import{a as c,S as f,i as s}from"./assets/vendor-BjRz3xa9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const g="32675885-ded1f22898004e0649ebaa6fc";c.defaults.baseURL="https://pixabay.com/api/";function p(o,e){return c.get(`?key=${g}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${e}`)}const u={galleryEl:document.querySelector(".gallery")};function m(o){const e=h(o);u.galleryEl.insertAdjacentHTML("beforeend",e),d.refresh()}function y(){u.galleryEl.innerHTML=""}function h(o){return o.map(e=>`
        <li class="gallery-item">
          <div class="image-container">
            <a class="gallery-link" href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}" /></a>
          </div>
          <div class="info-container">
            <ul class="img-desc">
              <li><strong>Likes:</strong> ${e.likes}</li>
              <li><strong>Views:</strong> ${e.views}</li>
              <li><strong>Comments:</strong> ${e.comments}</li>
              <li><strong>Downloads:</strong> ${e.downloads}</li>
            </ul>
          </div>
        </li>
      `).join("")}let d;d=new f(".gallery a",{captionsData:"alt",captionDelay:250});const i={formEl:document.querySelector(".form"),inputEl:document.querySelector(".input-value"),loadingEl:document.querySelector(".loading")};function E(){i.loadingEl.style.display="block"}function L(){i.loadingEl.style.display="none"}i.formEl.addEventListener("submit",o=>{o.preventDefault();const e=i.inputEl.value.trim();if(!e){s.error({title:"Error",message:"❌ Please enter a search term!",position:"topRight"});return}y(),E(),p(e,page).then(n=>{L(),n.data.hits.length===0&&i.inputEl.value!==""?s.error({title:"Error",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):m(n.data.hits)}).catch(n=>{i.loadingEl.style.display="none",s.error({title:"Error",message:"❌ Something went wrong!",position:"topRight"})})});
//# sourceMappingURL=index.js.map
