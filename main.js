// Put DOM elements into variables
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    let li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
   // Append to ul
    users.appendChild(li);

  //localStorage.setItem('userDetailsName', nameInput.value);
  //localStorage.setItem('userEmail', emailInput.value);
  let myObj = {
    name: nameInput.value,
    email: emailInput.value,
  };
  let UserDetails_serialize = JSON.stringify(myObj);
  localStorage.setItem(emailInput.value, UserDetails_serialize);

  // Clear fields
  nameInput.value = "";
  emailInput.value = "";
  }
}