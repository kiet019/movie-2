import { Film } from "@/config/interface";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import { Typography, Pagination } from "@mui/material";

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
    const getData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        const data: Film[] = await response.json();
        setFilms(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [type, title, page, number]);
  return (
    <div className="films-list">
      {films.length !== 0 && (type !== undefined || title !== undefined) ? (
        <>
          <Typography variant="h3" margin={3}>
            {header}
          </Typography>
          <Grid container spacing={2}>
            {films.map((film) => {
              return (
                <Grid xs={6} sm={6} md={4} key={film.id}>
                  <FilmCard film={film}/>
                </Grid>
              );
            })}
          </Grid>
          <Pagination
            count={Math.floor(films.length / number) + 1}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
            style={{
              float: "right",
            }}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
