import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Link from "next/link"

// Menu by Name, ver lib/client.ts alli esta la configuracion del endpoint de graphql
const query = gql(`
  query MENU_ITEMS {
    menuItems(where: {location: PRIMARY }) {
      nodes {
        key: id
        parentId
        title: label
        url
        path
      }
    }
  }
`);

// Esto es de typescript, si lo comentas funciona igual
// interface Response {
//   menu: { 
//     count: number; 
//     id: string; 
//     databaseId: string;
//     name: string;
//     slug: string;
//     menuItems: object
//   };
// }

// Funcion para obtener menus anidados de wordpress
// Referencia: https://www.wpgraphql.com/docs/menus
const flatListToHierarchical = (
  data = [],
  {idKey='key',parentKey='parentId',childrenKey='children'} = {}
) => {
  const tree = [];
  const childrenOf = {};
  data.forEach((item) => {
      const newItem = {...item};
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
      childrenOf[id] = childrenOf[id] || [];
      newItem[childrenKey] = childrenOf[id];
      parentId
          ? (
              childrenOf[parentId] = childrenOf[parentId] || []
          ).push(newItem)
          : tree.push(newItem);
  });
  return tree;
};

export default async function ServerSide() {
    const data = await getClient().query({
    query,
  });

  const MenuItems = flatListToHierarchical( data.data.menuItems.nodes );

  // Return del componente jsx con los valores del menu
  return(
    <>
      <h1>Menu</h1>
      <ul>
        {
          MenuItems.map((menuItem) => (
            <li key={menuItem.id}>
              {/* TODO: Implementar los children */}
              <Link href={menuItem.path}>
                {menuItem.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )

}