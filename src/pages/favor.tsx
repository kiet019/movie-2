import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function Favor() {
  const router = useRouter();
  return (
    <Layout activeLink="">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        Favorite List
      </div>
    </Layout>
  );
}
