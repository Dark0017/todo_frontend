import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Grid,
  Header,
  Segment,
  Button,
  Icon,
  Input,
  TextArea,
} from "semantic-ui-react";
import { editTodo } from "../features/todo/todoSlice";
const TaskCard = ({ activeTask }) => {
  const [editable, setEditable] = useState(false);
  const [titleState, setTitleState] = useState(activeTask?.title);
  const [descState, setDescState] = useState(activeTask?.description);

  const dispatch = useDispatch();
  const updateTodo = () => {
    const temp = {
      title: titleState?titleState:"",
      description: descState?descState:"",
    };
    dispatch(
      editTodo({ boardId: activeTask.boardId, id: activeTask.id, body: temp })
    );
    setEditable(false);
  };

  useEffect(() => {
    setTitleState(activeTask?.title);
    setDescState(activeTask?.description);
  }, [activeTask]);
  return (
    <Segment style={{ textAlign: "left" }}>
      <Grid>
        {activeTask && (
          <Grid.Row
            columns={2}
            style={{
              borderBottom: "1px solid #e2e2e2",
              padding: "5px 0px 5px 0px",
            }}
          >
            <Grid.Column as="h4" style={{ height: "25px", width: "30px" }}>
              {editable ? (
                <Input
                  placeholder={activeTask?.title}
                  style={{
                    height: "25px",
                  }}
                  value={titleState}
                  onChange={(e, { name, value }) => setTitleState(value)}
                />
              ) : (
                activeTask?.title
              )}
            </Grid.Column>
            <Grid.Column
              style={{
                textAlign: "right",
                color: activeTask?.isComplete ? "green" : "red",
              }}
            >
              {activeTask?.isComplete ? "Completed" : "Incomplete"}
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
      <Header as="h5" style={{ textAlign: "left" }}>
        Description:
      </Header>
      {editable ? (
        <TextArea
          placeholder={activeTask?.description}
          style={{
            height: "100%",
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
          }}
          value={descState}
          onChange={(e, { name, value }) => setDescState(value)}
        />
      ) : (
        activeTask?.description
      )}
      <Grid style={{ height: "55px", marginTop: "-5px" }}>
        <Grid.Row style={{ height: "55px" }}>
          <Grid.Column width={8}>
            <Button
              size="mini"
              icon
              style={{
                padding: "0px 0px 0px 0px",
                width: "100%",
                height: "100%",
              }}
              color="blue"
              onClick={() => setEditable(!editable)}
            >
              <Icon name="pencil alternate" />
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            {editable && (
              <Button
                size="mini"
                icon
                style={{
                  padding: "0px 0px 0px 0px",
                  width: "100%",
                  height: "100%",
                }}
                color="green"
                onClick={() => updateTodo()}
              >
                <Icon name="check" />
              </Button>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default TaskCard;
