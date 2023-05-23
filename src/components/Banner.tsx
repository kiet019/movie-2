import { banner } from "@/config/interface";
import { CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";

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

  return (
    <div>
      <div className="banner">
        <CardMedia
          component="img"
          image={banners[index].image}
          alt="Banner"
          sx={{
            height: {
              md: 400
            }
          }}
        />
      </div>
    </div>
  );
}
