import { useQuery } from '@tanstack/react-query';
import { DocumentNode } from 'graphql';
import { GraphQLClient, request } from 'graphql-request';
import graphqlRequestClient from '../graphQLRequestClient';

export const useGQLQuery = (
  key: any,
  query: DocumentNode,
  variables: any,
  config = {}
) => {
  const fetchData = async () =>
    await graphqlRequestClient.request(query, variables);

  return useQuery(key, fetchData, config);
};
