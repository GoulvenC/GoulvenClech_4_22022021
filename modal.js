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
    this.hideErrors(this.data);

    // isValid'll be true if all element validations return true
    
    const elements = [];
    this.data.forEach(object => {
      let el;
      // create an element instance based on the type of object
      switch (object.type) {
        case 'text': 
          el = new elementText(object);
          break
        case 'email':
          el = new elementEmail(object);
          break
        case 'date':
          el = new elementDate(object);
          break
        case 'number':
          el = new elementNumber(object);
          break
        case 'radio':
          el = new elementRadio(object);
          break
        case 'checkbox':
          el = new elementCheckbox(object);
          break
        default :
          el = new element(object);
          break
      }
      elements.push(el);
    });
  
    let isValid = elements.every((element) => {
      return element.isValid()
    });
    
    // If the form isValid, then send confirmation
    if(isValid){
      window.alert("Votre demande a bien été recue.");
      location.reload();
    }
  });
  // hide all form's erros
  this.hideErrors = function(data) {
    data.forEach((object) => {
      object.parentNode.setAttribute('data-error-visible', 'false');
    });
  };
}; 

class element {
  constructor(object) {
    this.object = object;
  };
  isValid() {
    console.log("Element" + this.object + " non reconnu.")
    console.log(this.object.type)
    return false;
  }
  // displayError on an invalid element
  displayError(errorMessage) {
    this.object.parentNode.setAttribute('data-error-visible', 'true');
    this.object.parentNode.setAttribute('data-error', errorMessage);
  };
};

class elementText extends element {
  isValid() {
    if(this.object.value.length>=2){
      return true;
    }else {
      this.displayError('Doit contenir plus de deux caractères.');
      return false;
    }
  }
}

class elementEmail extends element {
  isValid() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(this.object.value).toLowerCase())){
      return true;
    }else {
      this.displayError('Doit être une adresse email valide.');
      return false;
    };
  };
};

class elementDate extends element {
  isValid() {
    if (isNaN(this.object.value)) {
      return true;
    }else {
      this.displayError('La date n\'est pas valide.');
      return false;
    };
  };
};
  
class elementNumber extends element {
  isValid() {
    if(/^\d+$/.test(String(this.object.value))) {
      return true;
    }else{
      this.displayError('Doit être un nombre entier.');
      return false;
    }
  };
};

class elementRadio extends element {
  isValid() {
    // check if one of the siblings (radio buttons with the same name) is checked
    if(document.querySelectorAll('[name="' + this.object.name + '"]:checked').length > 0) {
      return true;
    }else {
      this.displayError('Vous devez selectionner une option.');
      return false;
    };
  };
};

class elementCheckbox extends element {
  isValid() {
    // Only check if checked if the chckbox is required
    if (this.object.required) {
      if (this.object.checked) {
        return true;
      }else {
        this.displayError('Vous devez accepter les conditions d\'utilisation.');
        return false;
      };
    }else{
      return true;
    };
  };
};

