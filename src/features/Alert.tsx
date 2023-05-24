import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
import { Alert } from "@/config/interface";

export const alertSlice = createSlice({
    name: "alert",
    initialState: {open: false, message: "", severity: "success"} as unknown as Alert,
    reducers: {
        setOpen: (state, action: PayloadAction<Alert>) => {
            return action.payload;
        },
        close: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        }
    }
})
export const {setOpen, close} = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alert
export default alertSlice.reducer;
