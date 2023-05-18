import { Button, Card, Grid, Spacer, Text } from "@nextui-org/react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "../../node_modules/react-icons/ai";
import { MdOutlineFavorite } from "../../node_modules/react-icons/md";
import { MdHd } from "../../node_modules/react-icons/md";
interface Film {
  image: string;
  title: string;
  year: number;
  director: string;
  time: number;
  trailer: string;
  resolution: string;
  information: string;
  id: string;
  type: string;
}

interface RouterQuery {
  id: string;
}

export default function Details() {
  const router = useRouter();
  const [film, setFilm] = useState<Film>();
  const { id } = router.query as unknown as RouterQuery;
  useEffect(() => {
    const url = new URL(
      "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
    );
    router.query.id !== undefined ? url.searchParams.append("id", id) : null;
    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // mockapi returns only tasks that match `hello` string
        setFilm(tasks[0]);
      })
      .catch((error) => {
        // handle error
      });
  }, [id]);
  return (
    <Layout activeLink="">
      {film !== undefined ? (
        <Card variant="bordered">
          <iframe
            src={film.trailer}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Grid.Container gap={0.2} css={{ height: "3vw" }}>
            <Grid xs={4}>
              <button className="button-video">
                <AiOutlineUnorderedList />
                List
              </button>
            </Grid>
            <Grid xs={4}>
              <button className="button-video">
                <MdOutlineFavorite />
                Favor
              </button>
            </Grid>
            <Grid xs={4}>
              <button className="button-video">
                <MdHd />
                Resolution
              </button>
            </Grid>
          </Grid.Container>
          <div className="detail-main">
            <div className="detail-image">
              <img src={film.image} alt=""/>
            </div>
            <div>
              <Text size="2.5rem" css={{ marginBottom: "1rem" }} weight="bold">
                {film.title}
              </Text>
              <Text size="1.5rem">Year: {film.year}</Text>
              <Text size="1.5rem">Director: {film.director}</Text>
              <div className="details-information">
                <Text size="1.2rem">{film.information}</Text>
              </div>
            </div>
          </div>
        </Card>
      ) : null}
    </Layout>
  );
}
