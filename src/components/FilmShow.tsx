import { Film } from "@/config/interface";
import {
  Grid,
  Card,
  Col,
  Text,
  Loading,
  Spacer,
  Pagination,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  type: string;
  number: number;
  header: string;
  title: string;
}

export default function Filmshow({ type, number, header, title }: Props) {
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  useEffect(() => {
    const url = new URL(
      "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
    );
    type !== undefined ? url.searchParams.append("type", type) : null;
    title !== undefined ? url.searchParams.append("title", title) : null;
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", number.toString());
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
        setFilms(tasks);
      })
      .catch((error) => {
        // handle error
      });
  }, [type, title, page, number]);
  return (
    <div className="films-list">
      {films.length !== 0 && (type !== undefined || title !== undefined) ? (
        <>
          <Text h2 weight="bold" css={{ color: "bf5114" }}>
            {header}
          </Text>
          <Grid.Container gap={3}>
            {films.map((film) => {
              return (
                <Grid xs={12} sm={4} key={film.id}>
                  <Card
                    css={{ height: "24rem" }}
                    isPressable
                    isHoverable
                    onClick={() => {
                      router.push("/details?id=" + film.id);
                    }}
                  >
                    <Card.Header
                      css={{ position: "absolute", zIndex: 1, top: 5 }}
                    ></Card.Header>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={film.image}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        alt="Card example background"
                      />
                    </Card.Body>
                    <Card.Footer
                      isBlurred
                      css={{
                        position: "absolute",
                        bgBlur: "#ffffff66",
                        borderTop:
                          "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                        bottom: 0,
                        zIndex: 1,
                        height: "7rem",
                      }}
                    >
                      <Col>
                        <Text h3 color="black">
                          {film.title}
                        </Text>
                      </Col>
                    </Card.Footer>
                  </Card>
                </Grid>
              );
            })}
          </Grid.Container>
          <Pagination
            total={films.length / number + 1}
            page={page}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Loading size="md" />
          <Spacer />
        </div>
      )}
    </div>
  );
}
