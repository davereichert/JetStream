// services.js
document.addEventListener('DOMContentLoaded', function() {
    let serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            let chosenService = this.getAttribute('data-service');
            localStorage.setItem('chosenService', chosenService);
        });
    });
});
