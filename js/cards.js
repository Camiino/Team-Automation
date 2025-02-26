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
