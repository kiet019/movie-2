import React, { SetStateAction } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { FiUser } from "../../node_modules/react-icons/fi";
import { RiLockPasswordLine } from "../../node_modules/react-icons/ri";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "../../node_modules/react-icons/fc";
import { useAppDispatch } from "../features/hook";
interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
}
const ggProvider = new GoogleAuthProvider();
const auth = getAuth();
export default function Login({ visible, setVisible }: Props) {
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


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
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Username"
            contentLeft={<FiUser />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<RiLockPasswordLine />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Button
            color="warning"
            auto
            onPress={() => {
              signInWithPopup(auth, ggProvider).then((result) => {
 
                setVisible(false);
              });
            }}
          >
            <FcGoogle style={{ fontSize: "1.5rem", marginRight: "1rem" }} />{" "}
            Login with google
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
