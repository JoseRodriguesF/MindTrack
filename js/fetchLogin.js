document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('email', email);
                window.location.href = data.redirectUrl;
            } else {
                alert('Erro: ' + (data.message || 'Falha no login'));
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});