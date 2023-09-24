import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../../components/Navigation'
import Users from '../../components/Users'
// import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';

/* Connection with backend */
// const client = new ApolloClient({
//   uri: 'https://wp.caribbeanconcept.net/graphql',
//   cache: new InMemoryCache()
// });

// client
//   .query({
//     query: gql`
//     query NewQuery {
//       pages(last: 10) {
//         edges {
//           node {
//             id
//             date
//             slug
//             title(format: RENDERED)
//           }
//         }
//       }
//     }
//     `,
//   })
//   .then((result) => console.log("TEST[GraphQL]: ", result.data.pages.edges));


/*Comunication between page.tsx and layaout.tsx*/

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CaribbeanConcept',
  description: 'Ondas del caribe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation></Navigation>
        {/* <Users></Users> */}
        {children}
      </body>
    </html>
  )
}
