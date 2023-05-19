import React, { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { create, setData } from "../features/FavorList";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}

export default function Favorcontext({ children }: Props) {
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const dispatch = useAppDispatch();
  const router = useRouter()
  useEffect(() => {
    console.log(auth.currentUser);
    if (auth.currentUser !== null) {
      const url = new URL(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor"
      );
      url.searchParams.append("userID", auth.currentUser.uid);
      fetch(url, {
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
          console.log(auth.currentUser?.uid);
          console.log(tasks.length);
          if (tasks.length === 0) {
            dispatch(create(auth.currentUser?.uid));
            router.reload()
          } else {
            dispatch(setData(tasks[0]));
          }
        })
        .catch((error) => {
          // handle error
        });
    }
  }, [userStatus]);
  return <div>{children}</div>;
}
