import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

import { JWTContextType, ActionMap, AuthState, AuthUser } from "../types/auth";

import axios from "axios";

import { isValidToken, setSession } from "../utils/jwt";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";
const EDIT_PROFILE = "EDIT_PROFILE";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const LOADER = "LOADER";
const SET_LOADING = "SET_LOADING";
type AuthActionTypes = {
  [SET_LOADING]: {
    isLoading: boolean;
  };
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [SIGN_IN]: {
    user: AuthUser;
  };

  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser;
  };
  [EDIT_PROFILE]: {
    user: AuthUser;
  };
  [CHANGE_PASSWORD]: {
    user: AuthUser;
  };
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  user: null,
};

const JWTReducer = (
  state: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        isLoading: false,
        user: action.payload.user,
      };
    case SIGN_IN:
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
        // isLoading: false,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };
          const response = await axios.get(
            "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/user/me",
            config
          );
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

  const signIn = async (email: string, password: string) => {
    const response = await axios.post(
      "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/user/login",
      { email, password }
    );
    const { token, user } = await response.data;
    setSession(token);
    dispatch({
      type: SIGN_IN,
      payload: {
        user,
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    await axios
      .post("http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/user/signup", {
        name: firstName + " " + lastName,
        email,
        password,
        firstName,
        lastName,
      })
      .then(async (response) => {
        const { token, user } = await response.data;
        window.localStorage.setItem("accessToken", token);
        dispatch({
          type: SIGN_UP,
          payload: {
            user,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_UP,
          payload: {
            user: error.response.data,
          },
        });
      });
  };
  const changePassword = async (oldPassword: string, newPassword: string) => {
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
    // axios
    //   .post(
    //     "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/auth/change-password",
    //     body,
    //     config
    //   )
    //   .then(async (response) => {
    //     const { token } = await response.data;
    //     window.localStorage.setItem("accessToken", token);
    //   })
    //   .catch((error) => {
    //     console.log("hassan", error.response.data.message);
    //     dispatch({
    //       type: CHANGE_PASSWORD,
    //       payload: {
    //         user: error.response.data,
    //       },
    //     });
    //   });
    try {
      const response = await axios.post(
        "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/auth/change-password",
        body,
        config
      );
      if (response.status == 200) {
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
    } catch (error: any) {
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
  const resetPassword = async (email: string) => {
    const response = await axios.post(
      "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/auth/forgot-password",
      { email }
    );
    const { token } = await response.data;
    window.localStorage.setItem("accessToken", token);
  };
  const setPassword = async (password: string) => {
    var token = localStorage.getItem("accessToken");
    const response = await axios.post(
      "http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/auth/reset-password",
      {
        token,
        newPassword: password,
      }
    );

    const { status, data } = await response.data;
  };
  console.log("users", state);

  const editProfile = async (
    email: string,
    firstName: string,
    lastName: string
  ) => {
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
    // console.log(state.user);
    try {
      const response = await axios.patch(
        `http://ec2-35-165-226-126.us-west-2.compute.amazonaws.com/api/v1/user/${state?.user?.id}`,
        {
          email,
          firstName,
          lastName,
        },
        config
      );
      if (response.status == 200) {
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
    } catch (error: any) {
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
