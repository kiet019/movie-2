import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { News } from "@/config/interface";

interface Props {
  news: News;
}
export default function NewsCard({ news }: Props) {
  return (
    <Card
      sx={{ display: "flex" }}
      style={{
        maxWidth: "50rem",
        margin: "auto",
        marginBottom: "2rem",
        height: "17rem",
      }}
    >
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
          boxShadow: "0px 0px 5px black"
        }}
        image={news.img}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }} style={{
        overflow: "hidden"
      }}>
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
        </CardContent>
      </Box>
    </Card>
  );
}
