CREATE TABLE suppliers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    service_type VARCHAR(255),
    contact_info VARCHAR(255),
    rating DECIMAL(2, 1)
);
