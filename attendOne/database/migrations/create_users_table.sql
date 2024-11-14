CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    familyName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    googleId VARCHAR(255) UNIQUE
);