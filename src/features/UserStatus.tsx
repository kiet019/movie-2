import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
import { User } from "@/config/interface";

export const userStatusSlice = createSlice({
    name: "userStatus",
    initialState: {status: false},
    reducers: {
        setIsActive: (state, action: PayloadAction<User>) => {
            state.status = action.payload.status
        }
    }
})
export const {setIsActive} = userStatusSlice.actions;
export const selectUser = (state: RootState) => state.userStatus
export default userStatusSlice.reducer;
