import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Realm from "realm-web";
import { addUser, getUser } from "../../../api/api";
import { app } from "../../../api/realm";

export const signup = createAsyncThunk(
    'user/registration',
    async (newUser, thunkAPI) => {
        const userProfile = {
            ...newUser,
            password: undefined,
            //  confirm_password: undefined,
        };
        try {
            await app.emailPasswordAuth.registerUser(newUser.email, newUser.password);
            const credentials = Realm.Credentials.emailPassword(
                newUser.email,
                newUser.password
            );
            const user = await app.logIn(credentials)
            await addUser(userProfile);
            return userProfile;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, thunkAPI) => {
        try {
            await app.logIn(Realm.Credentials.emailPassword(email, password));
            const currentUser = await app.currentUser;
            // retrieve user profile
            const userProfile = await getUser(currentUser);
            return userProfile;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        try {
            await app.currentUser?.logOut();
            return true;
        } catch (err) {
            throw new Error(err.message);
        }
    });

let initialState = { isLoggedIn: false, user: null, error: null };

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});

export default authSlice.reducer;