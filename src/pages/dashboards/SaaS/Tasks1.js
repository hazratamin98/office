import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import dragula from "dragula";
import { Link } from "react-router-dom";
import "react-dragula/dist/dragula.css";

import {
  Avatar,
  AvatarGroup as MuiAvatarGroup,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from "@mui/material";
import Rating from "@mui/material/Rating";

import { spacing } from "@mui/system";

const AvatarGroup = styled(MuiAvatarGroup)`
  display: inline-flex;
`;

const TaskWrapper = styled(Card)`
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  margin-bottom: ${(props) => props.theme.spacing(4)};
  cursor: grab;

  &:hover {
    background: ${(props) => props.theme.palette.background.default};
  }
`;

const TaskWrapperContent = styled(CardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const TaskAvatars = styled.div`
  margin-top: ${(props) => props.theme.spacing(1)};
`;

const TaskDate = styled.div`
  border-radius: 6px;
  text-align: right;
  display: flex;
  position: absolute;
  right: ${(props) => props.theme.spacing(4)};
  margin-top: ${(props) => props.theme.spacing(0)};
`;

const TaskComment = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 6px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const TaskReviewLink = styled.div`
  border-radius: 6px;
  display: flex;
  position: absolute;
  margin-right: ${(props) => props.theme.spacing(30)};
  right: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  bottom: ${(props) => props.theme.spacing(1)};
`;

const TaskReportLink = styled.div`
  border-radius: 6px;
  text-align: right;
  display: flex;
  position: absolute;
  right: ${(props) => props.theme.spacing(4)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
  bottom: ${(props) => props.theme.spacing(1)};
`;

const TaskSatisfaction = styled.div`
  color: red;
  width: 40px;
  height: 20px;
  border-radius: 6px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const TaskBadge = styled.div`
  width: 40px;
  height: 6px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: ${(props) => props.theme.spacing(6)};
`;

const TaskTitle = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  margin-right: ${(props) => props.theme.spacing(10)};
`;

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Lane = ({ onContainerLoaded, children, id, comment }) => {
  console.log("tttt", id);
  const handleContainerLoaded = (container) => {
    if (container) {
      onContainerLoaded(container);
    }
  };

  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <div ref={handleContainerLoaded}>{children}</div>
      </CardContent>
    </Card>
  );
};

const Task = ({ item, avatars }) => {
  console.log("Task");
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <TaskTitle variant="body1" gutterBottom>
          {item.title}
        </TaskTitle>
        <TaskDate variant="body1" gutterBottom>
          {item.date}
        </TaskDate>
        <TaskSatisfaction>{item.satisfaction}</TaskSatisfaction>

        <TaskComment>{item.comment}</TaskComment>

        <TaskBadge variant="body1" gutterBottom>
          <Rating
            name="half-rating"
            defaultValue={item.rating}
            precision={0.5}
            readOnly
          />
        </TaskBadge>
        {/* {content.description &&
          content.description.map((description, i) => (
            <TaskBadge key={i}>{description}</TaskBadge>
          ))} */}

        <TaskAvatars>
          <AvatarGroup max={3}>
            {avatars &&
              avatars.map((avatar, i) => (
                <Avatar
                  src={`/static/img/avatars/avatar-${avatar}.jpg`}
                  key={i}
                />
              ))}
          </AvatarGroup>
        </TaskAvatars>

        <TaskReviewLink>
          <Link to={item.reviewLink}>Go to review</Link>
        </TaskReviewLink>

        <TaskReportLink>
          <Link to={item.reportLink}>report issue</Link>
        </TaskReportLink>
      </TaskWrapperContent>
    </TaskWrapper>
  );
};

const demoTasks = [
  {
    id: 0,
    title: "Posted by Nichloas Gerber",
    satisfaction: "100%",
    comment: "overhyped",
    rating: 5,
    reviewLink: "overview",
    reportLink: "overview",
    date: "Tue April 26 2022 at 2:20pm",
    avatar: [2],
  },
  {
    id: 1,
    title: "Posted by Kashif",
    satisfaction: "40%",
    comment: "overhyped",
    rating: 4,
    reviewLink: "overview",
    reportLink: "overview",
    date: "Tue April 26 2022 at 2:20pm",
    avatar: [2, 5],
  },
  {
    id: 2,
    title: "Posted by Qasim",
    satisfaction: "30%",
    comment: "overhyped",
    rating: 4,
    reviewLink: "overview",
    reportLink: "overview",
    date: "Tue April 26 2022 at 2:20pm",
    avatar: [1, 3],
  },
  {
    id: 3,
    title: "Posted by Uzair",
    satisfaction: "50%",
    comment: "overhyped",
    rating: 5,
    reviewLink: "overview",
    reportLink: "overview",
    date: "Tue April 26 2022 at 2:20pm",
    avatar: [4],
  },
  {
    id: 4,
    title: "Posted by Abu baker",
    satisfaction: "70%",
    comment: "overhyped",
    rating: 1,
    reviewLink: "overview",
    reportLink: "overview",
    date: "Tue April 26 2022 at 2:20pm",
    avatar: [1, 3, 5],
  },
];

const containers = [];

function Tasks() {
  console.log("Tasks");
  const onContainerReady = (container) => {
    containers.push(container);
  };

  useEffect(() => {
    dragula(containers);
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Tasks" />
      <Typography variant="h3" gutterBottom display="inline">
        Reviews List
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={12} xl={12}>
          <Lane onContainerLoaded={onContainerReady}>
            {demoTasks.map((item) => (
              <Task key={item.id} item={item} avatars={item.avatar} />
            ))}
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Tasks;
