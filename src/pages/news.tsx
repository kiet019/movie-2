import { useEffect } from "react";
import Layout from "../components/Layout";

export default function News() {
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
      } catch(error) {
        console.log(error)
      }
    }
    getData();
  }, []);
  return (
    <Layout activeLink="News">
      <div></div>
    </Layout>
  );
}
