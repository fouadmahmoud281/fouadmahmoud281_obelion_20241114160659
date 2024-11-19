CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventName VARCHAR(255) NOT NULL,
    eventType ENUM('conference', 'seminar', 'webinar') NOT NULL,
    eventDate DATE NOT NULL,
    attendees INT NOT NULL CHECK (attendees >= 1)
);

CREATE TABLE IF NOT EXISTS venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    capacity INT CHECK (capacity >= 0)
);

CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    serviceType VARCHAR(255) NOT NULL,
    contactInfo VARCHAR(255)
);

ALTER TABLE events ADD venue_id INT;
ALTER TABLE events ADD CONSTRAINT fk_venue FOREIGN KEY (venue_id) REFERENCES venues(id);

ALTER TABLE events ADD supplier_id INT;
ALTER TABLE events ADD CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id);

INSERT INTO events (eventName, eventType, eventDate, attendees, venue_id, supplier_id) VALUES
    ('Annual Conference', 'conference', '2024-05-20', 150, 1, 1);

INSERT INTO venues (name, location, capacity) VALUES
    ('Main Hall', 'Downtown', 200);

INSERT INTO suppliers (name, serviceType, contactInfo) VALUES
    ('Catering Co', 'Catering', 'contact@cateringco.com');