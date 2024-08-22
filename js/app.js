document.addEventListener('DOMContentLoaded', function () {

    const ActivarBtnEnviar = {
        email: '',
        asunto: '',
        mensaje: '',
    }

//variables-----------------------------------------------------
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#formulario')
const btnEnviar = document.querySelector('#formulario button[type="submit"]')
const btnReset = document.querySelector('#formulario button[type="reset"]')
const spinner = document.querySelector('#spinner')
const opcional = document.querySelector('#email-opcional')

//eventos-------------------------------------------
email.addEventListener('input', validar )
asunto.addEventListener('input', validar)
mensaje.addEventListener('input', validar)
btnReset.addEventListener('click', function (e){
    e.preventDefault();
    resetFormulario()
    
})
formulario.addEventListener('submit', enviarEmail);
opcional.addEventListener('input', validarOpcional)

//funciones---------------------------------------------------------


function validarOpcional (e){
    if (e.target.value.trim() === ''){
       
        validarBtnEnviar()
        
    }else{
        if(e.target.id === "email-opcional" && !validarEmail(e.target.value)) {
            mostrarAlerta('El Email no es valido', e.target.parentElement)
            ActivarBtnEnviar[e.target.name] = '';
            validarBtnEnviar()
            return;}
    }
        quitarAlerta(e.target.parentElement)

    

    
}




function enviarEmail (e) {
    e.preventDefault();
    spinner.classList.add('flex')
    spinner.classList.remove('hidden')

     setTimeout(() => {
    spinner.classList.remove('flex')
    spinner.classList.add('hidden')

        //resetar el formulario
    ActivarBtnEnviar.email='';
    ActivarBtnEnviar.asunto='';
    ActivarBtnEnviar.mensaje='';
    validarBtnEnviar()
    formulario.reset();

        const alertaExito = document.createElement('P')
        alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito)
        setTimeout(() =>{
            alertaExito.remove();
        }, 2500)

        
     }, 3000);
}


function validar (e){
    if (e.target.value.trim() === ''){
        mostrarAlerta(`EL Campor ${e.target.id} es obligatorio`, e.target.parentElement);
        ActivarBtnEnviar[e.target.name] = '';
        validarBtnEnviar()
        return;
    }
        quitarAlerta(e.target.parentElement)

    if(e.target.id === "email" && !validarEmail(e.target.value)) {
        mostrarAlerta('El Email no es valido', e.target.parentElement)
        ActivarBtnEnviar[e.target.name] = '';
        validarBtnEnviar()
        return;
    }
    
        
    
    //asigna valores
    ActivarBtnEnviar[e.target.name] = e.target.value.trim().toLowerCase()

    validarBtnEnviar()
}

function mostrarAlerta (mensaje, referencia) {
//Comprobar que ya tiene una alerta
quitarAlerta(referencia)

//Genera alerta en html
 
const error = document.createElement('P'); 
error.textContent = mensaje;
error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

//Añadir mensaje en el html
referencia.appendChild(error)
}
// quitar alerta
function quitarAlerta (referencia) {
   const quitar = referencia.querySelector('.bg-red-600')
   if(quitar){
    quitar.remove();
   }
}

function validarEmail (email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
const resultado = regex.test(email)
return resultado;
}

function validarBtnEnviar () {
    if(Object.values(ActivarBtnEnviar).includes('')){
        btnEnviar.classList.add('opacity-50');
        btnEnviar.disabled = true;
        return;
    }
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;
    
}

function resetFormulario (){
    //resetar el formulario
    ActivarBtnEnviar.email='';
    ActivarBtnEnviar.asunto='';
    ActivarBtnEnviar.mensaje='';
    validarBtnEnviar()
    formulario.reset();
}


})