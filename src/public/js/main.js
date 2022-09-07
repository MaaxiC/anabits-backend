logoutBtn.addEventListener('click', () => {
    fetch('/api/sessions/logout')
    .then(result => result.json())
    .then(data => data.error == 'error' ? console.log(data) : window.location.replace('/login'))
})