import { configureStore } from '@reduxjs/toolkit'
import favorReducer from "./FavorList"
import userStatus from "./UserStatus"
import alert from "./Alert"
// ...

export const store = configureStore({
  reducer: {
    favorFilmList: favorReducer,
    userStatus: userStatus,
    alert: alert
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
