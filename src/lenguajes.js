let seleccionado;

document.addEventListener('DOMContentLoaded',()=>{
    const lenguaje = document.querySelector("#lenguaje");
    seleccionado = lenguaje.textContent;
    lenguaje.addEventListener('click',()=>{
        if(lenguaje.textContent==="EN"){
            lenguaje.textContent = "SP";
            seleccionado = lenguaje.textContent;
            mostrarDatos();
        }
        else{
            lenguaje.textContent = "EN";
            seleccionado = lenguaje.textContent;
            mostrarDatos();
        }
    })

    function mostrarDatos(){
        const URL = './src/traducciones.JSON';

        fetch(URL)
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => obtenerDatos(datos))

        function obtenerDatos(datos){
            let i = 1;
            datos.forEach(dato => {
                const {EN, SP} = dato;
                if(seleccionado==="EN"){
                    const elemento = document.querySelector(`#data-${i}`);
                    elemento.textContent=EN;
                    i++
                }
                else{
                    const elemento = document.querySelector(`#data-${i}`);
                    elemento.textContent=SP;
                    i++
                }
            });
            i=1;
        }
    }

})