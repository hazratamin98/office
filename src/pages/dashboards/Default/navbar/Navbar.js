import React, { useContext } from "react";
import styled, { withTheme } from "styled-components/macro";
import { darken } from "polished";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import {
  Grid,
  InputBase,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Button as MuiButton,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { spacing } from "@mui/system";

import { Menu as MenuIcon } from "@mui/icons-material";

import NavbarCountryDropdown from "./NavbarCountryDropdown";
import NavbarLanguagesDropdown from "./NavbarLanguagesDropdown";
import { KeywordSearchContext } from "./context/KeywordSearchContext";
const Button = styled(MuiButton)(spacing);
const baseURL = process.env.REACT_APP_BASE_URL;

const accessToken = window.localStorage.getItem("accessToken");
const config = {
  headers: { Authorization: `Bearer ${accessToken}` },
};
const api = axios.create({
  baseURL,
  responseType: "json",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "x-csrfoken",
  headers: { Authorization: `Bearer ${accessToken}` },
});
const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;
const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)};
    padding-right: ${(props) => props.theme.spacing(2.5)};
    padding-bottom: ${(props) => props.theme.spacing(2.5)};
    padding-left: ${(props) => props.theme.spacing(12)};
    width: 250px;
  }
`;
const Navbar = ({ onDrawerToggle, callSERankingAPI }) => {
  const [isLaoding, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t } = useTranslation();
  const {
    language,
    country,
    keywords,
    keywordData,
    handleChangeKeywords,
    handleChangeKeywordData,
  } = useContext(KeywordSearchContext);

  const handleKeywordChange = (event) => {
    // i18n.changeLang{uage(language);
    console.log("new", event.target.value);
    handleChangeKeywords(event.target.value);
  };
  const handleSearchClick = async () => {
    console.log({ language, country, keywords, keywordData });
    if (keywords != "") {
      try {
        setIsLoading(true);
        const res = await api.post(`seo/analyze-keywords/`, {
          keywords: [keywords],
          source: country,
          filter: "keyword",
        });
        if (res.status == 200) {
          console.log(res.data);
          setIsLoading(false);

          handleChangeKeywordData(res.data.data);
        }
      } catch (error) {
        setIsLoading(false);

        console.log("error", { error });
      }
    }
  };
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input
                  placeholder={t("SearchKeyword")}
                  onChange={(event) => handleKeywordChange(event)}
                />
              </Search>
            </Grid>
            <Grid item xs>
              <LoadingButton
                variant="contained"
                color="secondary"
                mr={5}
                loading={isLaoding}
                onClick={() => {
                  handleSearchClick();
                }}
              >
                Search
              </LoadingButton>
            </Grid>
            <Grid item>
              Country:
              <NavbarCountryDropdown />
              Language:
              <NavbarLanguagesDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginTop: "60px",
        }}
      ></Typography>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
