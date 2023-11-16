function getAuftraege() {
    fetch('http://localhost:5091/serviceAuftrag', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
        }
    })
    .then(response => {
        if (!response.ok) {
            alert('Fehler beim Abrufen der Aufträge. Status: ' + response.status);
        }
        return response.json();
    })
    .then(auftraege => {
        const tabelle = document.getElementById('auftragsTabelle');
        auftraege.forEach(auftrag => {
            const zeile = document.createElement('tr');
            zeile.innerHTML = `
                <td>${auftrag.id}</td>
                <td>${auftrag.name}</td>
                <td>${auftrag.email}</td>
                <td>${auftrag.phone}</td>
                <td>${auftrag.priority}</td>
                <td>${auftrag.service}</td>
                <td>${auftrag.create_date}</td>
                <td>${auftrag.pickup_date}</td>
                <!-- Weitere Daten nach Bedarf -->
            `;
            tabelle.appendChild(zeile);
        });
    })
    .catch(error => console.error('Fehler:', error));
}

getAuftraege();
