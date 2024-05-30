// gestion du modal form

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


const form = document.querySelector('form');
const fname = document.getElementById('fname');
const l_name = document.getElementById('lname');
const email = document.getElementById('email');
const message = document.getElementById('contactMessage');
const alertDiv = document.createElement('div');
form.parentNode.insertBefore(alertDiv, form.nextSibling);
const dangerMessage = document.querySelector('.danger');

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
    10
     form.reset();  
     alertDiv.classList.remove('danger');
     alertDiv.innerHTML = '';  
}


function errorValidation(){
  alertDiv.classList.add('danger');
  alertDiv.innerHTML = '<p>Veuillez remplir correctement le formulaire</p>';
  return false;
}


// function display msg error
const setError = (element, message) => {
  const formData =  element.parentElement;
  const errorDisplay = formData.querySelector('.msgError');
  errorDisplay.innerHTML  = message;
  formData.classList.add("error");
 formData.classList.remove("success");
}
// function display msg error
const setSuccess = (element) => {
  const formData =  element.parentElement;
  const errorDisplay = formData.querySelector('.msgError');
  errorDisplay.innerHTML  = "";
  formData.classList.add("success");
 formData.classList.remove("error");
}

 const validateInputs = () => {

   // control entre de prénom
    const regexFname = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/;
    if(!fname.value){
      setError(fname, 'Veuillez renseigner le Prénom');
      return false;
    }
    else if(!regexFname.test(fname.value)){
        setError(fname, 'Veuillez entrer 2 caractères ou plus pour le champ du Prénom.')
        return false;
    }else{
        setSuccess(fname);
    }

     // control entre du nom
    const regexLast = /^[a-zA-Z]+(([- ])?[a-zA-Z])+$/;
    l_name.value = l_name.value.toUpperCase();
    if(!l_name.value){
        setError(l_name, 'Veuillez renseigner le Nom');
        return false;
    } else if(!regexLast.test(l_name.value)){
        setError(l_name, 'Veuillez entrer 2 caractères ou plus pour le champ du Prénom.');
        return false;
    } else{
        setSuccess(l_name)
    }

      // control entre de email
    if(!email.value){
      setError(email, 'Veuillez renseigner votre email');
      return false;
    } else if (!validEmail(email.value) ){
      setError(email, 'Veuillez entrer une adresse e-mail valide.');
      return false;
    } else{
        setSuccess(email);
    }

    if(!message.value){
      setError(message, 'Ecrivez votre message');
      return false;
    } else{
        setSuccess(message);
    }

    return true;
 }

  // control entre de email
  function validEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
  }
    

// validation form
const validation = document.querySelector("#contact_button");
validation.addEventListener('click', function(e) {

  e.preventDefault();
  if(validateInputs()){
    const alertMessage = `Prénom: ${fname.value}\nNom: ${l_name.value}\nEmail: ${email.value}\nMessage: ${message.value}`;
    console.log(alertMessage);
    closeModal();   
  } else{
      errorValidation();
      console.log("pas ok")
  }
})