document.addEventListener("DOMContentLoaded", function() {
  // Event Delegation: Suche alle Tabs in den News‑Cards
  document.querySelectorAll('.lang-tabs .tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const selectedLang = this.getAttribute("data-lang");
      // Finde die umgebende News‑Card
      const card = this.closest('.news-card');
      
      // Entferne "active" aus allen Tabs in dieser Card
      card.querySelectorAll('.lang-tabs .tab').forEach(t => t.classList.remove('active'));
      // Setze den aktiven Tab
      this.classList.add('active');
      
      // In beiden Gruppen: Titel und Text
      // Verberge alle Überschrift-Elemente (lang-title) und zeige nur den für die ausgewählte Sprache
      card.querySelectorAll('.lang-title').forEach(titleEl => {
        titleEl.classList.remove('active');
        if (titleEl.classList.contains(selectedLang)) {
          titleEl.classList.add('active');
        }
      });
      
      // Verberge alle Text-Elemente (lang-text) und zeige nur den für die ausgewählte Sprache
      card.querySelectorAll('.lang-text').forEach(textEl => {
        textEl.classList.remove('active');
        if (textEl.classList.contains(selectedLang)) {
          textEl.classList.add('active');
        }
      });
    });
  });
});
