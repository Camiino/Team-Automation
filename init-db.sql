CREATE DATABASE IF NOT EXISTS newsdb;
USE newsdb;

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    date DATE NOT NULL
);

-- Add some sample data (optional)
INSERT INTO news (title, content, image_path, date) VALUES 
('First News Article', 'This is the content of the first news article.', '/assets/images/anlagen.webp', CURDATE()),
('Second News Article', 'This is the content of the second news article.', '/assets/images/karriere.webp', CURDATE());