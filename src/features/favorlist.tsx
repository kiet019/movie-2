import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./ReduxStore";
import { FavorFilmList } from "@/config/interface";

const initialState = {
  userID: "",
  id: "",
  filmList: [],
} as FavorFilmList;
const url = new URL(
  "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor"
);

export const favorFilmListSlice = createSlice({
  name: "favorFilmList",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<FavorFilmList>) => {
      return action.payload;
    },
    clear: (state) => {
      return initialState;
    },
    insert: (state, action: PayloadAction<string>) => {
      if (
        state.filmList.find((film) => film === action.payload) === undefined
      ) {
        state.filmList.push(action.payload);
      }
    },
    save: (state, action: PayloadAction<string>) => {
      fetch(
        "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor/" +
          action.payload,
        {
          method: "PUT", // or PATCH
          headers: { "content-type": "application/json" },
          body: JSON.stringify(state),
        }
      ).then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      });
    },
    create: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload !== undefined) {
        fetch("https://64055d32eed195a99f80eece.mockapi.io/api/films/favor/", {
          method: "POST", // or PATCH
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userID: action.payload }),
        })
      }
    },
    // remove: (state, action: PayloadAction<Film>) => {
    //   state[0].filmList = state[0].filmList.filter((film) => {
    //     film.id !== action.payload.id;
    //   });
    // },
  },
});
export const { setData, insert, save, create, clear } =
  favorFilmListSlice.actions;
export const selectFavorFilm = (state: RootState) => state.favorFilmList;
export default favorFilmListSlice.reducer;
