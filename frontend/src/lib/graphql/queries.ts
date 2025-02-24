import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { graphql } from "../../generated";
import { getAccessToken } from "../auth";

const { VITE_API_URL } = import.meta.env;

const httpLink = createHttpLink({ uri: `${VITE_API_URL}/graphql` });
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

// NEED AS JobDetail
const jobDetailFragment = graphql(`
  fragment JobDetail on Job {
    id
    date
    title
    company {
      id
      name
    }
    description
  }
`);

export const companyByIdQuery = graphql(`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`);

export const jobByIdQuery = graphql(`
  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
`);

export const jobsQuery = graphql(`
  query Jobs($limit: Int, $offset: Int) {
    jobs(limit: $limit, offset: $offset) {
      items {
        id
        date
        title
        company {
          id
          name
        }
      }
      totalCount
    }
  }
`);

export const createJobMutation = graphql(`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
`);
