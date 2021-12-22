import React, { useState } from "react";
import { Modal, Header, Form, Button, Icon } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBoard, fetchBoards } from "../features/board/boardSlice";

const CreateBoardModal = ({ boards }) => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  //add board function
  const addBoard = () => {
    const temp = {
      title: titleInput,
    };
    dispatch(createBoard({ body: temp }));
    setOpen(false);
  };

  //add board api call
  // const createBoard = (board) => {
  //   //save to DB
  //   console.log(board);

  //   setOpen(false);
  //   //update redux
  //   setBoards([...boards.concat([board])]);
  // };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button icon style={{ padding: "0px", backgroundColor: "transparent" }}>
          <Icon name="plus" />
        </Button>
      }
    >
      <Modal.Header>Create Board</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Enter board title</Header>
          <Form
            onSubmit={handleSubmit(addBoard)}
            style={{
              width: "100%",
              marginLeft: "0px",
              marginRight: "0px",
            }}
          >
            <Form.Group width={16}>
              <Form.Input
                width={12}
                placeholder="Board title"
                name="titleInput"
                value={titleInput}
                onChange={(e, { name, value }) => setTitleInput(value)}
              />
              <Form.Button
                width={2}
                style={{
                  height: "100%",
                  margin: "0px",
                  backgroundColor: "#296deb",
                  color: "white",
                  width: "100% ",
                }}
                content="Add"
              />
              <Form.Button
                width={2}
                color="black"
                onClick={() => setOpen(false)}
                style={{
                  height: "100%",
                  width: "100% ",
                  color: "white",
                }}
                content="Nope"
              />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions></Modal.Actions>
    </Modal>
  );
};

export default CreateBoardModal;
