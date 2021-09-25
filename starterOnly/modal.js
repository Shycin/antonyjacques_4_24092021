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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


// INPUT Elements required
const firstname = document.querySelector("#first");
const lastname = document.querySelector("#last");
const mail = document.querySelector("#email");
const quantity_tournament = document.querySelector("#quantity");
const localisation = document.querySelectorAll("input[name='location']");
const cgu = document.querySelector("#checkbox1");

// function call when form is submit 
function validate()
{
  var error = 0;

  if(!check_name(firstname.value))
    error++;

  if(!check_name(lastname.value))
    error++;

  if(!check_mail(mail.value))
    error++;

  if(!check_number(quantity_tournament.value))
    error++;

  if(!check_min_checkbox(localisation))
    error++;

  if(!check_checkbox(cgu))
    error++;

  // Si aucune erreur n'est trouvé le formulaire est envoyé
  if( error == 0)
    return true;

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

// function detect number superior or egal to 0
function check_number(number)
{
  var regex = /^[1-9][0-9]*$/;

  if( regex.test(number) || number == 0 )
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

function check_checkbox(checkbox)
{
  if( checkbox.checked )
    return true;

  return false;
}