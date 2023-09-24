import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';

export default function Home() {
  return (
  <>
    {/* <Header/> */}
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <div>
      <h1>Hello Caribbean</h1>
     </div>
    </main>
    </>
  )
}

/* Component Header */

  /* Variable with query Menu content */

// const GET_MENU = gql(`
//   query GetMenu {
//   menus {
//     nodes {
//       id
//       databaseId
//       name
//       menuItems {
//         edges {
//           node {
//             id
//             label
//             parentId
//           }
//         }
//       }
//     }
//   }
// }
// `);

// function Header() {

// /* Rendered part to show the menu */

//   const {data, loading, error} = useQuery(GET_MENU); //<-- Line of code that take the error

//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;

//   return data.menus.nodes.map(({id, name, menuItems}) => ( 

//   <pre key={id}>{ menuItems }</pre>
//     // <div key = {id}>
//     //   <ul>
//     //     {menuItems} 
//     //   </ul>
//     // </div>
//   ));
// }