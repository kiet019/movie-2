import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "../../node_modules/react-icons/ai";
import { MdOutlineFavorite } from "../../node_modules/react-icons/md";
import { MdHd } from "../../node_modules/react-icons/md";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { insert } from "../features/FavorList";
import { Film } from "@/config/interface";
import { Button, Grid, Card, Typography, CardMedia } from "@mui/material";
import { setOpen } from "../features/Alert";
interface RouterQuery {
  id: string;
}

export default function Details() {
  const router = useRouter();
  const [film, setFilm] = useState<Film>();
  const { id } = router.query as unknown as RouterQuery;
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.userStatus.status);
  useEffect(() => {
    const url = new URL(
      "https://64055d32eed195a99f80eece.mockapi.io/api/films/films"
    );
    router.query.id !== undefined ? url.searchParams.append("id", id) : null;
    const getData = async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const data: Film[] = await response.json();
      setFilm(data[0]);
    };
    getData();
  }, [id]);
  return (
    <Layout>
      {film !== undefined ? (
        <Card>
          <iframe
            src={film.trailer}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            width="100%"
          ></iframe>
          <Grid container gap={0}>
            <Grid item xs={4}>
              <Button className="button-video" variant="contained">
                <AiOutlineUnorderedList />
                List
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                className="button-video"
                onClick={() => {
                  if (userStatus === true) {
                    dispatch(insert(film.id));
                    dispatch(setOpen({ open: true, message: "Adding success", severity:"success"}))
                  } else {
                    dispatch(setOpen({ open: true, message: "You must login to use it", severity:"error"}))
                  }
                }}
              >
                <MdOutlineFavorite />
                Favor
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" className="button-video">
                <MdHd />
                Resolution
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={0} className="detail-main">
            <Grid item xs={0} md={4}>
              <CardMedia
                component="img"
                className="detail-image"
                image={film.image}
                alt="Live from space album cover"
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
              style={{
                paddingTop: "0.5rem",
              }}
            >
              <Typography
                style={{ marginBottom: "0.5rem", fontSize: "2.5rem" }}
              >
                {film.title}
              </Typography>
              <Typography
                style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}
              >
                Year: {film.year}
              </Typography>
              <Typography
                style={{ marginBottom: "0.5rem", fontSize: "1.5rem" }}
              >
                Director: {film.director}
              </Typography>
              <div className="details-information">
                <Typography
                  style={{ marginBottom: "1rem", fontSize: "1.2rem" }}
                >
                  {film.information}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>
      ) : null}
    </Layout>
  );
}
