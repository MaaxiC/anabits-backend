const form = document.getElementById('registerForm')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/register', { 
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(result => result.json())
    .then(data => data.status == 'success' ? window.location.replace('/login') : console.log(data))
})