import { Film } from "@/config/interface";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import { Typography, Pagination, Container } from "@mui/material";
import { useAppSelector } from "../features/Hooks";

interface Props {
  filmList: Film[];
  header: string;
  number: number;
}

export default function FilmList({ filmList, header, number }: Props) {
  const [page, setPage] = useState<number>(1);
  const theme = useAppSelector((state) => state.theme);
  useEffect(() => {}, [page, filmList]);
  return (
    <div className="films-list">
      {filmList.length !== 0 ? (
        <>
          <Typography
            variant="h3"
            margin={3}
            style={{
              color: theme.logo,
            }}
          >
            {header}
          </Typography>
          <Container
            style={{
              maxWidth: "65rem",
            }}
          >
            <Grid container spacing={3}>
              {filmList
                .slice(0 + number * (page - 1), page * number)
                .map((film) => {
                  return (
                    <Grid xs={6} sm={6} md={4} key={film.id}>
                      <FilmCard film={film} />
                    </Grid>
                  );
                })}
            </Grid>
            <Pagination
              count={Math.floor(filmList.length / number) + 1}
              page={page}
              onChange={(event, page) => {
                setPage(page);
              }}
              style={{
                float: "right",
                marginTop: "1rem"
              }}
              shape="rounded"
              color="primary"
            />
          </Container>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
