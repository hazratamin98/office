import { useContext } from "react";
import { SeoKeywordContext } from "../contexts/SeoKeywordContext";

const useSeoQuery = () => useContext(SeoKeywordContext);

export default useSeoQuery;
