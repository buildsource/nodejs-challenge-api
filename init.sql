DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS factory;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS factory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    price DECIMAL(10, 2),
    factoryId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (factoryId) REFERENCES factory(id)
);

INSERT INTO factory (name, description) VALUES ('Factory Name 1', 'Factory Description 1'), ('Factory Name 2', 'Factory Description 2');

INSERT INTO product (name, description, price, factoryId) VALUES 
    ('Product Name 1', 'Product Description 1', 99.99, 1),
    ('Product Name 2', 'Product Description 2', 89.99, 1),
    ('Product Name 3', 'Product Description 3', 79.99, 1),
    ('Product Name 4', 'Product Description 4', 119.99, 1),
    ('Product Name 5', 'Product Description 5', 109.99, 1),
    ('Product Name 6', 'Product Description 6', 129.99, 1),
    ('Product Name 7', 'Product Description 7', 139.99, 1),
    ('Product Name 8', 'Product Description 8', 149.99, 1),
    ('Product Name 9', 'Product Description 9', 159.99, 1),
    ('Product Name 10', 'Product Description 10', 169.99, 1),
    ('Product Name 11', 'Product Description 11', 179.99, 2),
    ('Product Name 12', 'Product Description 12', 189.99, 2),
    ('Product Name 13', 'Product Description 13', 199.99, 1),
    ('Product Name 14', 'Product Description 14', 219.99, 1);

INSERT INTO user (username, password, email) VALUES 
    ('User 1', 'senha_segura', 'user1@email.com');

-- Ajuste para desativar ONLY_FULL_GROUP_BY
SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
