document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("preloader").classList.remove("active");
        setTimeout(() => {
            document.getElementById("preloader").style.display = "none"; // Entfernt den Ladebildschirm nach der Animation
            document.body.style.overflow = "auto"; // Ermöglicht Scrollen wieder

            // Starte Animationen erst nach dem Entfernen des Preloaders
            startAnimations();
        }, 1000); // Wartezeit für die Animation
    }, 2400); // 5 Sekunden Ladezeit
});

// Funktion zum Starten der Animationen nach dem Preloader
function startAnimations() {
    document.querySelectorAll(".initial-animated-item").forEach(item => {
        item.classList.add("loaded");
    });

    // Falls notwendig, Sichtbarkeitsprüfung für Scroll-Animationen erneut ausführen
    checkVisibility();
}

