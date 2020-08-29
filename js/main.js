

//EFECTO DEL NAVBAR
var navbar = document.querySelector("navbar");
window.addEventListener("scroll", function(){
    navbar.classList.toggle("sticky", window.scrollY >0)
})
window.addEventListener("scroll", function(){
    navbar.classList.toggle("display-none", window.scrollY >200)
})
const grid = new Muuri('.grid',{
    layout:{
        rounding: false
    }
});
//EFECTO DEL NAVBAR HAMBURGUESA
var btn= document.querySelector(".toggle");
var menu=document.querySelector(".menu");
function cambiar(){
    menu.classList.toggle("show"); 
}



window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    

    //Agregamos los listener de los enlaces para filtrar por categoria
   
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento)=>{
        elemento.addEventListener('click', (evento)=>{
            evento.preventDefault();
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);            

        });
    });

    //Agregamos los listener para la barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input' , (evento) => {
        const busqueda = evento.target.value;
        grid.filter ((item)=> item.getElement().dataset.etiquetas.includes(busqueda))
    })
    //Agregamos los listener para la barra de busqueda

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento)=>{
        elemento.addEventListener('click', ()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    });

    //Event listener para boton de cerrar

    document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=>{
        overlay.classList.remove('activo');
    });

    //Event listener del overlay

    overlay.addEventListener('click', (evento)=>{
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })

});

//ENVIAR Y VALIDAR FORM
var email = document.getElementById("email");
var evento = document.getElementById("evento");
var fecha = document.getElementById("fecha");
var hora = document.getElementById("hora");
var error = document.getElementById("error");


function enviarFormulario(){
    console.log("Enviando...")

    var mensajeError = [];

    if (email.value == 0 || email.value === ''){
        mensajeError.push("Ingresa un email válido")
    }
    
    if (evento.value == 0 || evento.value === ''){
        mensajeError.push("Selecciona un evento")
    }
    if (fecha.value === null || fecha.value === ''){
        mensajeError.push("Ingresa una fecha válida")
    }
    if (hora.value === null || hora.value === ''){
        mensajeError.push("Ingresa un horario válido")
    }

    console.log(mensajeError.length)

    if (mensajeError.length > 0){
        error.innerHTML = mensajeError.join('| ')
    }else{
        Swal.fire({
            title: '¡Consulta enviada!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          error.classList.toggle("borrar-error")
    }
    
    return 
    }   


