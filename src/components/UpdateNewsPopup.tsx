import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { News, UpdateInputNews } from "@/config/interface";
import EditIcon from "@mui/icons-material/Edit";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../features/Hooks";
import { setOpen } from "../features/Alert";

interface Props {
  news: News;
}
export default function UpdateNewsPopup({ news }: Props) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, } = useForm<UpdateInputNews>();
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(news.img);
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
  const onSubmit: SubmitHandler<UpdateInputNews> = (data) => {
    data.img = imageUrl;
    data.id = news.id;
    const UpdateNews = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `mutation Mutation($updateInputNews: updateInputNews) {
                updateNews(updateInputNews: $updateInputNews)
              }`,
            variables: { updateInputNews: data },
          }),
        });
        console.log(await response.json());
      } catch (e) {
        console.log(e);
      }
      dispatch(
        setOpen({ open: true, message: "Update success", severity: "success" })
      );
    };
    UpdateNews();
    setVisible(false);
  };
  const handleClose = () => {
    setVisible(false);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Dialog onClose={handleClose} open={visible} maxWidth="sm" fullWidth>
        <DialogTitle align="center">UPDATE NEWS</DialogTitle>
        <DialogContent>
          <form style={{ padding: "0.5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              multiline
              rows={2}
              error={errors.title !== undefined}
              fullWidth
              style={{
                marginBottom: "1rem"
              }}
              {...register("title", {
                required: true,
                minLength: 2,
              })}
              helperText={
                errors.title !== undefined ? "must be 2 character or more" : ""
              }
              defaultValue={news.title}
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
                label="Author"
                size="small"
                error={errors.by !== undefined}
                {...register("by", {
                  required: true,
                  minLength: 2,
                })}
                defaultValue={news.by}
                helperText={
                  errors.by !== undefined ? "must be 2 character or more" : ""
                }
              ></TextField>
            </div>
            <TextField
              fullWidth
              multiline
              rows={7}
              label="Information"
              style={{
                marginBottom: "1rem"
              }}
              {...register("description", {
                required: true,
                minLength: 2,
              })}
              defaultValue={news.description}
              helperText={
                errors.description !== undefined
                  ? "must be 2 character or more"
                  : ""
              }
              error={errors.description !== undefined}
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
        <IconButton
          aria-label="update"
          onClick={() => {
            setVisible(true);
          }}
        >
          <EditIcon
            style={{
              width: 30,
              height: 30,
            }}
            color="success"
          />
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
}
