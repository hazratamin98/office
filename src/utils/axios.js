import "dotenv/config";
import { getToken } from "../utils/jwt";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({ baseURL: baseURL });

export default axiosInstance;
