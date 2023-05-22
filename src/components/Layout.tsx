import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import Navigation from "./Navigation";

interface Props {
  children: ReactNode;
  activeLink: string;
}

export default function Layout({ children, activeLink }: Props) {
  return (
      <div className="container">
        <Head>
          <title>Movie App</title>
        </Head>
        <Navigation activeLink={activeLink} />
        <div className="user">{children}</div>
      </div>
  );
}
