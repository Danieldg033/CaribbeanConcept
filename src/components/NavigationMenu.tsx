import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

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

// Logo de Caribbean Concept por graphQL y Apollo 
const caribbeanConceptLogo = gql(`
    {
      mediaItem(id: "caribbean-concept-logo", idType: SLUG) {
        id
        title
        sourceUrl
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
      <nav className="bg-neutral-100 pt-9">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="flex flex-shrink-0 justify-center items-center">
                <Image className="h-12 w-auto" src="https://wp.caribbeanconcept.net/wp-content/uploads/2023/10/caribbean-concept-logo.png" alt="Caribbean Concept logo"  width={900}
                height={900}/>
              </div>
          <div className="relative flex h-24 items-center justify-between">
            <div className="flex flex-1 justify-center items-center justify-around mt-12 ">
          {
            MenuItems.map((menuItem) => (
              <div key={menuItem.id} className="flex space-x-4 justify-between">
                {/* TODO: Implementar los children */}
                <Link href={menuItem.path} className="text-black hover:bg-gray-200 hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                  {menuItem.title}
                </Link>
              </div>
            ))
          }
            </div>
          </div>
        </div>
      </nav>
    </>
  )

}