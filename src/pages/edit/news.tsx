import Layout from "@/src/components/Layout";
import {
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Toolbar,
  TableBody,
  TablePagination,
  Checkbox,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import AddNewsPopup from "../../components/AddNewsPopup";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmPopup from "@/src/components/ConfirmPopup";
import UpdateNewsPopup from "@/src/components/UpdateNewsPopup";
import { News } from "@/config/interface";
import { useAppDispatch } from "@/src/features/Hooks";
import Link from "next/link";
import { setOpen } from "@/src/features/Alert";
import { useAppSelector } from "../../features/Hooks";
export default function EditNews() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const dispatch = useAppDispatch();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [selectNews, setSelectNews] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const alert = useAppSelector((state) => state.alert);
  const [searchType, setSearchType] = useState<string>()
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {}, [selectNews]);
  useEffect(() => {
    console.log("hello");
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
  }, [alert]);
  useEffect(() => {
    if (agree === true && selectNews !== undefined) {
      const deleteNews = async () => {
        try {
          const response = await fetch("http://localhost:4000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `mutation DeleteNews($ids: [String!]) {
                deleteNews(ids: $ids)
              }
                  `,
              variables: {
                ids: selectNews,
              },
            }),
          });
        } catch (e) {
          console.log(e);
        }
        dispatch(
          setOpen({ open: true, message: "Delete success", severity: "error" })
        );
      };
      deleteNews();
      setSelectNews([]);
    }
    setAgree(false);
    setConfirmOpen(false);
  }, [agree]);

  return (
    <Layout>
      <AddNewsPopup />
      <TableContainer component={Paper}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Edit News</Typography>
          <div style={{
            display: "flex",
          }}>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
              size="small"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Title</MenuItem>
              <MenuItem value={20}>Author</MenuItem>
              <MenuItem value={30}>Description</MenuItem>
            </Select>
            <TextField label="Search" size="small" variant="filled" />
          </div>
          <div>
            <Button
              aria-label="delete"
              onClick={() => {
                setConfirmOpen(true);
              }}
            >
              <Typography color="error">
                {selectNews.length > 0 ? `${selectNews.length} selected` : ""}
              </Typography>
              <DeleteIcon
                style={{
                  width: 30,
                  height: 30,
                }}
                color="error"
              />
            </Button>
          </div>
        </Toolbar>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList
              .slice(0 + page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      color="error"
                      onChange={(e) => {
                        if (e.currentTarget.checked === true) {
                          setSelectNews([...selectNews, row.id]);
                        } else {
                          setSelectNews(
                            selectNews.filter((id) => !row.id.includes(id))
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="justify">{row.title}</TableCell>
                  <TableCell>{row.by}</TableCell>
                  <TableCell>
                    <Link href={"../" + row.img} target="_blank">
                      Click
                    </Link>
                  </TableCell>
                  <TableCell align="justify">{row.description}</TableCell>
                  <TableCell align="right">
                    <UpdateNewsPopup news={row} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={newsList.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
      <ConfirmPopup
        confirmOpen={confirmOpen}
        message="Delete this News ?"
        setConfirmOpen={setConfirmOpen}
        setAgree={setAgree}
      />
    </Layout>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
