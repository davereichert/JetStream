// login.js
$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:5091/api/auth/login', // Deine API-URL
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
            success: function(response) {
                localStorage.setItem('jwtToken', response.token);
                localStorage.setItem('benutzername', username);
                window.location.href = 'index.html';
            },
            
            error: function() {
                alert('Fehler beim Login');
            }
        });
    });
});

