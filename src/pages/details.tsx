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
  const theme = useAppSelector((state) => state.theme);
  return (
    <Layout>
      {film !== undefined ? (
        <Card
          style={{
            backgroundColor: theme.inside,
            border: "2px solid rgb(184, 4, 4)",
            borderRadius: "2rem",
          }}
        >
          <div
            style={{
              borderBottom: "2px solid rgb(184, 4, 4)",
            }}
          >
            <iframe
              src={film.trailer}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              width="100%"
            ></iframe>
            <Grid container gap={0}>
              <Grid item xs={4}>
                <Button className="button-video">
                  <AiOutlineUnorderedList />
                  List
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  className="button-video"
                  onClick={() => {
                    if (userStatus === true) {
                      dispatch(insert(film.id));
                      dispatch(
                        setOpen({
                          open: true,
                          message: "Adding success",
                          severity: "success",
                        })
                      );
                    } else {
                      dispatch(
                        setOpen({
                          open: true,
                          message: "You must login to use it",
                          severity: "error",
                        })
                      );
                    }
                  }}
                >
                  <MdOutlineFavorite />
                  Favor
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button className="button-video">
                  <MdHd />
                  Resolution
                </Button>
              </Grid>
            </Grid>
          </div>
          <Grid container spacing={0} className="detail-main">
            <Grid item xs={0} sm={4}>
              <CardMedia
                component="img"
                className="detail-image"
                image={film.image}
                alt="Live from space album cover"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  boxShadow: "0px 0px 5px white",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              style={{
                paddingTop: "0.5rem",
                paddingLeft: "1rem",
                color: theme.font,
              }}
            >
              <div>
                <Typography style={{ fontSize: "2rem" }}>
                  {film.title}
                </Typography>
                <Typography variant="subtitle1">Year: {film.year}</Typography>
                <Typography variant="subtitle1">
                  Director: {film.director}
                </Typography>
                <div className="details-information">
                  <Typography
                    align="justify"
                    sx={{
                      maxWidth: "540px",
                    }}
                    variant="body1"
                  >
                    {film.information}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      ) : null}
    </Layout>
  );
}
