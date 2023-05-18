import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layout";

export default function favor() {
    const router = useRouter()
  return (
    <Layout activeLink="">
        <div
        onClick={() => {
          router.push("/");
        }}
      >
        Favorite List
      </div>
    </Layout>
  );
}
