import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.token = null
            state.user = null
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { login, logout, setUser } = userSlice.actions
export default userSlice.reducer