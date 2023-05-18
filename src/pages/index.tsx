import Banner from "../components/banner";
import Filmshow from "../components/filmshow";
import Layout from "../components/layout";
interface banner {
  image: string;
}
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
