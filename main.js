const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  
  if (nameInput.value === '' || emailInput.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    let li = document.createElement('li');
    const name = nameInput.value;
    const email = emailInput.value;
    const myObj = {
      name,
      email,
    };

    localStorage.setItem(myObj.email, JSON.stringify(myObj));
    // showUserOnScreen(myObj);

   
    nameInput.value = '';
    emailInput.value = '';

    axios
      .post(
        'https://crudcrud.com/api/28ed3624f6184a9cb93388e0e2cf2365/application10',
        myObj
      )
      .then((response) => {
        console.log(response.data);
        showUserOnScreen(myObj);
      })
      .catch((err) => {
        const error = document.getElementById('error');
        error.innerHTML="<h4>Something went wrong</h4>";
        console.log(err);

      });   

  }
}
document.addEventListener('DOMContentLoaded', () => {
  //make a get request to retrieve user data from crudcrud api
  axios
  .get('https://crudcrud.com/api/28ed3624f6184a9cb93388e0e2cf2365/application10')
  .then((response) => {
    for(let i=0; i<response.data.length; i++){
      showUserOnScreen(response.data[i]);
    }
  })
  .catch((err) => {
    const error = document.getElementById('error');
    error.innerHTML ='Error retrieving user data';
    console.log(err);
  });
});

  //  localStorage.setItem('userDetailsName', nameInput.value);
  //  localStorage.setItem('userEmail', emailInput.value);
  
function showUserOnScreen(myObj) {
  const li = document.createElement('li');
  li.textContent = `${myObj.name}: ${myObj.email}`;

  
 //create a delete button
 const deletebtn = document.createElement("input");
 deletebtn.type = "button";
 deletebtn.value = "Delete";
 deletebtn.classList = "deleteBtn";
  li.appendChild(deletebtn);


 deletebtn.onclick = ()=> {
  localStorage.removeItem(myObj.email);
  userList.removeChild(li);
 };

  
 // create an edit button
 const editBtn = document.createElement("input");
 editBtn.type = "button";
 editBtn.value = "Edit";
 editBtn.classList = "editBtn";


 editBtn.onclick = ()=> {
   localStorage.removeItem(myObj.email);
   nameInput.value = myObj.name;
   emailInput.value = myObj.email;
   userList.removeChild(li);
 };
 li.append(editBtn);
 userList.appendChild(li);
}