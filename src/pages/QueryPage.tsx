import { QueryClient } from "@tanstack/query-core";
import {
  QueryClientProvider,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
type Props = {};
type Film = {
  title: string,
  director: string,
  releaseDate: string,
  speciesConnection: {
    species: {
      name: string,
      classification: string,
      homeworld: {
        name: string,
      }
    }
  }
};
const URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";
const QueryList = () => {
  const queryClient = useQueryClient();
  const [queryString, setQueryString] = useState("");
  const DEFAULT_QUERY = `query Query {
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
  }`
  const getGraphQLData = async (): Promise<Array<Film>> => {
    const q = gql`
      ${queryString}
    `;
    const data: { allFilms: { films: Array<Film> } } = await request(URL, q);
    console.log(data?.allFilms);

    return data?.allFilms?.films;
  };
  const query = useQuery<Array<Film>, Error>(
    ["starwars"],
    getGraphQLData
  );
  useEffect(()=>{
    getGraphQLData();
  }, []);
  return (
    <div>
      <div>{query.isLoading ? "로딩중" : "로딩중 아님"}</div>
      <div>{query.isFetching ? "페칭중" : "페칭중 아님"}</div>
      <div>{query.isRefetching? "리페칭중" : "리페칭중 아님"}</div>
      <div className="grid grid-cols-12">
        <textarea className="col-span-6 border" defaultValue={DEFAULT_QUERY}/>
        <div className="col-span-6 border">{query.data?.map((film, index)=><div>{index + " " + film.title + " - " + film.director}</div>)}</div>
      </div>
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
