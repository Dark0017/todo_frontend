import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoards,
  selectBoards,
  selectBoardStatus,
  editBoard,
  deleteBoard,
} from "../features/board/boardSlice";
import {
  createTodo,
  getTodos,
  selectTodos,
  selectTodoStatus,
} from "../features/todo/todoSlice";
import {
  Container,
  Grid,
  Header,
  Menu,
  Form,
  Button,
  Icon,
  Input,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import TaskItem from "../components/TaskItem";
import { useForm } from "react-hook-form";
import TaskCard from "../components/TaskCard";
import CreateBoardModal from "../components/CreateBoardModal";

const Todo = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards);
  const tasks = useSelector(selectTodos);
  const taskStatus = useSelector(selectTodoStatus);
  const boardStatus = useSelector(selectBoardStatus);
  const [activeBoard, setActiveBoard] = useState({ id: 0, title: "default" });
  const [activeTask, setActiveTask] = useState({
    id: 0,
    boardId: 0,
    title: "default",
    description: "default",
  });
  const [taskInput, setTaskInput] = useState("");
  const [editableBoard, setEditableBoard] = useState(false);
  const [editBoardState, setEditBoardState] = useState("");

  const { handleSubmit } = useForm();

  const addTask = () => {
    const temp = {
      boardId: activeBoard?.id,
      title: taskInput,
      description: "",
    };
    dispatch(createTodo({ body: temp }));
  };

  const removeBoard = (boardId) => {
    dispatch(deleteBoard({ id: boardId }));
  };

  const updateBoard = () => {
    const temp = {
      id: activeBoard?.id,
      body: { title: editBoardState },
    };
    dispatch(editBoard(temp));
    setEditableBoard(!editableBoard);
  };

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  useEffect(() => {
    setActiveBoard(boards[0]);
  }, [boards]);

  useEffect(() => {
    setActiveTask(tasks[0]);
  }, [tasks]);

  useEffect(() => {
    if (activeBoard) {
      setEditBoardState(activeBoard?.title);
      dispatch(getTodos({ boardId: activeBoard?.id }));
    }
  }, [activeBoard, dispatch]);
  return (
    <Container
      style={{
        width: "75vw",
        height: "100vh",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "hidden",
        padding: "10px",
      }}
    >
      <Dimmer active={taskStatus === "pending" || boardStatus === "pending"}>
        <Loader />
      </Dimmer>
      <Header as="h1" style={{ paddingTop: "30px", width: "100%" }}>
        To-Do App
      </Header>
      <Menu tabular style={{ width: "100%" }}>
        {boards.map((board, idx) => (
          <Menu.Item
            key={board.id}
            active={activeBoard?.id === board.id}
            onClick={() => setActiveBoard(board)}
          >
            {board.title}
            <Button
              size="mini"
              icon
              style={{
                backgroundColor: "transparent",
                padding: "0px 0px 0px 0px",
                marginLeft: "15px",
              }}
              onClick={() => removeBoard(board.id)}
            >
              <Icon name="delete" />
            </Button>
          </Menu.Item>
        ))}
        <CreateBoardModal boards={boards} />
      </Menu>
      <Grid style={{ height: "100%", overflowY: "scroll" }} divided>
        <Grid.Row style={{ padding: "10px 5px 10px 5px" }}>
          <Grid.Column width={5}>
            <Header as="h3">New Tasks</Header>
            {tasks.map(
              (task) =>
                !task.isComplete && (
                  <TaskItem
                    task={task}
                    setActiveTask={setActiveTask}
                    key={task.id}
                  />
                )
            )}
          </Grid.Column>
          <Grid.Column width={6} style={{ height: "100%" }}>
            <Header
              as="h3"
              style={{
                height: "25px",
              }}
            >
              {editableBoard ? (
                <Input
                  placeholder={"Edit board name"}
                  value={editBoardState}
                  onChange={(e, { name, value }) => setEditBoardState(value)}
                  style={{
                    height: "25px",
                  }}
                />
              ) : (
                activeBoard?.title + " View"
              )}
              {editableBoard ? (
                <Button
                  size="mini"
                  icon
                  style={{
                    backgroundColor: "transparent",
                    padding: "0px 0px 0px 0px",
                    marginLeft: "15px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => updateBoard()}
                >
                  <Icon name="check" />
                </Button>
              ) : (
                <Button
                  size="mini"
                  icon
                  style={{
                    backgroundColor: "transparent",
                    padding: "0px 0px 0px 0px",
                    marginLeft: "15px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => setEditableBoard(!editableBoard)}
                >
                  <Icon name="pencil" />
                </Button>
              )}
            </Header>
            <Form
              onSubmit={handleSubmit(addTask)}
              style={{
                width: "100%",
                marginLeft: "0px",
                marginRight: "0px",
              }}
            >
              <Form.Group width={16}>
                <Form.Input
                  width={12}
                  placeholder="Add task"
                  name="inputTask"
                  value={taskInput}
                  onChange={(e, { name, value }) => setTaskInput(value)}
                />
                <Form.Button
                  width={4}
                  style={{
                    height: "100%",
                    margin: "0px",
                    backgroundColor: "#296deb",
                    color: "white",
                  }}
                  content="Add"
                />
              </Form.Group>
            </Form>
            <TaskCard activeTask={activeTask} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h3">Completed Tasks</Header>
            {tasks?.map(
              (task) =>
                task.isComplete && (
                  <TaskItem task={task} setActiveTask={setActiveTask} />
                )
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Todo;
