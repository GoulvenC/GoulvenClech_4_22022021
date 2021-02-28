function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// One modal form called IndexForm, with the data needed
let IndexForm = new modalForm( '.formData', '.bground', '.modal-btn')

// Form constructor
function form (formData) {
  // Take the DOM elements needed
  this.data = document.querySelectorAll(formData);
}

// Modal Form constructor
function modalForm (formData, formModal, buttonsId) {
  // argument for Form coonstructor
  this.base = form;
  this.base(formData);
  // Take the DOM elements needed
  this.modal = document.querySelector(formModal);
  this.openButtons = document.querySelectorAll(buttonsId);
  this.closeButton = this.modal.querySelector('.close')
  // Listen to one or more buttons to make the modal appear
  this.openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        this.modal.style.display = "block";
    });
  });
  // Listen to close button to make the modal disappear
  this.closeButton.addEventListener('click', () => {
    this.modal.style.display = "none";
  });
}
// Modal Form inherit from Form
modalForm.prototype = new form
