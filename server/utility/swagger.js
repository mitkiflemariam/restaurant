const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../package.json");
const path = require('path');
// const logger = require("./logger"); // Uncomment if using a logger

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    path.join(__dirname, '../server.js'),
    path.join(__dirname, '../routers/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  try {
    // Swagger page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get("/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    console.log(`Docs available at http://localhost:${port}/docs`);
    // logger.info(`Docs available at http://localhost:${port}/docs`); // Use if logger is enabled
  } catch (error) {
    console.error('Error setting up Swagger:', error);
    // logger.error('Error setting up Swagger:', error); // Use if logger is enabled
  }
}

module.exports = swaggerDocs;