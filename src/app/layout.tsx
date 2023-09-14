import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

/* Conection with backend */
const client = new ApolloClient({
  uri: 'https://wp.caribbeanconcept.net/graphql',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
    query NewQuery {
      pages(last: 10) {
        edges {
          node {
            id
            date
            slug
            title(format: RENDERED)
          }
        }
      }
    }
    `,
  })
  .then((result) => console.log("tse: ", result.data.pages.edges.map()));

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

/*Comunication between page.tsx and layaout.tsx*/

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caribbean Concept',
  description: 'Ondas del caribe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
