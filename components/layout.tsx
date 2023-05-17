import React, { ReactNode } from "react";
import Head from "next/head";
import Navigation from "./navigation";

interface LayoutProps {
  children: ReactNode;
  activeLink: string;
}

export default function Layout({ children, activeLink }: LayoutProps) {
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
