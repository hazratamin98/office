import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { isValidToken, setSession } from "../utils/jwt";
// import api from "../utils/axios";
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
const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";
const EDIT_PROFILE = "EDIT_PROFILE";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const SET_LOADING = "SET_LOADING";
const SET_SUCCESS = "SET_SUCCESS";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  isLoading: false,
  isSuccess: false,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        // isAuthenticated: action.payload.isAuthenticated,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case SET_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        console.log({ accessToken });
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };
          const response = await api.get("/user/me", config);
          const user = await response.data.data;
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);
  const signIn = async (email, password) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await api.post("/user/login", { email, password });
      const { token, user } = await response.data;
      console.log({ token });
      setSession(token);
      dispatch({
        type: SIGN_IN,
        payload: {
          user,
        },
      });
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });

      console.log(error);
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, firstName, lastName, companyName) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await api.post("/user/signup", {
        name: firstName + " " + lastName,
        email,
        password,
        firstName,
        lastName,
        companyName,
      });
      if (response.status === 200) {
        const { token, user } = await response.data;
        window.localStorage.setItem("accessToken", token);
        dispatch({
          type: SIGN_UP,
          payload: {
            user,
            state,
          },
        });
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
        dispatch({
          type: SET_SUCCESS,
          payload: {
            isSuccess: true,
          },
        });
      } else {
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
            isAuthenticated: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: SIGN_UP,
        payload: {
          user: error?.response?.data,
          isAuthenticated: false,
        },
      });
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });

      console.log(error);
    }
  };
  const changePassword = async (oldPassword, newPassword) => {
    var accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    var body = { oldPassword, newPassword };

    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await api.post("/auth/change-password", body, config);
      if (response.status === 200) {
        const { user, token } = await response.data;
        window.localStorage.setItem("accessToken", token);
        dispatch({
          type: CHANGE_PASSWORD,
          payload: {
            user: user,
          },
        });
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
      } else {
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });
      dispatch({
        type: CHANGE_PASSWORD,
        payload: {
          user: error.response.data,
        },
      });
      console.log(error);
    }
  };
  const resetPassword = async (email) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await api.post("/auth/forgot-password", { email });
      if (response.status === 200) {
        const { token } = await response.data;
        window.localStorage.setItem("accessToken", token);
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  };
  const setPassword = async (password) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      var token = localStorage.getItem("accessToken");
      const response = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });
      if (response.status === 200) {
        // const { status, data } = await response.data;

        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });
    }
  };
  const editProfile = async (email, firstName, lastName) => {
    var accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    dispatch({
      type: SET_LOADING,
      payload: {
        isLoading: true,
      },
    });
    try {
      const response = await axios.patch(
        `/user/${state?.user?.id}`,
        {
          email,
          firstName,
          lastName,
        },
        config
      );
      if (response.status === 200) {
        let user = await response.data.data;
        dispatch({
          type: EDIT_PROFILE,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: SET_LOADING,
          payload: {
            isLoading: false,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: SET_LOADING,
        payload: {
          isLoading: false,
        },
      });
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
        setPassword,
        changePassword,
        editProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
