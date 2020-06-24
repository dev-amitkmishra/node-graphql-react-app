const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
  });

app.use('/graphql', 
    graphqlHttp({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
        formatError(err){
            if (!err.originalError) {
                return err;
            }
            const { data, code } = err.originalError;
            const { message } = err;
            return {
                message: message,
                code: code,
                data: data
            }
        }
}))

app.use((error, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

mongoose.connect('mongodb://localhost:27017/gql-node-react-db?retryWrites=true', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => {
        app.listen(9000)
    })
    .catch(err => {
        console.log('error in connection', err);
    })
