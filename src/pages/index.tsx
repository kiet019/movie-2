import { Film, banner } from "@/config/interface";
import Banner from "../components/Banner";
import Layout from "../components/Layout";
import FilmList from "../components/FilmList";
import { useEffect } from "react";
import Script from "next/script";

interface Props {
  banners: banner[];
  movies: Film[];
  series: Film[]
}
export default function Home({ banners, movies, series }: Props) {
  useEffect(() => {
    console.log(movies)
  }, [])
  
  return (
    
    <Layout>
      <Banner banners={banners} />
      <FilmList filmList={movies} number={3} header="Movies" />
      <FilmList filmList={series} number={3} header="Series" />
    </Layout>
  );
}
export async function getServerSideProps() {
  const response = await fetch(
    "https://64048c453bdc59fa8f3b5897.mockapi.io/api/films/banner"
  );
  const bannerList: banner[] = await response.json();
  const url1 = new URL(
    "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
  );
  url1.searchParams.append("type", "movies");
  const response1 = await fetch(url1, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const movieList: Film[] = await response1.json();
  const url2 = new URL(
    "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
  );
  url2.searchParams.append("type", "series");
  const response2 = await fetch(url2, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const seriesList: Film[] = await response2.json();
  return {
    props: {
      banners: bannerList,
      movies: movieList,
      series: seriesList
    },
  };
}
