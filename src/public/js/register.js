const form = document.getElementById('registerForm')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/api/sessions/register', { 
        method: 'POST',
        body: new FormData(form)
    })
    .then(result => result.json())
    .then(data => data.status == 'success' ? window.location.replace('/login') : console.log(data))
})