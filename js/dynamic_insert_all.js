document.addEventListener("DOMContentLoaded", function() {
    // Event Delegation: Suche alle Tabs in den News-Cards
    document.querySelectorAll('.lang-tabs .tab').forEach(tab => {
      tab.addEventListener('click', function() {
        const selectedLang = this.getAttribute("data-lang");
        // Suche die umgebende News-Card
        const card = this.closest('.news-card');
        
        // Entferne "active" aus allen Tabs in dieser Card
        card.querySelectorAll('.lang-tabs .tab').forEach(t => t.classList.remove('active'));
        // Setze den aktiven Tab
        this.classList.add('active');
        
        // Verberge alle Sprach-Inhalte in der Card
        card.querySelectorAll('.lang-content').forEach(content => content.classList.remove('active'));
        // Zeige den Inhalt der ausgewählten Sprache
        const contentToShow = card.querySelector('.lang-content.' + selectedLang);
        if (contentToShow) {
          contentToShow.classList.add('active');
        }
      });
    });
  });
  