import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";

const initialState = {
  data: [],
  isPending: "",
  isSuccess: "",
  message: "",
  loading: false,
};
export const locationForm = createAsyncThunk(
  "location/locationData",
  async (
    {
      name,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      telephone,
      website,
      externalReference,
    },
    { rejectWithValue }
  ) => {
    try {
      // const { addressOne, addressTwo } = args;
      // const res = await api.post("location", {
      //   body: {
      //     name,
      //     addressLine1,
      //     addressLine2,
      //     postalCode,
      //     city,
      //     telephone,
      //     website,
      //     externalReference,
      //   },
      // });
      // console.log("thunk call data", res.data);
    } catch (error) {
      // console.log("Thunk error", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: {
    [locationForm.pending]: (state, action) => {
      state.loading = true;
    },
    [locationForm.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [locationForm.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isSuccess = false;
    },
  },
});

// export const selectCount = (state) => state.counter.value;

export default locationSlice.reducer;
