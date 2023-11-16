$(document).ready(function() {
    if (localStorage.getItem('jwtToken')) {
        var benutzername = localStorage.getItem('benutzername'); // Benutzername aus dem Local Storage abrufen

        // Wenn ein Benutzername vorhanden ist, rufe die Benutzerrolle ab
        if (benutzername) {
            getBenutzerRolle(benutzername);
        }

        // Grundlegende Links hinzufügen
        $("#navbarNav").append(`
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="auftraege.html">Aufträge</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" id="logout">Logout</a>
                </li>
            </ul>
        `);

        $('.nav-item:contains("Login")').remove();
    }

    // Logout-Funktionalität
    $("#logout").on("click", function() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole'); // Benutzerrolle aus dem Local Storage entfernen
        localStorage.removeItem('benutzername'); // Benutzername aus dem Local Storage entfernen
        window.location.href = 'index.html';
    });

    function getBenutzerRolle(benutzername) {
        fetch(`http://localhost:5091/mitarbeiter/rolle/${benutzername}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            }
        })
        .then(response => response.text())
        .then(rolle => {
            console.log("Benutzerrolle:", rolle);
            localStorage.setItem('userRole', rolle);

            // Link zum Hinzufügen von Mitarbeitern nur für Admins hinzufügen
            if (rolle === 'Administrator') {
                $("#navbarNav ul").first().append(`
                    <li class="nav-item">
                        <a class="nav-link" href="mitarbeiter.html">Mitarbeiter hinzufügen</a>
                    </li>
                `);
            };
        })
        .catch(error => console.error('Fehler:', error));
    }
});
