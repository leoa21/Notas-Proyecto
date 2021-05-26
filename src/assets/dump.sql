CREATE TABLE IF NOT EXISTS songtable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT, 
    song_name TEXT
);

INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (1, 'Ejemplo Asunto', 'Ejemplo Mensaje');