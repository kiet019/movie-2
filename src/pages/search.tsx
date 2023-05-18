import Filmshow from "../components/filmshow";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
interface RouterQuery {
  type: string;
  title: string;
}

export default function Type() {
  const router = useRouter();
  const { type, title } = router.query as unknown as RouterQuery;
  useEffect(() => {

  }, [title]);
  return (
    <>
      {type !== undefined || title !== undefined ? (
        <Layout activeLink="Type">
          <Filmshow
            type={type}
            header={title === undefined ? type : "Search for " + title}
            number={12}
            title={title}
          />
        </Layout>
      ) : (
        <Loading size="md" />
      )}
    </>
  );
}
