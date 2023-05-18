import React, { ReactNode, useState } from "react";
import { useEffect } from "react";
import { setData } from "../features/favorlist";
import { useAppDispatch } from "../features/hook";
import { useAppSelector } from "../features/hook";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setIsActive } from "../features/userstatus";

interface Props {
  children: ReactNode;
}
interface Film {
  id: string;
}
interface FavorFilmList {
  userID: string;
  id: string;
  filmList: Film[];
}

export default function Setup({ children }: Props) {
  const auth = getAuth();
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setIsActive({ status: true}))
      console.log("User", currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, [userStatus, auth, dispatch]);
  return <div>{children}</div>;
}
