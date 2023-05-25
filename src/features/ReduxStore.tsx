import { configureStore } from '@reduxjs/toolkit'
import favorReducer from "./FavorList"
import userStatus from "./UserStatus"
import alert from "./Alert"
import theme from "./Theme"
// ...

export const store = configureStore({
  reducer: {
    favorFilmList: favorReducer,
    userStatus: userStatus,
    alert: alert,
    theme: theme
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
