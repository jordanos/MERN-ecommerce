exports.options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
        value: '<JWT>',
      },
    },
  },
};

exports.swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Rica Ecommerce API',
      description: 'Rica ecommerce API documentaion.',
      contact: {
        name: 'Jordan',
        email: 'jordanoswork2021@gmail.com',
      },
      servers: ['http://localhost:5000'],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};
