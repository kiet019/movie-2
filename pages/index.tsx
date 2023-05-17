import { useEffect, useState } from "react";
import Filmshow from "../components/filmshow";
import Layout from "../components/layout";

interface Props {
  banners: banner[];
}

interface banner {
  image: string;
}

export default function Home({ banners }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [banners.length]);

  return (
    <Layout activeLink="">
      <div className="banner">
        <img src={banners[index].image} className="banner-image" alt="Banner" />
      </div>
      <Filmshow type="movie" number={3} header="Movies" title="" />
      <Filmshow type="series" number={3} header="Series" title="" />
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://64048c453bdc59fa8f3b5897.mockapi.io/api/films/banner");
  const bannersData: banner[] = await response.json();

  return {
    props: {
      banners: bannersData,
    },
  };
}
