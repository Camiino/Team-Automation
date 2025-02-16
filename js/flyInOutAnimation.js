document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".animated-item");
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("flyIn");
                entry.target.classList.remove("flyOut");
            } else {
                entry.target.classList.add("flyOut");
                entry.target.classList.remove("flyIn");
            }
        });
    }, {
        threshold: 0.2 // Element muss zu 20% sichtbar sein, um die Klasse zu wechseln
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
});
