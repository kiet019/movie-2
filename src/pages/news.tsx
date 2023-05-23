import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { News } from "@/config/interface";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [newsList, setNewsList] = useState<News[]>([])
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
        })})
        const data = await response.json();
        console.log(data.data.getNews);
        setNewsList(data.data.getNews)
      } catch(error) {
        console.log(error)
      }
    }
    getData();
  }, []);
  return (
    <Layout >
       {newsList.map((news) => (
        <NewsCard news={news} key={news.id}/>
       ))}
    </Layout>
  );
}
