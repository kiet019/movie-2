import { banner } from "@/config/interface";
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
        <img src={banners[index].image} className="banner-image" alt="Banner" />
      </div>
    </div>
  );
}
