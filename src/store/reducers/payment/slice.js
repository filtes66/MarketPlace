import { createSlice } from "@reduxjs/toolkit";
//import initialState from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder } from "../../../api/api.js";

export const saveOrder = createAsyncThunk("payment/saveOrder", async (order, thunkAPI) => {
    try {
        const response = await addOrder(order);
        return order;
    } catch (err) {
        thunkAPI.rejectWithValue(err.message);
    }
})

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(saveOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLoading = false;
        });
        builder.addCase(saveOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default paymentSlice.reducer;
