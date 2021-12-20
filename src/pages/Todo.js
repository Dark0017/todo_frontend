import React, { useState } from "react";
import {
  Container,
  Grid,
  Header,
  Menu,
  Form,
  Button,
  Icon,
} from "semantic-ui-react";
import TaskItem from "../components/TaskItem";
import { useForm } from "react-hook-form";
import TaskCard from "../components/TaskCard";

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
  const [activeBoard, setActiveBoard] = useState("default");
  const [activeTask, setActiveTask] = useState(tasks[0]);
  const [taskInput, setTaskInput] = useState("");

  const { handleSubmit } = useForm();
  const onSubmit = () => addTask();

  const addTask = (title) => {
    const temp = {
      id: (tasks.length + 1).toString(),
      title: taskInput,
      description: "",
      isComplete: false,
    };
    createTask(temp);
  };
  const createTask = (task) => {
    //save to DB
    setTasks([...tasks.concat([task])]);
  };

  const deleteBoard = (boardId) => {
    //delete tasks
    //delete boards

    setBoards([
      ...boards.filter((board) => {
        if (board.id !== boardId) return true;
        else return false;
      }),
    ]);
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Header as="h1" style={{ marginTop: "30px" }}>
        To-Do App
      </Header>
      <Menu tabular collapsing>
        <Menu.Item
          name="default"
          active={activeBoard === "default"}
          onClick={() => setActiveBoard("default")}
        />
        {boards.map((board, idx) => (
          <Menu.Item
            id={idx}
            active={activeBoard === board.title}
            onClick={() => setActiveBoard(board.title)}
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
        <Button icon style={{ padding: "0px", backgroundColor: "transparent" }}>
          <Icon name="plus" />
        </Button>
      </Menu>
      <Grid style={{ height: "100%" }} divided>
        <Grid.Row>
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
                  />
                )
            )}
          </Grid.Column>
          <Grid.Column width={6}>
            <Header as="h3">{activeBoard} View</Header>
            <Form
              onSubmit={handleSubmit(onSubmit)}
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
