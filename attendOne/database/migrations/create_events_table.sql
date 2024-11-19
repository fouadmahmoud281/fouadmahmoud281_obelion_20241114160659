CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eventName VARCHAR(255) NOT NULL,
  eventType ENUM('conference', 'seminar', 'webinar') NOT NULL,
  eventDate DATE NOT NULL,
  attendees INT NOT NULL CHECK (attendees > 0)
);