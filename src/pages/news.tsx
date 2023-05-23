import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { News } from "@/config/interface";
import NewsCard from "../components/NewsCard";
import { Pagination, Typography } from "@mui/material";

export default function News() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(0);
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
                      getNews(ids : []) { id img title description by }
                    }
                    `,
          }),
        });
        const data = await response.json();
        console.log(data.data.getNews);
        setNewsList(data.data.getNews);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <Layout>
      <Typography variant="h3" margin={3}>
        News
      </Typography>
      {newsList.slice(-5 + page*5, 0 + page*5).map((news) => (
        <NewsCard news={news} key={news.id} />
      ))}
      <Pagination
        count={Math.floor(newsList.length / 5) + 1}
        page={page}
        onChange={(event, page) => {
          setPage(page);
        }}
        style={{
          float: "right",
          position: "relative"
        }}
        shape="rounded"
        variant="outlined"
        color="primary"
        
      />
    </Layout>
  );
}
