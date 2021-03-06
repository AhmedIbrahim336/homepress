const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const express = require('express');
const typeDefs = require('./typeDefs');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const connectDB = require('./config/db');
// load env variables
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));

const server = new ApolloServer({ typeDefs, resolvers: { Mutation, Query } });
server.applyMiddleware({ app });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`.bgMagenta));
