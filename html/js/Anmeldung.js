document.addEventListener("DOMContentLoaded", function() {
    // Preisinformationen
    const servicePrices = {
        "Kleiner Service": 50,
        "Großer Service": 100,
        "Rennski-Service": 120,
        "Bindung montieren und einstellen": 15,
        "Fell zuschneiden": 70,
        "Heisswachsen": 40
    };

    function calculateAdjustedPrice(price, priority) {
        switch(priority) {
            case "express":
                return price + 20;  // Erhöhung um 10%
            case "tief":
                return price - 10;  // Reduzierung um 5%
            case "standard":
            default:
                return price;
        }
    }

    // Den ausgewählten Service aus localStorage holen
    const chosenService = localStorage.getItem('chosenService');
    
    // Den Service im Formular anzeigen
    if (chosenService) {
        document.getElementById('chosenService').value = chosenService;
    }

    // Das heutige Datum als Mindestwert für das Datumsfeld festlegen
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);

    // Überprüfen, ob das ausgewählte Datum ein Sonntag ist
    document.getElementById('date').addEventListener('change', function() {
        let selectedDate = new Date(this.value);
        if (selectedDate.getDay() === 0) { // 0 steht für Sonntag
            alert('Bitte wählen Sie ein Datum, das nicht auf einen Sonntag fällt.');
            this.value = ''; // Das Datumseingabefeld zurücksetzen
        }
    });

    // Funktion zum Überprüfen der E-Mail-Adresse
    function isValidEmail(email) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Funktion zum Überprüfen der Telefonnummer
    function isValidSwissPhone(phone) {
        let regex = /^(?:\+41|0041|0)(?:[1-9]{2})\d{7}$/; // Beispiel für die Überprüfung von Schweizer Vorwahlen
        return regex.test(phone);
    }

    // Funktion zum Berechnen und Anzeigen des Preises
    function calculateAndDisplayPrice() {
        const chosenServicePrice = servicePrices[chosenService];
        const priority = $('#priority').val();
        const adjustedPrice = calculateAdjustedPrice(chosenServicePrice, priority);
        $('#calculatedPrice').val(adjustedPrice + " CHF");
    }

    // Event-Listener für Prioritätsänderungen
    $('#priority').on('change', calculateAndDisplayPrice);

    // Daten an das Backend senden
    $('form').submit(function(event) {
        event.preventDefault(); // Verhindert das standardmäßige Absenden des Formulars
    
        let customerName = $('#customerName').val().trim();
        if (!customerName) {
            alert('Bitte geben Sie einen gültigen Namen ein.');
            return;
        }
    
        if (!isValidEmail($('#email').val())) {
            alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return;
        }
    
        if (!isValidSwissPhone($('#phone').val())) {
            alert('Bitte geben Sie eine gültige Schweizer Telefonnummer ein.');
            return;
        }
    
        let createDate = new Date($('#date').val());
        let pickupDate = new Date(createDate); // Eine Kopie des erstellten Datums
        let priority = $('#priority').val();
        let chosenService1 = chosenService;
    
        switch (priority) {
            case 'standard':
                pickupDate.setDate(pickupDate.getDate() + 7);
                break;
            case 'tief':
                pickupDate.setDate(pickupDate.getDate() + 12);
                break;
            case 'express':
                pickupDate.setDate(pickupDate.getDate() + 5);
                break;
        }
    
        let data = {
            id: 0,
            name: customerName,
            email: $('#email').val(),
            phone: $('#phone').val(),
            priority: priority,
            service: chosenService1,
            create_date: createDate.toISOString(),
            pickup_date: pickupDate.toISOString()
        };
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5091/ServiceAuftrag',
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            dataType: 'json',
            success: function(response) {
                alert('Auftrag Erfolgreich abgesendet und in bearbeitung!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Ein Fehler ist aufgetreten: ' + textStatus + ' (Statuscode: ' + jqXHR.status + ')');
            }
        });
    });
});
