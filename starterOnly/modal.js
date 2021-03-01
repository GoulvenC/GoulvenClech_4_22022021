function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// One modal form called IndexForm, with the data needed
let IndexForm = new modalForm('.formData', '.btn-submit', '.bground', '.modal-btn');

// Modal Form constructor
function modalForm (formData, formConfirmButton, formModal, modalOpenButtons) {
  // argument for Form coonstructor
  this.form = form;
  this.form(formData, formConfirmButton);
  // Take the DOM elements needed
  this.modal = document.querySelector(formModal);
  this.openButtons = document.querySelectorAll(modalOpenButtons);
  this.closebutton = this.modal.querySelector('.close');
  // Listen to one or more buttons to make the modal appear
  this.openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        this.modal.style.display = "block";
    });

  });
  // Listen to close button to make the modal disappear
  this.closebutton.addEventListener('click', () => {
    this.modal.style.display = "none";
  });
}

// Form constructor
function form (formData, formConfirmButton) {
  // Take the DOM elements needed
  this.data = document.querySelectorAll(formData);
  this.confirmButton = document.querySelector(formConfirmButton);
  // Wait for confirm and send form data for validation
  this.confirmButton.addEventListener('click', () => {
    this.dataValidation(this.data);
  });
  // Confirm if the form data is valid
  this.dataValidation = function (data) {
    console.log(data);
  };
  // Display errors if needed
  this.dataError = function () {

  };
};

function element (type, data) {
  this.data;
  this.type;
  this.valid = false
  this.validation = () => {

  }
}

function elementText (type, id) {
  this.validation = () => {

  }
}