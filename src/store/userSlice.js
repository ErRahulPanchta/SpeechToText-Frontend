import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id: "",
    name: "",
    email: "",
    profile_picture: ""
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state._id = action.payload._id
            state.profile_picture = action.payload.profile_picture

        },
        logout: (state, action) => {
            state.name = ""
            state.email = ""
            state._id = ""
            state.profile_picture = ""
        }
    }
})

export const { setUserDetails, logout } = userSlice.actions

export default userSlice.reducer