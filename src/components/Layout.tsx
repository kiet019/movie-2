import React, { ReactNode } from "react";
import Head from "next/head";
import Navigation from "./Navigation";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
      <div className="layout-container">
        <Head>
          <title>Movie App</title>
        </Head>
        <Navigation />
        <div className="user">{children}</div>
      </div>
  );
}
