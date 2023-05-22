import Filmshow from "../components/FilmShow";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect } from "react";
import { RouterQuery } from "@/config/interface";

export default function Type() {
  const router = useRouter();
  const { type, title } = router.query as unknown as RouterQuery;
  useEffect(() => {}, [title]);
  return (
    <>
      {type !== undefined || title !== undefined ? (
        <Layout>
          <Filmshow
            type={type}
            header={title === undefined ? type : "Search for " + title}
            number={12}
            title={title}
          />
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
}
