import { QueryClient } from "@tanstack/query-core";
import {
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import * as React from "react";
type Props = {};
const URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const QueryList = ():Object => {
  const queryClient = useQueryClient();
  const getStarwarsData = async () => {
    const q = gql`
      query Query {
        allFilms {
          films {
            title
            director
            releaseDate
            speciesConnection {
              species {
                name
                classification
                homeworld {
                  name
                }
              }
            }
          }
        }
      }
    `;
    const data = await request(URL, q);
    console.log(data);
    
    return data;
  };
  const query = useQuery<any>({ queryKey: ["starwars"], queryFn: getStarwarsData });
  React.useEffect(() => {
    getStarwarsData();
  }, []);
  return (
    <div>
      <div>{query.isLoading}</div>
      <div>{query.isFetching}</div>
      <div>{query.isRefetching}</div>
      {/* <div>{query.data.allFilms}</div> */}
    </div>
  );
};

export const QueryPage = (props: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <QueryList />
    </QueryClientProvider>
  );
};
