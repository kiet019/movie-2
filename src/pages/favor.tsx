import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { remove, save } from "../features/FavorList";
import { useEffect, useState } from "react";
import { Film } from "@/config/interface";
import Protected from "../components/Protected";
import { Button, Typography } from "@mui/material";
import ConfirmPopup from "../components/ConfirmPopup";
import FilmList from "../components/FilmList";
export default function Favor() {
  const [filmList, setFilmList] = useState<Film[]>();
  const favorFilmList = useAppSelector((state) => state.favorFilmList);
  const dispatch = useAppDispatch();
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
  const theme = useAppSelector((state) => state.theme);
  return (
    <Layout>
      <Protected>
        <Typography
          variant="h3"
          margin={3}
          sx={{
            color: theme.font,
          }}
        >
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
          {filmList !== undefined ? (
            <FilmList
              filmList={filmList.filter((film) =>
                favorFilmList.filmList.includes(film.id)
              )}
              header=""
              number={6}
            />
          ) : (
            <></>
          )}
        </div>
      </Protected>
    </Layout>
  );
}
