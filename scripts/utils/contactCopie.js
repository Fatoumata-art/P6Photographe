// gestion du modal form
//Open modal contact
const openM = document.querySelector('.contact_button');
openM.addEventListener('click', displayModal);
function displayModal() { // error Eslint because funtion calls in phptographer.html
  const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
  document.querySelector('.modal_close_button').focus();
}

//Close modal contact
const closeX = document.querySelector('.modal-backdrop');
closeX.addEventListener('click', closeModal);
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector('.modal_close_button').focus();
}

// function display msg error
const setError = (element, message) => {
  const formData =  element.parentElement;
  const errorDisplay = formData.querySelector('.msgError');
  errorDisplay.innerHTML  = message;
  formData.classList.add("danger")
 // formData.classList.remove("success")
}

    

 
  // control entre de prénom
fname.addEventListener("input", () => {
    const regexFname = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/;
    console.log(fname.value);
    if(!fname.value == ''){
      setError(fname, 'Veuillez renseigner le Prénom');
      return false;
  }
  else if(!regexFname.test(fname.value)){
    setError(fname, 'Veuillez entrer 2 caractères ou plus pour le champ du Prénom.')
    return false;
  }else{
      
      return true;
  }
  })

  
  // control entre du nom
  l_name.addEventListener("input", () => {
    const regexLast = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/;
    l_name.value = l_name.value.toUpperCase();
    if(!l_name.value == ''){
      setError(l_name, 'Veuillez renseigner le Nom');
      return false;
    }else if(!regexLast.test(l_name.value)){
        setError(l_name, 'Veuillez entrer 2 caractères ou plus pour le champ du Prénom.')
        return false;
    }else
     
      return true;
  })
  
  // control entre de email
  function validEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
  }
  email.addEventListener("input", () => {
    console.log(email.value);
    if(email.value == ''){
      setError(email, 'Veuillez renseigner votre email');
      return false;
    }
   else if (!validEmail(email.value) ){
      setError(email, 'Veuillez entrer une adresse e-mail valide.')
      return false;
    }else{
       
        return true;
    }
    })

      // control entre du message
    message.addEventListener("input", () => {
    if(message.value == ''){
      setError(message, 'Ecrivez votre message');
      return false;
    }
})
  
// validation form
const form = document.querySelector('form');
const validation = document.querySelector("#contact_button");
validation.addEventListener('click', function(e) {

  e.preventDefault();
   
  if (!fname.value ||
    !l_name.value ||
    !email.value ||
    !message.value
   
    ) {
     
      // const alertDiv = document.createElement('div');
      // alertDiv.classList.add('danger');
      // alertDiv.innerHTML = '<p>Veuillez remplir correctement le formulaire</p>';
      // form.parentNode.insertBefore(alertDiv, form.nextSibling);
    
  
    }else{
    // Build the alert message
   const alertMessage = `Prénom: ${fname.value}\nNom: ${l_name.value}\nEmail: ${email.value}\nMessage: ${message.value}`;
   // Show the alert message
    console.log(alertMessage);
    // Close the modal
    closeModal();
    form.reset();
  } 

})
          
// button contater moi
const buttonMouseover = document.querySelector(".contact_button");
buttonMouseover.addEventListener("mouseover", function(){
    buttonMouseover.style.backgroundColor="#D3573C";
    buttonMouseover.style.color="black";
});

const buttonMouseout = document.querySelector(".contact_button");
buttonMouseout.addEventListener("mouseout", function(){
    buttonMouseout.style.backgroundColor="#901C1C";
    buttonMouseout.style.color="white";
});

  // add an event listener for the escape key
  document.addEventListener('keydown', handleKeyPress);
  // KEYBOARD
  function handleKeyPress(event) {
    // check if the escape key was pressed
    if (event.keyCode === 27) {
      closeModal();
    }

  }