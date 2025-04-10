<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>Update News Test</title>
</head>
<body>
  <form action="updateNews.php" method="POST">
    <label>ID: <input type="text" name="id" value="1"></label><br>
    <label>Sprache (de, en, pl, ru): <input type="text" name="lang" value="de"></label><br>
    <label>Neuer Titel: <input type="text" name="title" value="Neuer Testtitel"></label><br>
    <label>Neuer Inhalt: <textarea name="content">Neuer Testinhalt</textarea></label><br>
    <button type="submit">Update Test</button>
  </form>
</body>
</html>
