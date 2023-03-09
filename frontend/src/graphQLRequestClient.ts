import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.REACT_APP_BaseUrl || '';
const token = localStorage.getItem('jwtToken');
const headers = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

const graphqlRequestClient = new GraphQLClient(endpoint, headers);
export default graphqlRequestClient;

