import React, { SetStateAction, useEffect, useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { AiOutlineMail } from "../../node_modules/react-icons/ai";
import { RiLockPasswordLine } from "../../node_modules/react-icons/ri";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "../../node_modules/react-icons/fc";
import { useAppDispatch } from "../features/hook";
import { setIsActive } from "../features/userstatus";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}
const ggProvider = new GoogleAuthProvider();
const auth = getAuth();
export default function Login({ visible, setVisible }: Props) {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sign, setSign] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password).then((result) => {
      setVisible(false)
    }).catch((error) => {
      setError(error.message);
    });
    
  };
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password).then((result) => {
      setVisible(false)
    }).catch((error) => {
      setError(error.message);
    });
  };
  useEffect(() => {
    setError("")
    setUsername("")
    setPassword("")
  }, [sign]);
  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to_
            <Text b size={18}>
              Movie
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {sign === false ? (
            <>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                contentLeft={<AiOutlineMail />}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input.Password
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Password"
                contentLeft={<RiLockPasswordLine />}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Row justify="space-between">
                <Checkbox>
                  <Text size={14}>Remember me</Text>
                </Checkbox>
                <Text size={14}>Forgot password?</Text>
              </Row>
            </>
          ) : (
            <>
              <Text h3>Register</Text>
              <Input
                placeholder="Email"
                contentRight={<AiOutlineMail />}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </>
          )}
          {error === "" ? null : <Text color="error">{error}</Text>}
          <Button
            color="warning"
            auto
            onPress={() => {
              signInWithPopup(auth, ggProvider).then((result) => {
                setVisible(false);
              }).catch((error) => {
                setError(error.message)
              }
              );
            }}
          >
            <FcGoogle style={{ fontSize: "1.5rem", marginRight: "1rem" }} />{" "}
            Login with google
          </Button>
        </Modal.Body>
        <Modal.Footer>
          {sign === false ? (
            <>
              <Button
                color="primary"
                light
                auto
                onPress={() => {
                  setSign(true);
                }}
              >
                Register
              </Button>
              <Button auto onPress={handleLogin}>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                color="primary"
                light
                auto
                onPress={() => {
                  setSign(false);
                }}
              >
                Login
              </Button>
              <Button auto onPress={handleRegister}>
                Register
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
