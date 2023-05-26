import { Film } from "@/config/interface";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmPopup from "./ConfirmPopup";
import { useEffect, useState } from "react";
import { remove } from "../features/FavorList";
interface Props {
  film: Film;
}

export default function FilmCard({ film }: Props) {
  const theme = useAppSelector((state) => state.theme);
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [agree, setAgree] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (agree === true) {
      dispatch(remove(deleteID));
      setConfirmOpen(false);
    }
  }, [agree]);
  return (
    <Card
      variant="outlined"
      style={{
        position: "relative",
        height: "400px",
        border: "2px solid rgb(184, 4, 4)",
        borderRadius: "1rem",
        transition: "200ms",
        boxShadow: "0px 0px 10px white"
      }}
      sx={{
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <div className="card-play hover-mouse">
        {router.asPath === "/favor" ? (
          <IconButton
            aria-label="delete"
            sx={{
              position: "absolute",
              right: "0",
              bottom: "0",
              zIndex: "100",
            }}
            size="large"
            onClick={() => {
              console.log("hello");
              setConfirmOpen(true);
              setDeleteID(film.id);
            }}
          >
            <DeleteIcon
              style={{
                width: 30,
                height: 30,
              }}
              color="error"
            />
          </IconButton>
        ) : (
          <></>
        )}
        <div className="card-play-button right"></div>
        <div
          className="card-play-button left"
          onClick={() => {
            router.push(`/details?id=` + film.id);
          }}
        >
          <PlayArrowIcon
            sx={{
              backgroundColor: theme.font,
              borderRadius: "50%",
              color: theme.logo,
              width: "4rem",
              height: "4rem",
              transform: "rotate(-45deg)",
              ":hover": {
                transform: "rotate(-45deg) scale(1.2)",
              },
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: "1",
        }}
      >
        <div
          style={{
            height: "220px",
            width: "100%",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
          }}
        ></div>
        <div
          style={{
            height: "185px",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
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
          zIndex: 2,
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
      <ConfirmPopup
        confirmOpen={confirmOpen}
        message="Delete this Film ?"
        setConfirmOpen={setConfirmOpen}
        setAgree={setAgree}
      />
    </Card>
  );
}
