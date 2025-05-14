# Node.js Express API Project

This project is a RESTful API built with Node.js and Express.js, featuring Swagger integration for API Documentation.

## Key Features

- RESTful API endpoints
- Swagger UI for API Documentation
- API Key Management with Middleware
- CORS Support
- Local Storage Management
- Docker Support

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the application:

```bash
npm start
```

## Docker Usage

1. Build Docker image:

```bash
docker build -t node-api .
```

2. Run Docker container:

```bash
docker run -p 3000:3000 node-api
```

## Project Structure

- `/bin` - Application startup files
- `/public` - Static files
- `/routes` - API routes
- `/views` - Template files
- `app.js` - Main application file
- `swagger.js` - Swagger configuration
- `apiKeyMiddleware.js` - API Key verification middleware
- `localStorage.js` - Local Storage management

## Main Dependencies

- express
- swagger-ui-express
- swagger-jsdoc
- cors
- cookie-parser
- morgan

## API Documentation

API Documentation is available at `/api-docs` after running the application

## License

Private
