import { useState, createContext } from "react";
const KeywordSearchContext = createContext(null);

const KeywordSearchProvider = ({ children }) => {
  const [country, setCountry] = useState("us");
  const [language, setLanguage] = useState("en");
  const [keywords, setKeywords] = useState("");
  const [keywordData, setKeywordData] = useState(null);
  const handleChangeCountry = (country) => {
    setCountry(country);
  };
  const handleChangeKeywords = (keyword) => {
    setKeywords(keyword);
  };
  const handleChangeLanguage = (language) => {
    setLanguage(language);
  };
  const handleChangeKeywordData = (data) => {
    setKeywordData(data);
  };
  return (
    <KeywordSearchContext.Provider
      value={{
        country,
        language,
        keywords,
        keywordData,
        handleChangeCountry,
        handleChangeLanguage,
        handleChangeKeywords,
        handleChangeKeywordData,
      }}
    >
      {children}
    </KeywordSearchContext.Provider>
  );
};
export { KeywordSearchContext, KeywordSearchProvider };
