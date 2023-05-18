import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./reduxstore";

interface Film {
  id: string;
}
interface FavorFilmList {
  userID: string;
  id: string;
  filmList: Film[];
}

export const favorFilmListSlice = createSlice({
  name: "favorFilmList",
  initialState: {},
  reducers: {
    setData: (state, action: PayloadAction<FavorFilmList>) => {
      return action.payload
    }
    // save: (state) => {
    //   fetch(
    //     "https://64055d32eed195a99f80eece.mockapi.io/api/films/favor/" +
    //       state[0].id,
    //     {
    //       method: "PUT",
    //       headers: { "content-type": "application/json" },
    //       body: JSON.stringify(state[0]),
    //     }
    //   )
    //     .then((res) => {
    //       if (res.ok) {
    //         return res.json();
    //       }
    //       // handle error
    //     })
    //     .then((tasks) => {
    //       // Do something with the list of tasks
    //     })
    //     .catch((error) => {
    //       // handle error
    //     });
    // },
    // insert: (state, action: PayloadAction<Film>) => {
    //   state[0].filmList.push(action.payload);
    // },
    // remove: (state, action: PayloadAction<Film>) => {
    //   state[0].filmList = state[0].filmList.filter((film) => {
    //     film.id !== action.payload.id;
    //   });
    // },
  },
});
export const { setData } = favorFilmListSlice.actions;
export const selectFavorFilm = (state: RootState) => state.favorFilmList;
export default favorFilmListSlice.reducer;
