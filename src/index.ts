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
    useFindAndModify: false,
  })
  .then(async () => {
    console.log('MongoDB connected');
    const res = await server.listen({ port });
    console.log(`Server running at port ${res.url}`);
  });
