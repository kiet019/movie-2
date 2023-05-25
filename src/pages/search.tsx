import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Film, RouterQuery } from "@/config/interface";
import FilmList from "../components/FilmList";

export default function Type() {
  const router = useRouter();
  const { type, title } = router.query as unknown as RouterQuery;
  const [ filmList, setFilmList] = useState<Film[]>([])
  useEffect(() => {
    const getData =async () => {
      const url1 = new URL(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
      );
      type !== undefined?  url1.searchParams.append("type", type) : null;
      title !== undefined? url1.searchParams.append("title", title) : null;
      const response1 = await fetch(url1, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const data: Film[] = await response1.json();
      setFilmList(data);
    }
    getData()
  }, [title]);
  return (
    <>
      {type !== undefined || title !== undefined ? (
        <Layout>
          <FilmList
            filmList={filmList}
            header={title === undefined ? type : "Search for " + title}
            number={12}
          />
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
}
