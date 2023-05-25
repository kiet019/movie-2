import { Film } from "@/config/interface";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "../features/Hooks";
interface Props {
  film: Film;
}

export default function FilmCard({ film }: Props) {
  const theme = useAppSelector((state) => state.theme);
  const router = useRouter();
  return (
    <Card
      variant="outlined"
      onClick={() => {
        router.push(`/details?id=` + film.id);
      }}
      className="hover-mouse"
      style={{
        position: "relative",
        height: "400px",
        border: "2px solid rgb(184, 4, 4)",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: "1"
        }}
      >
        <div
          style={{
            height: "220px",
            width: "100%",
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
          }}
        ></div>
        <div
          style={{
            height: "185px",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        ></div>
      </div>
      <CardMedia
        component="img"
        sx={{
          height: "100%",
          position: "absolute",
        }}
        image={film.image}
        alt="Paella dish"
      />
      <CardContent
        style={{
          position: "absolute",
          marginTop: "65%",
          color: theme.font,
          zIndex: 2
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            height: "3.5rem",
            overflow: "hidden",
          }}
        >
          {film.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {film.year}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            height: "3.7rem",
            overflow: "hidden",
            color: theme.font,
          }}
        >
          {film.information}
        </Typography>
      </CardContent>
    </Card>
  );
}
