import React, { ReactNode } from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import { Container } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
      <Container maxWidth="lg" style={{
        paddingTop: "10rem",
        marginBottom: "10rem"
      }}>
        <Head>
          <title>Movie App</title>
        </Head>
        <Navigation />
        <div className="user">{children}</div>
      </Container>
  );
}
