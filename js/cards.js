document.querySelectorAll('.plus-cl').forEach(plusCl => {
    plusCl.addEventListener('click', function () {
        // Toggle 'active' Klasse für das geklickte .plus-cl Element
        this.classList.toggle('active');

        // Toggle 'active' Klasse für das übergeordnete .grid-3-item.card Element
        let card = this.closest('.grid-3-item.card'); 
        if (card) {
            card.classList.toggle('active');
        }
    });
});

document.querySelectorAll(".subcard").forEach(function (card) {
    card.addEventListener("click", function () {
        card.classList.toggle("is-flipped");
    });
});

document.querySelectorAll(".card-back").forEach(function (element) {
    if (element.scrollHeight > element.clientHeight) {
        element.classList.add("has-scrollbar"); // Klasse für zusätzliches Padding hinzufügen
    } else {
        element.classList.remove("has-scrollbar"); // Falls keine Scrollbar da ist, Klasse entfernen
    }
});
