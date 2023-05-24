import React, { useEffect, useState } from "react";
import {
  InputAdornment,
  OutlinedInput,
  Typography,
  Checkbox,
  Button,
  FilledInput,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, ggProvider } from "../../config/firebaseConfig";

export default function LoginPopup() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sign, setSign] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((result) => {
        setVisible(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((result) => {
        setVisible(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    setError("");
    setUsername("");
    setPassword("");
  }, [sign]);
  return (
    <>
      <Dialog
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        open={visible}
        onClose={closeHandler}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Welcome to Movie-app</DialogTitle>
        <DialogContent>
          {sign === false ? (
            <>
              <OutlinedInput
                className="input-login"
                startAdornment={
                  <InputAdornment position="start">
                    <AiOutlineMail />
                  </InputAdornment>
                }
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <OutlinedInput
                className="input-login"
                startAdornment={
                  <InputAdornment position="start">
                    <RiLockPasswordLine />
                  </InputAdornment>
                }
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox />
                  <Typography>Remember me</Typography>
                </div>
                <Typography>Forgot password</Typography>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h5">Register</Typography>
              <FilledInput
                placeholder="Email"
                endAdornment={<AiOutlineMail />}
                value={username}
                className="input-password"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <FilledInput
                placeholder="Password"
                endAdornment={<RiLockPasswordLine />}
                value={password}
                className="input-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
            </>
          )}
          {error === "" ? null : <Typography color="red">{error}</Typography>}
          <Button
            variant="contained"
            style={{ backgroundColor: "#F5A524" }}
            onClick={() => {
              signInWithPopup(auth, ggProvider)
                .then((result) => {
                  setVisible(false);
                })
                .catch((error) => {
                  setError(error.message);
                });
            }}
            fullWidth
          >
            <FcGoogle style={{ fontSize: "1.5rem", marginRight: "1rem" }} />
            Login with google
          </Button>
        </DialogContent>
        <DialogTitle>
          <div style={{ float: "right" }}>
            {sign === false ? (
              <>
                <Button
                  onClick={() => {
                    setSign(true);
                  }}
                >
                  Register
                </Button>
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setSign(false);
                  }}
                >
                  Login
                </Button>
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
              </>
            )}
          </div>
        </DialogTitle>
      </Dialog>
      {!visible ? (
        <Button
          onClick={() => {
            setVisible(true);
          }}
          sx={{ my: 2, color: "white", display: "block" }}
          size="large"
        >
          login
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
