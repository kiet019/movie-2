import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../features/Hooks";
import { setIsActive } from "../features/UserStatus";
import { auth } from "../../config/firebaseConfig";
import { NavItem } from "@/config/interface";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  styled,
} from "@mui/material";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LoginPopup from "./LoginPopup";
export default function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useAppDispatch();
  const navbarItem: NavItem[] = [
    { key: "movies", name: "Movies" },
    { key: "series", name: "Series" },
    { key: "news", name: "News" },
  ];
  const userStatus = useAppSelector((state) => state.userStatus.status);
  const router = useRouter();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    searchValue: string
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event, searchValue);
    }
  };
  const handleSubmit = (event: React.FormEvent, searchValue: string) => {
    event.preventDefault();
    console.log(searchValue);
    const href = "/search?title=" + searchValue;
    router.push(href);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect((  ) => {
  }, [userStatus]);
  const theme = useAppSelector((state) => state.theme);
  const favor = useAppSelector((state) => state.favorFilmList)
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: theme.background,
          boxShadow: "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <div
              onClick={() => {
                router.push("/");
              }}
              className="hover-mouse"
            >
              <MovieIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  transition: "200ms",
                  ":hover": { transform: "scale(1.2)" },
                  height: "3.5em",
                  width: "3.5em",
                  color: theme.border,
                }}
              />
            </div>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push("/");
                  }}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                {navbarItem.map((item) => (
                  <MenuItem
                    key={item.key}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (item.key !== "news") {
                        router.push("/search?type=" + item.key);
                      } else {
                        router.push("/" + item.key);
                      }
                    }}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {navbarItem.map((item) => (
                <Button
                  key={item.key}
                  onClick={() => {
                    if (item.key !== "news") {
                      router.push("/search?type=" + item.key);
                    } else {
                      router.push("/" + item.key);
                    }
                  }}
                  sx={{
                    marginLeft: "1rem",
                    display: "block",
                    transition: "200ms",
                    ":hover": {
                      transform: "scale(1.2)",
                      backgroundColor: "orangered",
                    },
                  }}
                  size="large"
                >
                  <Typography variant="h6" color={theme.font}>
                    {item.name}
                  </Typography>
                </Button>
              ))}
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  handleKeyDown(e, e.currentTarget.value);
                }}
              />
            </Search>
            {auth.currentUser === null ? (
              <LoginPopup />
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open favor list">
                  <IconButton>
                  <Badge badgeContent={favor.filmList.length} color="primary">
                    <FavoriteIcon
                      sx={{
                        color: theme.border,
                        height: "1.5em",
                        width: "1.5em",
                        transition: "200ms",
                        ":hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                      onClick={() => {
                        handleCloseUserMenu();
                        router.push("/favor");
                      }}
                    />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <div style={{ padding: "0px 11px 0px" }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          auth.currentUser.photoURL === null
                            ? ""
                            : auth.currentUser.photoURL
                        }
                      />
                    </div>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <div style={{ padding: "0rem 1rem" }}>
                    <MenuItem>
                      <Typography variant="h6">
                        Sign as <br></br>
                        {auth.currentUser.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography
                        className="user-menu"
                        onClick={() => {
                          handleCloseUserMenu();
                          router.push("/edit/news");
                        }}
                      >
                        Edit News
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography
                        className="user-menu logout"
                        onClick={() => {
                          handleCloseUserMenu();
                          signOut(auth).then(() => {
                            dispatch(setIsActive({ status: false }));
                          });
                        }}
                      >
                        Log out
                      </Typography>
                    </MenuItem>
                  </div>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
