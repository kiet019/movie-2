import { Film } from "@/config/interface";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
interface Props {
  film: Film;
}
export default function FilmCard({ film }: Props) {
  const router = useRouter();
  return (
    <Card
      variant="outlined"
      onClick={() => {
        router.push(`/details?id=` + film.id);
      }}
      className="hover-mouse"
    >
      <CardMedia
        component="img"
        sx={{
          height: {
            xs: 100,
            md: 200,
          },
        }}
        image={film.image}
        alt="Paella dish"
      />
      <CardContent>
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
          }}
        >
          {film.information}
        </Typography>
        
      </CardContent>
    </Card>
  );
}
