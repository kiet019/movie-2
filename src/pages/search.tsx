import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { RouterQuery } from "@/config/interface";
import FilmList from "../components/FilmList";

export default function Type() {
  const router = useRouter();
  const { type, title } = router.query as unknown as RouterQuery;
  useEffect(() => {}, [title]);
  return (
    <>
      {type !== undefined || title !== undefined ? (
        <Layout>
          {/* <FilmList

            header={title === undefined ? type : "Search for " + title}
            number={12}
          /> */}
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
}
