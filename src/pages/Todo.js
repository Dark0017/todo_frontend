import React, { useState } from "react";
import {
  Container,
  Grid,
  Header,
  Menu,
  Form,
  Button,
  Icon,
  Input,
} from "semantic-ui-react";
import TaskItem from "../components/TaskItem";
import { useForm } from "react-hook-form";
import TaskCard from "../components/TaskCard";
import CreateBoardModal from "../components/CreateBoardModal";

const Todo = () => {
  const [boards, setBoards] = useState([
    { id: "01", title: "board1" },
    { id: "02", title: "board2" },
    { id: "03", title: "board3" },
  ]);
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Dance",
      description: "dance for 5 min",
      isComplete: false,
    },
    {
      id: "2",
      title: "Sleep",
      description: "slep for 5 hrs",
      isComplete: true,
    },
  ]);
  const [activeBoard, setActiveBoard] = useState(boards[0]);
  const [activeTask, setActiveTask] = useState(tasks[0]);
  const [taskInput, setTaskInput] = useState("");
  const [editableBoard, setEditableBoard] = useState(false);
  const [editBoardState, setEditBoardState] = useState("");

  const { handleSubmit } = useForm();

  //add Task function
  const addTask = () => {
    const temp = {
      boardId: activeBoard?.id,
      title: taskInput,
      description: "",
    };
    createTask(temp);
  };

  //add Task api call + retrieval
  const createTask = (task) => {
    //save to DB
    console.log(task);

    //update redux
    //setTasks([...tasks.concat([task])]);
  };

  //delete board api call
  const deleteBoard = (boardId) => {
    //update db
    console.log("Deleted", boardId);

    //delete tasks
    //delete boards

    //update redux
    setBoards([
      ...boards.filter((board) => {
        if (board.id !== boardId) return true;
        else return false;
      }),
    ]);
  };

  //editBoard Function
  const editBoard = () => {
    const temp = {
      id: activeBoard?.id,
      title: editBoardState,
    };

    updateBoard(temp);
  };

  //editBoard API call
  const updateBoard = (board) => {
    //update db
    console.log(board);
    setEditableBoard(!editableBoard);

    //update redux
  };
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

        //overflow: "scroll",
      }}
    >
      <Header as="h1" style={{ paddingTop: "30px", width: "100%" }}>
        To-Do App
      </Header>
      <Menu tabular collapsing style={{ width: "100%" }}>
        {boards.map((board, idx) => (
          <Menu.Item
            id={idx}
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
              onClick={() => deleteBoard(board.id)}
            >
              <Icon name="delete" />
            </Button>
          </Menu.Item>
        ))}
        <CreateBoardModal boards={boards} setBoards={setBoards} />
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
                    tasks={tasks}
                    setTasks={setTasks}
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
                  onClick={() => editBoard()}
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
            {tasks.map(
              (task) =>
                task.isComplete && (
                  <TaskItem
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    setActiveTask={setActiveTask}
                  />
                )
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Todo;
