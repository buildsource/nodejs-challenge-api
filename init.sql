CREATE TABLE IF NOT EXISTS factory (
  id INT AUTO_INCREMENT,
  descripcion TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS product (
  id INT AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(10, 2),
  factoryId INT,
  PRIMARY KEY (id),
  FOREIGN KEY (factoryId) REFERENCES factory(id)
);
