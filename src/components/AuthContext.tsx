import React, { ReactNode, useState } from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../features/Hooks";
import { useAppSelector } from "../features/Hooks";
import { onAuthStateChanged } from "firebase/auth";
import { setIsActive } from "../features/UserStatus";
import { auth } from "../../config/firebaseConfig"
interface Props {
  children: ReactNode;
}
export default function Authcontext({ children }: Props) {
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser !== null ? dispatch(setIsActive({ status: true})): dispatch(setIsActive({ status: false}))
    });
    return () => {
      unSubscribe();
    };
  }, [userStatus]);
  return <div>{children}</div>;
}


