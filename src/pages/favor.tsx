import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { save } from "../features/FavorList";
import { useEffect, useState } from "react";
import { Film } from "@/config/interface";
import Protected from "../components/Protected";
import { Button, Typography } from "@mui/material";

export default function Favor() {
  const router = useRouter();
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
  return (
    <Layout>
      <Protected>
        <Typography variant="h3" margin={3}>
          Favorite Films
        </Typography>
        <div className="show-favor-film">
          {filmList !== undefined ? (
            filmList
              .filter((film) => favorFilmList.filmList.includes(film.id))
              .map((film) => (
                <div
                  key={film.id}
                  className="hover-mouse"
                  onClick={() => {
                    router.push("/details?id=" + film.id);
                  }}
                >
                  <img src={film.image} alt="" />
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
        <Button
         variant="contained"
          onClick={() => {
            dispatch(save(favorFilmList.id));
          }}
        >
          save
        </Button>
      </Protected>
    </Layout>
  );
}
