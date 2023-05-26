import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";

const initialState = {
    border: "rgb(184, 4, 4)",
    font: "white",
    background: "rgb(17, 17, 17)",
    inside: "rgb(71 70 70)",
    logo: "orangered"
}
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        
    }
})
export const selectTheme = (state: RootState) => state.theme
export default themeSlice.reducer;
