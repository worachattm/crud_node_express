const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const router = express.Router();

const versions = ['v1', 'v2'];
const swaggerDocs = {};

versions.forEach(version => {
  router.get(`/api-docs/${version}`, (req, res) => {
    res.json(swaggerDocs[version]);
  });
});

versions.forEach(version => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: `API Documentation - ${version}`,
        version: '1.0.0',
        description:
            "Some Description"
      },
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header',
          },
        }
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        }
      },  
    },
    apis: [`./routes/${version}/*.js`], 
  };
  swaggerDocs[version] = swaggerJsDoc(swaggerOptions);
});

const customOptions = {
  explorer: true,
  swaggerOptions: {
    urls: versions.map(v => ({
      url: `/api-docs/${v}`,
      name: v,
    })),
  },
};

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, customOptions));



module.exports = router;