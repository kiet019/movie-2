import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { News } from "@/config/interface";
import NewsCard from "../components/NewsCard";
import { Pagination, Typography } from "@mui/material";
import { useAppSelector } from "../features/Hooks";
export default function News() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:4000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query Query {
                      getAllNews { id img title description by }
                    }
                    `,
          }),
        });
        const data = await response.json();
        setNewsList(data.data.getAllNews);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const theme = useAppSelector(state => state.theme)
  return (
    <Layout>
      <Typography variant="h3" sx={{
        color: theme.logo
      }} margin={3}>
        News
      </Typography>
      {newsList.length > 0 ? (
        newsList
          .slice(-5 + page * 5, 0 + page * 5)
          .map((news) => <NewsCard news={news} key={news.id} />)
      ) : (
        <></>
      )}
      <Pagination
        count={Math.floor(newsList.length / 5) + 1}
        page={page}
        onChange={(event, page) => {
          setPage(page);
        }}
        sx={{
          float: "right",
          marginTop: "1rem",
          "& .MuiButtonBase-root": {
            color: theme.font,
          },
          // "& .MuiButtonBase-root-MuiPaginationItem-root": {
          "& .Mui-selected": {
            backgroundColor: `${theme.logo} !important`,
          },
          // },
          "& .MuiButtonBase-root:hover": {
            background: theme.logo,
          },
        }}
        shape="rounded"
        color="primary"
      />
    </Layout>
  );
}