import { configureStore } from '@reduxjs/toolkit'
import favorReducer from "./favorlist"
import userStatus from "./usercode"
// ...

export const store = configureStore({
  reducer: {
    favorFilmList: favorReducer,
    userStatus: userStatus
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch