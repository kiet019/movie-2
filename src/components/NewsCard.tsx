import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { News } from "@/config/interface";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../features/Hooks";
import { setOpen } from "../features/Alert";
import ConfirmPopup from "./ConfirmPopup";
import { useEffect, useState } from "react";
import UpdateNewsPopup from "./UpdateNewsPopup";

interface Props {
  news: News;
}
export default function NewsCard({ news }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (agree === true) {
      const deleteNews = async () => {
        try {
          const response = await fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `mutation DeleteNews($deleteNewsId: String!) {
                deleteNews(id: $deleteNewsId)
              }
              `,
              variables: {
                deleteNewsId: news.id,
              },
            }),
          });
        } catch (e) {
          console.log(e);
        }
        dispatch(
          setOpen({ open: true, message: "Delete success", severity: "error" })
        );
      };
      deleteNews();
    }
    setAgree(false);
  });

  return (
    <Card
      style={{
        maxWidth: "50rem",
        margin: "auto",
        marginBottom: "2rem",
        height: "17rem",
      }}
    >
      <div style={{ display: "flex", height: "100%", position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            width: {
              xs: 250,
              md: 320, // theme.breakpoints.up('md')
            },
          }}
          style={{
            margin: "1rem",
            boxShadow: "0px 0px 5px black",
          }}
          image={news.img}
          alt="Not Found"
        />
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          style={{
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {news.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              By {news.by}
            </Typography>
            <Typography component="div" variant="body1">
              {news.title}
            </Typography>
            <div
              style={{
                position: "absolute",
                right: "0",
                bottom: "0",
                width: "100px"
              }}
            >
              <UpdateNewsPopup news={news}/>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setConfirmOpen(true);
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
            
            </div>
          </CardContent>
        </Box>
      </div>
      <ConfirmPopup
        confirmOpen={confirmOpen}
        message="Delete this News ?"
        setConfirmOpen={setConfirmOpen}
        setAgree={setAgree}
      />
    </Card>
  );
}
export async function getServerSideProps() {
  
}