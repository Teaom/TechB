
const signupFormHandler = async (event) => {
    console.log("test signing up")
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && username && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);