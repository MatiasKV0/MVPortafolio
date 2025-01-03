
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector("form");
    const listaProyectos = document.querySelectorAll(".listaProyectos");
    const lenguaje = document.querySelector("#lenguaje");

    seleccionarProyectos("");

    lenguaje.addEventListener('click', (e) => {
        e.preventDefault();
        setTimeout(()=>{
            seleccionarProyectos("");
        },100)
    });
    formulario.addEventListener('change', seleccionarPeriodo);


    function seleccionarPeriodo(e){
        const año = e.target.value;
        seleccionarProyectos(año);
    }

    function seleccionarProyectos(año){
        let URL 
        if(lenguaje.textContent==="SP"){
            URL = './src/proyectosSP.JSON';
        }
        else{
            URL = './src/proyectos.JSON'
        }
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if(año===""){
                    filtrarDatos(data, lenguaje.textContent);
                    mostrarProyectos(data);
                    return;
                }
                const proyectosFiltrados = data.filter(proyecto => año === "" || proyecto.año === año);
                console.log(proyectosFiltrados)

                filtrarDatos(proyectosFiltrados, lenguaje.textContent)

                mostrarProyectos(proyectosFiltrados);
            });
    }

    function filtrarDatos(arreglo,lenguaje){
        if(lenguaje.textContent==='SP'){
            arreglo.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        else{
            arreglo.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        }
    }

    function mostrarProyectos(proyectos){

        listaProyectos.forEach(lista => limpiarHTML(lista));

        proyectos.forEach(proyecto => {
            const contenedorProyecto = document.createElement('LI');

            contenedorProyecto.innerHTML = `
            <li class="mb-10 ml-4 2024 proyecto">
              <div
                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border dark:bg-gray-700"
              ></div>
              <time class="mb-1 text-sm text-gray-400">${proyecto.fecha}</time>
              <h3 class="text-lg font-semibold">${proyecto.titulo}</h3>
              <p class="mb-4 text-gray-400">
                ${proyecto.descripcion}
              </p>
              <div class="flex flex-wrap gap-2 mt-2 mb-2">
                ${proyecto.tecnologias.map(tec => `<span class="px-2 py-1 text-sm text-gray-800 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-300">${tec}</span>`).join('')}
              </div>
              <a href="${proyecto.link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">→Learn more</a>
            </li>`;

            listaProyectos.forEach(lista => {
                lista.appendChild(contenedorProyecto.cloneNode(true));
            });
        });
    }

    function limpiarHTML(contenedor){
        while(contenedor.firstElementChild){
            contenedor.firstElementChild.remove();
        }
    }

    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
        header.style.transform = 'translateY(-100%)';
    } else {
        // User is scrolling up
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
    });
          
});
