import { banner } from "@/config/interface";
import Banner from "../components/Banner";
import Filmshow from "../components/FilmShow";
import Layout from "../components/Layout";

interface Props {
  banners: banner[];
}
export default function Home({ banners }: Props) {
  return (
    <Layout activeLink="">
      <Banner banners={banners} />
      <Filmshow type="movie" number={3} header="Movies" title="" />
      <Filmshow type="series" number={3} header="Series" title="" />
    </Layout>
  );
}
export async function getServerSideProps() {
  const response = await fetch(
    "https://64048c453bdc59fa8f3b5897.mockapi.io/api/films/banner"
  );
  const bannersData: banner[] = await response.json();

  return {
    props: {
      banners: bannersData,
    },
  };
}
