document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Daten aus dem Formular sammeln
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        const telephone = document.getElementById("telephone").value;
        const role = document.getElementById("role").value;
        const creationDate = document.getElementById("creationDate").value;

        // Mitarbeiterobjekt erstellen
        const employee = {
            name: name,
            username: username,
            password: password,
            email: email,
            telephone: telephone,
            role: role,
            isActive: true, // oder false, je nach Geschäftslogik
            creationDate: creationDate,
            lastLogin: null // oder das aktuelle Datum, falls erforderlich
        };
        

        // An die API senden
        fetch('http://localhost:5091/mitarbeiter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify(employee)
        })
        .then(response => {
            if (!response.ok) {
                alert('Fehler beim Hinzufügen des Mitarbeiters. Status: ' + response.status);
            } else {
                alert('Mitarbeiter wurde erfolgreich hinzugefügt.');
                // Hier kannst du die Erfolgsmeldung verarbeiten oder weiterleiten
            }
        })
        .catch(error => console.error('Fehler:', error));
    });
});
