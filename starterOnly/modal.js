function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close"); //query pour séléctionner le x pour fermer le modal
const modalbg_confirm = document.querySelector(".bground_confirm"); //query pour séléctionner la modal pour confirmer que l'inscription à été prise en compte

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal confirm
function launchModalConfirm() {
  modalbg_confirm.style.display = "block";
}


// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal(modal = "") {

  // if parameter have parent element is element in DOM
  if(modal.parentElement)
  {
    modal.style.display = "none";
  }
  else
  {
    this.parentElement.parentElement.style.display = "none";
  }
  
  
}


// INPUT Elements required
const firstname = document.querySelector("#first");
const lastname = document.querySelector("#last");
const mail = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity_tournament = document.querySelector("#quantity");
const localisation = document.querySelectorAll("input[name='location']");
const cgu = document.querySelector("#checkbox1");

const errorMessages = {
	lastName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
	firstName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
	mail: "Veuillez entrer une adresse email valide.",
	birthdate: "Veuillez entrer une date de naissance valide et au format JJ/MM/AAAA.",
	quantity: "Veuillez entrer un nombre valide.",
	location: "Veuillez choisir une ville.",
	cgu: "Veuillez accepter les conditions d'utilisations.",
};

// function call when form is submit 
function validate()
{
  this.event.preventDefault();

  var error = 0;

  hide_errors();

  if(!check_name(firstname.value)){
    error++;
    show_error(firstname.parentElement, errorMessages.firstName);
  }

    
  if(!check_name(lastname.value)){
    error++;
    show_error(lastname.parentElement, errorMessages.lastName);
  }

    
  if(!check_mail(mail.value)){
    error++;
    show_error(mail.parentElement, errorMessages.mail);
  }


  if(!check_birthdate(birthdate.value)){
    error++;
    show_error(birthdate.parentElement, errorMessages.birthdate);
  }
    

  if(!check_number(quantity_tournament.value)){
    error++;
    show_error(quantity_tournament.parentElement, errorMessages.quantity);
  }


  if(!check_min_checkbox(localisation)){
    error++;
    show_error(localisation[0].parentElement, errorMessages.location);
  }


  if(!check_checkbox(cgu)){
    error++;
    show_error(cgu.parentElement, errorMessages.cgu);
  }

  // Si aucune erreur n'est trouvé le formulaire est envoyé
  if( error == 0)
  {
    closeModal(modalbg);
    launchModalConfirm(); 

    return true;
  }


  return false;
}

// function detect if firstname/name have at least 2 minimun caracter & not empty
function check_name(name)
{
  if( !name.isEmpty && name.length >= 2 )
    return true;

  return false;
}

// function detect if mail have good regex pattern and cancel wrong mail
function check_mail(mail)
{
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if( regex.test(mail) )
    return true;

  return false;
}

// function detect if mail have good regex pattern and cancel wrong mail
function check_birthdate(birthdate)
{
  var now = new Date().getTime();

  birthdate = birthdate.replaceAll("/","-");

  var date_EN = new Date(birthdate);

  var split_FR = birthdate.split("-");
  var date_FR = new Date(split_FR[2] +"-"+ split_FR[1] +"-"+ split_FR[0]);

  if (Object.prototype.toString.call(date_EN) === "[object Date]") {
    // it is a date
    if ( !isNaN(date_EN.getTime()) && now > date_EN.getTime()) {  // d.valueOf() could also work
      return true;
    } 
  }

  if (Object.prototype.toString.call(date_FR) === "[object Date]") {
    // it is a date
    if ( !isNaN(date_FR.getTime()) && now > date_FR.getTime()) {  // d.valueOf() could also work
      return true;
    } 
  }


  return false;
}

// function detect number superior or egal to 0
function check_number(number)
{
  var regex = /^[1-9][0-9]*$/;

  if( regex.test(number) || number === "0")
    return true;

  return false;
}

// function to detect if at least one checkbox is checked
function check_min_checkbox(n_checkbox)
{
  var ifchecked = false;

  n_checkbox.forEach((checkbox) => checkbox.checked ? ifchecked = true : 0 );

  return ifchecked;
}

// function detect if checkbox is checked
function check_checkbox(checkbox)
{
  if( checkbox.checked )
    return true;

  return false;
}

// function hide error below input
function hide_errors()
{
  var elementParent = document.querySelectorAll(".formData");
  elementParent.forEach((formdata) => formdata.setAttribute("data-error-visible", false) );
}

// function display/hide error below input
function show_error(parentElement, message_error = "")
{
  if(show_error)
  {
    parentElement.setAttribute("data-error-visible", true);
    parentElement.setAttribute("data-error", message_error);
  }
}