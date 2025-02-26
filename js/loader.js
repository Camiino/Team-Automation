document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("preloader").classList.remove("active");
        setTimeout(() => {
            document.getElementById("preloader").style.display = "none"; // Entfernt den Ladebildschirm nach der Animation
            document.body.style.overflow = "auto"; // Ermöglicht Scrollen wieder
        }, 1000); // Wartezeit für die Animation
    }, 5000); // 2 Sekunden Ladezeit
});
