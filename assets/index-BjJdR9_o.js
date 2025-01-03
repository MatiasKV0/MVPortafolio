(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector("form"),s=document.querySelectorAll(".listaProyectos");a.addEventListener("DOMContentLoaded",c("")),a.addEventListener("change",d);function d(o){const t=o.target.value;c(t)}function c(o){fetch("./proyectos.JSON").then(t=>t.json()).then(t=>{if(o===""){t.sort((n,f)=>new Date(f.fecha)-new Date(n.fecha)),e(t);return}const i=t.filter(n=>o===""||n.año===o);i.sort((n,f)=>new Date(f.fecha)-new Date(n.fecha)),e(i)})}function e(o){s.forEach(t=>r(t)),o.forEach(t=>{const i=document.createElement("LI");i.innerHTML=`
            <li class="mb-10 ml-4 2024 proyecto">
              <div
                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border dark:bg-gray-700"
              ></div>
              <time class="mb-1 text-sm text-gray-400">${t.fecha}</time>
              <h3 class="text-lg font-semibold">${t.titulo}</h3>
              <p class="mb-4 text-gray-400">
                ${t.descripcion}
              </p>
              <div class="flex flex-wrap gap-2 mt-2 mb-2">
                ${t.tecnologias.map(n=>`<span class="px-2 py-1 text-sm text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300">${n}</span>`).join("")}
              </div>
              <a href="${t.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">→Learn more</a>
            </li>`,s.forEach(n=>{n.appendChild(i.cloneNode(!0))})})}function r(o){for(;o.firstElementChild;)o.firstElementChild.remove()}const l=document.querySelector("header");let u=window.scrollY;window.addEventListener("scroll",()=>{window.scrollY>u?l.style.transform="translateY(-100%)":l.style.transform="translateY(0)",u=window.scrollY})});
