import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { Button, Text } from "@nextui-org/react";
import { save } from "../features/FavorList";
import { useEffect, useState } from "react";
import { Film } from "@/config/interface";



export default function Favor() {
  const router = useRouter();
  const [filmList, setFilmList] = useState<Film[]>();
  const favorFilmList = useAppSelector((state) => state.favorFilmList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData =async () => {
      const response = await fetch("https://64055d32eed195a99f80eece.mockapi.io/api/films/films", {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
      const data = await response.json();
      setFilmList(data);
    }
    getData();
  }, [favorFilmList.filmList]);
  return (
    <Layout activeLink="">
      <Text h2 weight="bold" css={{ color: "bf5114" }}>
        Favorite Films
      </Text>
      <div className="show-favor-film">
        {filmList !== undefined ? (
          filmList.filter((film) => favorFilmList.filmList.includes(film.id)).map((film) => (
            <div key={film.id} className="hover-mouse" onClick={() => {
              router.push("/details?id=" + film.id);
            }}>
              <img src={film.image} alt="" />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Button
        onPress={() => {
          dispatch(save(favorFilmList.id));
        }}
      >
        save
      </Button>
    </Layout>
  );
}
