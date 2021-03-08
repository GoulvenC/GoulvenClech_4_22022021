function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// One modal form called indexForm, with the data needed
let indexForm = new modalForm('.formData', '.btn-submit', '.bground', '.modal-btn');

// #####################
// modalForm constructor
// #####################
function modalForm (formData, formConfirmButton, formModal, modalOpenButtons) {
  // arguments passed to the form constructor
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

// ################
// Form constructor
// ################
function form (formData, formConfirmButton) {
  // Take the DOM elements needed
  this.data = [...document.querySelectorAll(formData + ' input')];
  this.confirmButton = document.querySelector(formConfirmButton);
  // Wait for confirm button and send form data for validation
  this.confirmButton.addEventListener('click', ($event) => {
    // prevent HTML event
    $event.preventDefault();

    // clean deprecated erros
    hideErrors(this.data);

    // isValid'll be true if all element validations return true
    let isValid = this.data.every((element) => {
      // Send data to the right element validation based on his type
      switch (element.type) {
        case 'text': 
          return elementText(element);
        case 'email':
          return elementEmail(element);
        case 'date':
          return elementDate(element);
        case 'number':
          return elementNumber(element);
        case 'radio':
          return elementRadio(element);
        case 'checkbox':
          return elementCheckbox(element);
        default:
          console.log(element.type + element.value + ' validé par défaut.');
          return true;
      };
    });
    
    // If the form isValid, then send confirmation
    if(isValid){
      window.alert("Votre demande a bien été recue.");
      location.reload();
    }
  });
}; 

// check if an element of type Text is valid
function elementText(element) {
  if(element.value.length>=2){
    return true;
  }else {
    displayError(element, 'Doit contenir plus de deux caractères.');
    return false;
  }
};

// check if an element of type Email is valid
function elementEmail(element) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(element.value).toLowerCase())){
    return true;
  }else {
    displayError(element, 'Doit être une adresse email valide.');
    return false;
  };
}

// check if an element of type Date is valid
function elementDate(element) {
  if (isNaN(element.value)) {
    return true;
  }else {
    displayError(element, 'La date n\'est pas valide.');
    return false;
  };
};

// check if an element of type Radio is valid
function elementNumber(element) {
  if(/^\d+$/.test(String(element.value))) {
    return true;
  }else{
    displayError(element, 'Doit être un nombre entier.');
    return false;
  }
}

// check if an element of type Radio is valid
function elementRadio(element) {
  // check if one of the siblings (radio buttons with the same name) is checked
  if(siblingsRadio = document.querySelectorAll('[name="' + element.name + '"]:checked').length > 0) {
    return true;
  }else {
    displayError(element, 'Vous devez selectionner une option.');
    return false;
  };
}

// check if an element of type checkbox is valid
function elementCheckbox(element) {
  // Only check if checked if the chckbox is required
  if (element.required) {
    if (element.checked) {
      return true;
    }else {
      displayError(element, 'Vous devez accepter les conditions d\'utilisation.');
      return false;
    };
  }else{
    return true;
  };
};

// displayError on an invalid element
function displayError(element, errorMessage) {
  element.parentNode.setAttribute('data-error-visible', 'true');
  element.parentNode.setAttribute('data-error', errorMessage);
};

// hide all form's erros
function hideErrors(data) {
  data.forEach((element) => {
    element.parentNode.setAttribute('data-error-visible', 'false');
  });
};
