const form = document.getElementById('loginForm')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/login', { 
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(result => result.json())
    .then(data => data.status == 'success' ? window.location.replace('/') : console.log(data))
})
