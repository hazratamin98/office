import React from "react";

const initialState = {
  keyword: "",
  language: "en",
  country: "us",
};
const SeoKeywordContext = React.createContext(initialState);

function ThemeProvider({ children }) {
  const initialState = () => {
    return initialState;
  };
  const [seoQuery, _setSeoQuery] = React.useState(initialState);

  const setSeoQuery = ({ params }) => {
    _setSeoQuery(params);
  };

  return (
    <SeoKeywordContext.Provider value={{ seoQuery, setSeoQuery }}>
      {children}
    </SeoKeywordContext.Provider>
  );
}

export { ThemeProvider, SeoKeywordContext };
