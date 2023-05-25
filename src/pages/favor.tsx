import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { remove, save } from "../features/FavorList";
import { useEffect, useState } from "react";
import { Film } from "@/config/interface";
import Protected from "../components/Protected";
import { Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FilmCard from "../components/FilmCard";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopup from "../components/ConfirmPopup";
export default function Favor() {
  const [filmList, setFilmList] = useState<Film[]>();
  const favorFilmList = useAppSelector((state) => state.favorFilmList);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [agree, setAgree] = useState(false)
  const dispatch = useAppDispatch();
  const [deleteID, setDeleteID] = useState("")
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/films",
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setFilmList(data);
    };
    getData();
  }, [favorFilmList.filmList]);
  useEffect(() => {
    if (agree === true) {
      dispatch(remove(deleteID))
      setConfirmOpen(false)
    }
  }, [agree])
  return (
    <Layout>
      <Protected>
        <Typography variant="h3" margin={3}>
          Favorite Films
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(save(favorFilmList.id));
          }}
        >
          save
        </Button>
        <div className="show-favor-film">
          <Grid container spacing={3}>
            {filmList !== undefined ? (
              filmList
                .filter((film) => favorFilmList.filmList.includes(film.id))
                .map((film) => {
                  return (
                    <Grid xs={6} sm={6} md={4} key={film.id}>
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <FilmCard film={film} />
                        <IconButton
                          aria-label="delete"
                          style={{
                            position: "absolute",
                            right: "0",
                            bottom: "0",
                          }}
                          onClick={() => {
                            setConfirmOpen(true)
                            setDeleteID(film.id)
                          }}
                        >
                          <DeleteIcon
                            style={{
                              width: 30,
                              height: 30,
                            }}
                            color="error"
                          />
                        </IconButton>
                      </div>
                    </Grid>
                  );
                })
            ) : (
              <></>
            )}
          </Grid>
        </div>
        <ConfirmPopup confirmOpen={confirmOpen} message="Delete this Film ?" setConfirmOpen={setConfirmOpen} setAgree={setAgree}/>
      </Protected>
    </Layout>
  );
}
