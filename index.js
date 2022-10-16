const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const chalk = require('chalk');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const { connectDB } = require('./config/db');
const { clientError, serverError } = require('./controllers/error');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(chalk.blue(`server is running at http://localhost:${port}`));
    await connectDB();
});

// swagger setup starts
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'A REST Test API'
        },
        servers: [
            {
                url: `http://localhost:${port}`
            }
        ]
    },
    apis: ['./controllers/*.js']
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
// swagger setup ends

// setting middlewares
app.use(cors());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.use(clientError);
app.use(serverError);
