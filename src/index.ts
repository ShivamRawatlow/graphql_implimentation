require('dotenv').config();
import mongoose from 'mongoose';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers/index';

const port = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB!).then(async () => {
  startStandaloneServer(server, {
    context: async ({ req, res }) => ({ req, res }),
    listen: { port: parseInt(port || '3000') },
  })
    .then(({ url }) => {
      console.log(`Server running at port ${url}`);
    })
    .catch((error) => {
      console.log(error);
    });
});
