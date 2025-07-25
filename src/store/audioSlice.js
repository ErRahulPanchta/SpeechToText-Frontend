import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id: "",
    audio_file: "",
    transcript: "",
    user: ""
}

const audioSlice = createSlice({
    name: 'audioFile',
    initialState: initialValue,
    reducers: {
        setAudioDetails: (state, action) => {
            state._id = action.payload._id
            state.audio_file = action.payload.audio_file
            state.transcript = action.payload.transcript
            state.user = action.payload.user

        }
    }
})

export const { setAudioDetails } = audioSlice.actions

export default audioSlice.reducer