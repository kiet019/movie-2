import { MdMovieFilter } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  Navbar,
  Button,
  Link,
  Input,
  Dropdown,
  Text,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  signOut,
} from "firebase/auth";
import Login from "./LoginPopup";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { setIsActive } from "../features/UserStatus";
import { auth } from "../../config/firebaseConfig"
import { NavItem } from "@/config/interface";
interface Props {
  activeLink: string;
}

export default function Navigation({ activeLink }: Props) {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const items: NavItem[] = [
    { key: "movies", name: "Movies" },
    { key: "series", name: "Series" },
  ];
  const [searchParams, setSearchParams] = useState<string>("");
  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform form submission logic here
    const href = "/search?title=" + searchParams;
    router.push(href);
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand>
          <div
            onClick={() => {
              router.push("/");
            }}
            className="hover-mouse"
          >
            <MdMovieFilter
              style={{
                height: "4em",
                width: "4em",
              }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Content activeColor="primary" hideIn="xs" variant="underline">
          <Navbar.Link isActive={activeLink === "Type"}>
            <Dropdown isBordered>
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                // iconRight={}
                ripple={false}
              >
                Types
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Dynamic Actions">
                {items.map((item) => {
                  return (
                    <Dropdown.Item key={item.key}>
                      <div
                        onClick={() => {
                          router.push("/search?type=" + item.key);
                        }}
                        className="hover-mouse"
                      >
                        {item.name}
                      </div>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Link>
          <Navbar.Link isActive={activeLink === "News"} href="#">
            News
          </Navbar.Link>
          <Navbar.Link isActive={activeLink === "About"} href="#">
            About
          </Navbar.Link>
          <Navbar.Link isActive={activeLink === "Contact"} href="#">
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
          <form>
            <Input
              clearable
              contentLeft={<BiSearchAlt2 />}
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
              placeholder="Search"
              onChange={(e) => {
                setSearchParams(e.target.value);
              }}
              value={searchParams}
              onKeyDown={handleKeyDown}
            />
          </form>
        </Navbar.Content>
        {auth.currentUser === null ? (
          <Navbar.Content>
            <Navbar.Item>
              <Button
                auto
                flat
                as={Link}
                onClick={() => {
                  setVisible(true);
                }}
              >
                Login
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        ) : (
          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={
                      auth.currentUser.photoURL === null
                        ? ""
                        : auth.currentUser.photoURL
                    }
                    alt=""
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Logged in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {auth.currentUser.email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  <div onClick={() => {
                    router.push("/favor")
                  }}>Favorite List</div>
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  <div
                    onClick={() => {
                      signOut(auth).then(() => {
                        dispatch(setIsActive({ status: false}))
                        router.reload()
                        
                      });
                    }}
                  >
                    Log Out
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        )}
      </Navbar>
      <Login visible={visible} setVisible={setVisible} />
    </>
  );
}
