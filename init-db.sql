CREATE DATABASE IF NOT EXISTS newsdb;
USE newsdb;

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title_de VARCHAR(255) NOT NULL,
    content_de TEXT NOT NULL,

    title_en VARCHAR(255) NOT NULL,
    content_en TEXT NOT NULL,

    title_pl VARCHAR(255) NOT NULL,
    content_pl TEXT NOT NULL,

    title_ru VARCHAR(255) NOT NULL,
    content_ru TEXT NOT NULL,

    image_path VARCHAR(255),
    date DATE NOT NULL
);

INSERT INTO news (
    title_de, content_de,
    title_en, content_en,
    title_pl, content_pl,
    title_ru, content_ru,
    image_path, date
) VALUES 
(
    'Erster Artikel', 'Dies ist der Inhalt des ersten Artikels.',
    'First Article', 'This is the content of the first article.',
    'Pierwszy artykuł', 'To jest treść pierwszego artykułu.',
    'Первая статья', 'Это содержание первой статьи.',
    '/assets/images/anlagen.webp', CURDATE()
),
(
    'Zweiter Artikel', 'Dies ist der Inhalt des zweiten Artikels.',
    'Second Article', 'This is the content of the second article.',
    'Drugi artykuł', 'To jest treść drugiego artykułu.',
    'Вторая статья', 'Это содержание второй статьи.',
    '/assets/images/karriere.webp', CURDATE()
);
