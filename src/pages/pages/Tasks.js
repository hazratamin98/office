import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MessageCircle } from "react-feather";
import dragula from "dragula";

import "react-dragula/dist/dragula.css";

import {
  Avatar,
  AvatarGroup as MuiAvatarGroup,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Box,
  Typography as MuiTypography,
} from "@mui/material";
import Rating from "@mui/material/Rating";

import { spacing } from "@mui/system";
import { orange, green, blue } from "@mui/material/colors";
import { Add as AddIcon } from "@mui/icons-material";
import BasicRating from "../dashboards/SaaS/Rating";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  display: inline-flex;
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

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

const MessageCircleIcon = styled(MessageCircle)`
  color: ${(props) => props.theme.palette.grey[500]};
  vertical-align: middle;
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

const Typography = styled(MuiTypography)(spacing);

const TaskTitle = styled(Typography)`
  font-weight: 600;
  font-size: 15px;
  margin-right: ${(props) => props.theme.spacing(10)};
`;

const Lane = ({ title, description, onContainerLoaded, children }) => {
  const handleContainerLoaded = (container) => {
    if (container) {
      onContainerLoaded(container);
    }
  };

  return (
    <Card mb={6}>
      <CardContent pb={0}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" mb={4}>
          {description}
        </Typography>
        <div ref={handleContainerLoaded}>{children}</div>
      </CardContent>
    </Card>
  );
};

const Task = ({ content, avatars }) => {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <TaskTitle variant="body1" gutterBottom>
          {content.title}
        </TaskTitle>
        <TaskDate variant="body1" gutterBottom>
          {content.date}
        </TaskDate>
        <TaskSatisfaction>{content.satisfaction}</TaskSatisfaction>

        <TaskComment>{content.comment}</TaskComment>

        <TaskBadge variant="body1" gutterBottom>
          <Rating
            name="half-rating"
            defaultValue={content.rating}
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

        <TaskReviewLink>{content.reviewLink}</TaskReviewLink>
        <TaskReportLink>{content.reportLink}</TaskReportLink>
      </TaskWrapperContent>
    </TaskWrapper>
  );
};

const demoTasks = [
  {
    title: "Posted by Nichloas Gerber",
    satisfaction: "100%",
    comment: "overhyped",
    description: <BasicRating />,
    rating: 5,
    reviewLink: <Link to="overview">Go to review</Link>,
    reportLink: <Link to="overview">report issue</Link>,
    date: "Tue April 26 2022 at 2:20pm",
  },
  {
    title: "Posted by Kashif",
    satisfaction: "40%",
    comment: "overhyped",
    rating: 4,
    description: <BasicRating />,
    reviewLink: <Link to="overview">Go to review</Link>,
    reportLink: <Link to="overview">report issue</Link>,
    date: "Tue April 26 2022 at 2:20pm",
  },
  {
    title: "Posted by Qasim",
    satisfaction: "30%",
    comment: "overhyped",
    rating: 4,
    description: <BasicRating />,
    reviewLink: <Link to="overview">Go to review</Link>,
    reportLink: <Link to="overview">report issue</Link>,
    date: "Tue April 26 2022 at 2:20pm",
  },
  {
    title: "Posted by Uzair",
    satisfaction: "50%",
    comment: "overhyped",
    rating: 5,
    description: <BasicRating />,
    reviewLink: <Link to="overview">Go to review</Link>,
    reportLink: <Link to="overview">report issue</Link>,
    date: "Tue April 26 2022 at 2:20pm",
  },
  {
    title: "Posted by Abu baker",
    satisfaction: "70%",
    comment: "overhyped",
    rating: 1,
    description: <BasicRating />,
    reviewLink: <Link to="overview">Go to review</Link>,
    reportLink: <Link to="overview">report issue</Link>,
    date: "Tue April 26 2022 at 2:20pm",
  },
];

const containers = [];

function Tasks() {
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
          <Lane
            title="Backlog"
            description="Nam pretium turpis et arcu. Duis arcu."
            onContainerLoaded={onContainerReady}
          >
            <Task content={demoTasks[0]} avatars={[1, 2, 3, 4]} />
            <Task content={demoTasks[2]} avatars={[2]} />
            <Task content={demoTasks[3]} avatars={[2, 3]} />
            <Task content={demoTasks[1]} avatars={[2]} />
            <Task content={demoTasks[4]} avatars={[4]} />
          </Lane>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Tasks;
