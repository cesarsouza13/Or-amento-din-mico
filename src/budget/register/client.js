let newclient = document.getElementById('new');
let esc = document.getElementById('close')
let modal = document.getElementById('modal')

newclient.addEventListener('click', () =>{

    modal.classList.toggle('animation');

})


esc.addEventListener('click', () =>{
   
    modal.classList.toggle('animation');

})


