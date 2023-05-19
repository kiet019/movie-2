import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { Button, Text } from "@nextui-org/react";
import { save } from "../features/FavorList";
import { useEffect, useState } from "react";
import { Film } from "@/config/interface";



export default function Favor() {
  const router = useRouter();
  const [data, setData] = useState<Film[]>();
  const favorFilmList = useAppSelector((state) => state.favorFilmList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch("https://64055d32eed195a99f80eece.mockapi.io/api/films/films", {
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
        setData(tasks);
        // Do something with the list of tasks
      })
      .catch((error) => {
        // handle error
      });
  }, [favorFilmList.filmList]);
  return (
    <Layout activeLink="">
      <Text h2 weight="bold" css={{ color: "bf5114" }}>
        Favorite Films
      </Text>
      <div className="show-favor-film">
        {data !== undefined ? (
          data.map((film) => (
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
        onClick={() => {
          dispatch(save(favorFilmList.id));
        }}
      >
        save
      </Button>
    </Layout>
  );
}
