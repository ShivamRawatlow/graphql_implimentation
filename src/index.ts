require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers/index';
import typeDefs from './graphql/typeDefs';

const port = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.MONGODB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    return server.listen({ port }).then((res) => {
      console.log(`Server running at port ${res.url}`);
    });
  });
