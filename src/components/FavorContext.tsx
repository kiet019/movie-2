import React, { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { clear, create, setData } from "../features/FavorList";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/router";
import { FavorFilmList } from "@/config/interface";
interface Props {
  children: ReactNode;
}

export default function Favorcontext({ children }: Props) {
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(auth.currentUser?.uid);
    if (auth.currentUser !== null) {
      const url = new URL(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor"
      );
      url.searchParams.append("userID", auth.currentUser.uid);
      // fetch(url, {
      //   method: "GET",
      //   headers: { "content-type": "application/json" },
      // })
      //   .then((res) => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     // handle error
      //   })
      //   .then((tasks) => {
      //     console.log(auth.currentUser?.uid);
      //     console.log(tasks.length);
      //     if (tasks.length === 0) {
      //       dispatch(create(auth.currentUser?.uid));
      //       router.reload()
      //     } else {
      //       dispatch(setData(tasks[0]));
      //     }
      //   })
      //   .catch((error) => {
      //     // handle error
      //   });
      const getFavorFilm = async () => {
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
          });
          const data: FavorFilmList[] = await response.json();
          if (data.length > 0) dispatch(setData(data[0]));
          else dispatch(create(auth.currentUser?.uid));
        } catch (error) {}
      };
      getFavorFilm();
    } else {
      dispatch(clear());
    }
  }, [userStatus]);
  return <div>{children}</div>;
}
