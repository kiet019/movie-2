import {
  Navbar,
  Button,
  Link,
  Input,
  Grid,
  Card,
  Col,
  Text,
} from "@nextui-org/react";
import Head from "next/head";
import { MdMovieFilter } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import Layout from "@/pages/components/layout";

interface Film {
  image: string;
  title: string;
  year: number;
  director: string;
  time: number;
  trailer: string;
  resolution: string;
  information: string;
  id: string;
  type: string;
}
export default function index() {
  const [activeLink, setActiveLink] = useState<String>("Home");
  const handleLinkClick = (link: String) => {
    setActiveLink(link);
  };
  const [films, setFilms] = useState<Film[]>([]);
  useEffect(() => {
    fetch("https://64055d32eed195a99f80eece.mockapi.io/api/films/films", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        setFilms(tasks);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
  return (
    <div>
      <Head>
        <title>Movie App</title>
      </Head>
      <Navbar>
        <Navbar.Brand>
          <MdMovieFilter
            style={{
              height: "4em",
              width: "4em",
            }}
          />
        </Navbar.Brand>
        <Navbar.Content activeColor="primary" hideIn="xs" variant="underline">
          <Navbar.Link
            onClick={() => handleLinkClick("Home")}
            isActive={activeLink === "Home"}
            href="#"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            onClick={() => handleLinkClick("Type")}
            isActive={activeLink === "Type"}
            href="#"
          >
            Type
          </Navbar.Link>
          <Navbar.Link
            onClick={() => handleLinkClick("News")}
            isActive={activeLink === "News"}
            href="#"
          >
            News
          </Navbar.Link>
          <Navbar.Link
            onClick={() => handleLinkClick("About")}
            isActive={activeLink === "About"}
            href="#"
          >
            About
          </Navbar.Link>
          <Navbar.Link
            onClick={() => handleLinkClick("Contact")}
            isActive={activeLink === "Contact"}
            href="#"
          >
            Contact
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xsMax": {
              w: "100%",
              jc: "center",
            },
          }}
        >
          <Input
            clearable
            contentLeft={<BiSearchAlt2 />}
            contentLeftStyling={false}
            css={{
              w: "100%",
              "@xsMax": {
                mw: "300px",
              },
              "& .nextui-input-content--left": {
                h: "100%",
                ml: "$4",
                dflex: "center",
              },
            }}
            placeholder="Search..."
          />
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      <Layout>
        <div className="films-List">
          <Grid.Container gap={2} justify="center">
            {films.map((film) => {
              return (
                <Grid xs={12} sm={4} key={film.id}>
                  <Card css={{height: '24rem'}} isPressable isHoverable onClick={() => {
                    
                  }}>
                    <Card.Header
                      css={{ position: "absolute", zIndex: 1, top: 5 }}
                    >
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={film.image}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        alt="Card example background"
                      />
                    </Card.Body>
                    <Card.Footer
                      isBlurred
                      css={{
                        position: "absolute",
                        bgBlur: "#ffffff66",
                        borderTop:
                          "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                        bottom: 0,
                        zIndex: 1,
                        height: "7rem",
                      }}
                    >
                      <Col>
                        <Text h3 color="black">
                          {film.title}
                        </Text>
                      </Col>
                    </Card.Footer>
                  </Card>
                </Grid>
              );
            })}
          </Grid.Container>
        </div>
      </Layout>
    </div>
  );
}
