const swaggerDefinition = {
    info: {
      title: 'My Top 100 Movies API',
      version: '1.0.0',
      description: 'Documentation for My Top 100 Movie API',
    },
    host: 'localhost:7007',
    basePath: '/',
  };

  
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
  };
  
  export default options;