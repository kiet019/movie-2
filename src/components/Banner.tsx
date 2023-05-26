import { banner } from "@/config/interface";
import { CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAppSelector } from "../features/Hooks";
interface Props {
  banners: banner[];
}
export default function Banner({ banners }: Props) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [banners.length]);
  const theme = useAppSelector((state) => state.theme);
  return (
    <div
      style={{
        position: "relative",
        height: "400px",
        boxShadow: "0px 0px 10px white",
        borderRadius: "2.2rem",
      }}
    >
      <div
        style={{
          background: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
          zIndex: "1",
          width: "98%",
          margin: "2px 0 0 1.8%",
          height: "396px",
          position: "absolute",
          borderRadius: "2.2rem",
        }}
      ></div>
      <CardMedia
        component="img"
        image={banners[index].image}
        alt="Banner"
        sx={{
          height: {
            md: 400,
          },
        }}
        style={{
          borderRadius: "2rem",
          border: "2px solid rgb(184, 4, 4)",
          position: "absolute",
        }}
      />
      <div className="banner-button">
        <PlayArrowIcon
          sx={{
            position: "absolute",
            color: theme.border,
            width: "5rem",
            height: "5rem",
            boxShadow: "0px 0px 15px white",
            borderRadius: "50%",
          }}
        />
        <div className="banner-button-inside"></div>
      </div>
    </div>
  );
}
