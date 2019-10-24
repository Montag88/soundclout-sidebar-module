DROP DATABASE IF EXISTS soundclout;

CREATE DATABASE soundclout;

USE soundclout;

CREATE TABLE username_info (
    username_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    followers INT,
    user_picture_url VARCHAR(250),
    user_location VARCHAR(100),
    pro_account VARCHAR(5)
);

CREATE TABLE song_info (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    username_id INT,
    times_played INT,
    reposts INT,
    comments INT,
    category VARCHAR(100),
    song_picture_url VARCHAR(250),
    CONSTRAINT 
    FOREIGN KEY fk_song (username_id)
        REFERENCES username_info (username_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE song_likes (
    songlike_id INT AUTO_INCREMENT PRIMARY KEY,
    song_id INT,
    username_id INT,
    CONSTRAINT
    FOREIGN KEY fk_like_username (username_id)
        REFERENCES username_info (username_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT
    FOREIGN KEY fk_like_song_info (song_id)
        REFERENCES song_info (song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


