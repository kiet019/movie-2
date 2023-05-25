import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { News } from "@/config/interface";
import NewsCard from "../components/NewsCard";
import { Pagination, Typography } from "@mui/material";
import AddNewsPopup from "../components/AddNewsPopup";
import { useAppSelector } from "../features/Hooks";

export default function News() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [page, setPage] = useState(1);
  const alert = useAppSelector((state) => state.alert);
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
        // setNewsList(data.data.getNews);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [alert]);
  return (
    <Layout>
      <AddNewsPopup />
      <Typography variant="h3" margin={3}>
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
        style={{
          float: "right",
          position: "relative",
        }}
        shape="rounded"
        variant="outlined"
        color="primary"
      />
    </Layout>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}
