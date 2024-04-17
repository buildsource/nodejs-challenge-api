# NODEJS-CHALLENGE-API

## Introduction
This project is a REST API for managing products and factories. It's intended for use in inventory or e-commerce systems.

## Technologies Used
- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Jest para testes
- Docker

## Environment Setup
To set up the development environment, you'll need Node.js installed on your machine, along with Docker to manage database containers.

## Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/buildsource/nodejs-challenge-api.git
cd NODEJS-CHALLENGE-API
npm install
```

To start the database with Docker and execute database migrations:
```bash
docker-compose up -d
```

## Environment Configuration

Before running the application, you'll need to set up your environment variables.

1. Create a `.env` file in the project root.
2. Use the `.env.example` as a template.


## Usage
To start the server in development mode, use:
```bash
npm run start:dev
```

## Available Endpoints:

- GET /products/product-get-all: List all products.
- POST /products/product-create: Create a new product.
- DELETE /products/product-delete/:id: Remove an existing product.
- POST /factories/factory-create: Create a new factory.
- DELETE /factories/factory-delete/:id: Remove a factory.
- POST /auth/login: Perform login to obtain the token.


## Tests
Run all tests with:

```bash
npm test
```

For coverage tests, use:
```bash
npm run test:cov
```