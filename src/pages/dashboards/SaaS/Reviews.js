import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useParams } from "react-router-dom";

import { spacing } from "@mui/system";
import { orange, green, blue } from "@mui/material/colors";
import { Add as AddIcon } from "@mui/icons-material";
import BasicRating from "./Rating";
const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};

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
  margin-top: ${(props) => props.theme.spacing(-7)};
`;

const TaskComment = styled.div`
  width: 100%;
  border-radius: 6px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const TaskReviewLink = styled.div`
  border-radius: 6px;
  display: flex;
  position: absolute;
  margin-right: ${(props) => props.theme.spacing(4)};
  right: ${(props) => props.theme.spacing(0)};
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

const TaskSource = styled.div`
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

const Task = ({ item }) => {
  return (
    <TaskWrapper mb={4}>
      <TaskWrapperContent>
        <TaskTitle variant="body1" gutterBottom>
          Reviewer : {item.reviewer.firstName + item.reviewer.lastName}
        </TaskTitle>
        <TaskDate variant="body1" gutterBottom>
          {item.responseDate}
        </TaskDate>
        <TaskSatisfaction>
          <Rating
            name="half-rating"
            defaultValue={item.rating}
            precision={0.5}
            readOnly
          />
        </TaskSatisfaction>

        <TaskComment>{item.comments}</TaskComment>

        <TaskSource>Source : {item.sourceType}</TaskSource>

        <TaskReviewLink>
          <a
            href={item.reviewURL ? item.reviewURL : item.reviewUrl}
            target="_blank"
          >
            Go to review
          </a>
        </TaskReviewLink>
      </TaskWrapperContent>
    </TaskWrapper>
  );
};

const containers = [];

function Reviews() {
  const [reviews, setReviews] = useState([]);
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onContainerReady = (container) => {
    containers.push(container);
  };

  const getAllReviews = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/location/review-dashboard/${id}`,
        config
      );
      if (res.status == 200) {
        setReviews(res.data.data);
        setIsLoading(false);
        console.log("allReviews", res.data.data);
        // setLoading(false);
        // setIsError(true);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      // setAllReviews(error);
    }
  };
  useEffect(() => {
    dragula(containers);
    setIsLoading(true);

    getAllReviews();
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Tasks" />
      <Typography variant="h3" gutterBottom display="inline">
        Reviews List
      </Typography>
      {isLoading === true ? (
        <>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={12} xl={12}>
              {reviews &&
                reviews.recentReviews?.map((review) => (
                  <Task
                    key={review.reviewId}
                    item={review}
                    // avatars={review.sourceType}
                  />
                ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography>Loading</Typography>
        </>
      )}
    </React.Fragment>
  );
}

export default Reviews;
