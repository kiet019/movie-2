import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../features/Hooks";
import { auth } from "@/config/firebaseConfig";
import { useRouter } from "next/router";
interface Props {
  children: ReactNode;
}
export default function Protected({ children }: Props) {
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const router = useRouter();
  useEffect(() => {
    if (auth.currentUser === null) {
      router.push("/");
    }
  }, [userStatus]);
  return <div>{auth.currentUser !== null ? <>{children}</> : <></>}</div>;
}
