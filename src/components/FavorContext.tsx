import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { clear, create, setData } from "../features/FavorList";
import { auth } from "@/config/firebaseConfig";
import { FavorFilmList } from "@/config/interface";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}

export default function Favorcontext({ children }: Props) {
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const dispatch = useAppDispatch();
  const router = useRouter()
  useEffect(() => {
    console.log(auth.currentUser?.uid);
    if (auth.currentUser !== null) {
      const url = new URL(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor"
      );
      url.searchParams.append("userID", auth.currentUser.uid);
 
      const getData = async () => {
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
          });
          const data: FavorFilmList[] = await response.json();
          if (data.length > 0) dispatch(setData(data[0]));
          else {
            dispatch(create(auth.currentUser?.uid));
            router.reload()
          }
        } catch (error) {}
      };
      getData();
    } else {
      dispatch(clear());
    }
  }, [userStatus]);
  return <div>{children}</div>;
}
