import React, { useContext } from "react";
import KeywordSearch from "./KeywordSearch";
import {
  KeywordSearchContext,
  KeywordSearchProvider,
} from "./navbar/context/KeywordSearchContext";

function Default() {
  return (
    <KeywordSearchProvider>
      <KeywordSearch></KeywordSearch>
    </KeywordSearchProvider>
  );
}

export default Default;
