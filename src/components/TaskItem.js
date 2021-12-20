import React from "react";
import { Button, Grid, Checkbox, Icon } from "semantic-ui-react";

const TaskItem = ({ task, setTasks, tasks, setActiveTask }) => {
  return (
    <Grid columns={3}>
      <Grid.Row
        as="flex"
        style={{
          "flex-direction": "row",
          "justify-content": "flex-start",
          "align-items": "center",
          borderBottom: "1px solid #f3f3f3",
          marginRight: "25px",
          paddingRight: "10px",
        }}
        key={task.id}
      >
        <Grid.Column style={{ width: "35px" }}>
          <Checkbox
            style={{
              width: "15px",
              margin: "0px 0px 0px 0px",
              display: task.isComplete ? "None" : "flex",
            }}
            onClick={() => {
              setTasks(
                [...tasks].map((obj) => {
                  if (obj.id === task.id) return { ...obj, isComplete: true };
                  else return obj;
                })
              );
            }}
          />
        </Grid.Column>
        <Grid.Column style={{ width: "80px" }}>
          <Button
            as="h3"
            style={{
              backgroundColor: "transparent",
              padding: "0px 0px 0px 0px",
              textAlign: "center",
            }}
            onClick={() => setActiveTask(task)}
          >
            {task.title}
          </Button>
        </Grid.Column>
        <Grid.Column style={{ width: "17px", marginLeft: "auto" }}>
          <Button
            size="mini"
            icon
            style={{
              color: "red",
              backgroundColor: "transparent",
              width: "23px",
              padding: "0px 0px 6px 0px",
            }}
          >
            <Icon name="delete" circular />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TaskItem;
