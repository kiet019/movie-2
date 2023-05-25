import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AddInputNews } from "@/config/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../features/Hooks";
import { setOpen } from "../features/Alert";

export default function AddNewsPopup() {
  
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInputNews>();
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageSrc = `assets/images/${file.name}`;
        setImageUrl(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit: SubmitHandler<AddInputNews> = (data) => {
    data.img = imageUrl;
    const createNews = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation AddNews($addInputNews: addInputNews) {
                    addNews(addInputNews: $addInputNews) {
                      title
                      img
                      id
                      description
                      by
                    }
                  }`,
            variables: { addInputNews: data },
          }),
        });
      } catch (e) {
        console.log(e);
      }
      dispatch(
        setOpen({ open: true, message: "Adding success", severity: "success" })
      );
    };
    createNews();
    setVisible(false);
  };
  const handleClose = () => {
    setVisible(false);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Dialog onClose={handleClose} open={visible} maxWidth="sm" fullWidth>
        <DialogTitle align="center">ADD NEW NEWS</DialogTitle>
        <DialogContent>
          <form style={{ padding: "0.5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              error={errors.title !== undefined}
              label="Title"
              multiline
              rows={2}
              fullWidth
              helperText={
                errors.title !== undefined ? "must be 2 character or more" : ""
              }
              className="form-margin"
              {...register("title", {
                required: true,
                minLength: 2,
              })}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="form-margin"
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
              <TextField
                error={errors.by !== undefined}
                label="Author"
                size="small"
                {...register("by", {
                  required: true,
                  minLength: 2,
                })}
                helperText={
                  errors.by !== undefined
                    ? "must be 2 character or more"
                    : ""
                }
              ></TextField>
            </div>
            <TextField
              fullWidth
              multiline
              rows={7}
              error={errors.description !== undefined}
              label="Information"
              className="form-margin"
              {...register("description", {
                required: true,
                minLength: 2,
              })}
              helperText={errors.description !== undefined? "must be 2 character or more" : ""}
            ></TextField>
            <div
              style={{
                float: "right",
              }}
            >
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {!visible ? (
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: "fixed",
            right: "10%",
          }}
          size="medium"
          onClick={() => {
            setVisible(true);
          }}
        >
          <AddIcon />
        </Fab>
      ) : (
        <></>
      )}
    </>
  );
}
