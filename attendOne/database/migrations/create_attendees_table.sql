CREATE TABLE attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    family_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    position VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(20),
    country VARCHAR(100),
    city VARCHAR(100),
    invitation_type VARCHAR(100)
);