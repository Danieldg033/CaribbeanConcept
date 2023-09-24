import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// TODO: hacer una prueba con jsonplaceholder y luego pasar a la web de caribbean
// El entrypoint debe ser la url de la web de caribbean
const GRAPHQL_ENDPOINT =
  // process.env.GRAPHQL_ENDPOINT || "https://jsonplaceholder.ir/graphql";
  process.env.GRAPHQL_ENDPOINT || "https://wp.caribbeanconcept.net/graphql";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
  });
});
