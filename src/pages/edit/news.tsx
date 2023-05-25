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
} from "@mui/material";
import AddNewsPopup from "../../components/AddNewsPopup";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [selectNews, setSelectNews] = useState<News>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const alert = useAppSelector((state) => state.alert);
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
              query: `mutation DeleteNews($deleteNewsId: String!) {
                    deleteNews(id: $deleteNewsId)
                  }
                  `,
              variables: {
                deleteNewsId: selectNews.id,
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
    }
    setAgree(false);
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
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setConfirmOpen(true);
              }}
            >
              <DeleteIcon
                style={{
                  width: 30,
                  height: 30,
                }}
                color="error"
              />
            </IconButton>
          </div>
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>By</TableCell>
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
  return {};
}
