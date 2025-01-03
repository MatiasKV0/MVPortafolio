document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector("form");
    const listaProyectos = document.querySelectorAll(".listaProyectos");

    formulario.addEventListener('DOMContentLoaded', seleccionarProyectos(""));
    formulario.addEventListener('change', seleccionarPeriodo);

    function seleccionarPeriodo(e){
        const año = e.target.value;
        seleccionarProyectos(año);
    }

    function seleccionarProyectos(año){
        fetch('./src/proyectos.JSON')
            .then(response => response.json())
            .then(data => {
                if(año===""){
                    data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                    mostrarProyectos(data);
                    return;
                }
                const proyectosFiltrados = data.filter(proyecto => año === "" || proyecto.año === año);
                // Sort projects by date from newest to oldest
                proyectosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                // Render filtered projects
                mostrarProyectos(proyectosFiltrados);
            });
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
