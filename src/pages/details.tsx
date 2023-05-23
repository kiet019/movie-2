import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "../../node_modules/react-icons/ai";
import { MdOutlineFavorite } from "../../node_modules/react-icons/md";
import { MdHd } from "../../node_modules/react-icons/md";
import { useAppDispatch } from "../features/Hooks";
import { insert } from "../features/FavorList";
import { GrStatusGood } from "../../node_modules/react-icons/gr";
import { Film } from "@/config/interface";
import Image from "next/image";
import {
  Button,
  Dialog,
  Grid,
  Card,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
interface RouterQuery {
  id: string;
}

export default function Details() {
  const router = useRouter();
  const [film, setFilm] = useState<Film>();
  const { id } = router.query as unknown as RouterQuery;
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
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
            <Grid xs={4}>
              <Button className="button-video" variant="contained">
                <AiOutlineUnorderedList />
                List
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="contained"
                className="button-video"
                onClick={() => {
                  setVisible(true);
                  dispatch(insert(film.id));
                }}
              >
                <MdOutlineFavorite />
                Favor
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button variant="contained" className="button-video">
                <MdHd />
                Resolution
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={0} className="detail-main">
            <Grid xs={0} md={4}>
              <CardMedia
                component="img"
                className="detail-image"
                image={film.image}
                alt="Live from space album cover"
              />
            </Grid>
            <Grid
              xs={12}
              md={8}
              style={{
                paddingTop: "0.5rem",
              }}
            >
              <Typography style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
                {film.title}
              </Typography>
              <Typography style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
                Year: {film.year}
              </Typography>
              <Typography style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
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
      <Dialog
        open={visible}
        onClose={closeHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="notification">
          <div>Adding success</div>
          <GrStatusGood />
        </div>
      </Dialog>
    </Layout>
  );
}
