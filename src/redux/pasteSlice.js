import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast("Paste Created Successfully");

        },
        updateToPastes: (state,action) => {
             const paste=action.payload;
             const index= state.pastes.findIndex((item)=>item._id===paste._id)
             if(index>=0){
                state.pastes[index] = paste;
                localStorage.setItem("pastes",JSON.stringify(state.pastes));
                toast.success("Paste Updated");
             }

        },
        resetAllPastes: (state, action) => {
            state.pastes=[]
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success("Reset all ")

        },
        removeFromPastes: (state,action) => {
             const pasteId=action.payload
             state.pastes= state.pastes.filter((paste)=>paste._id!==pasteId)
             localStorage.setItem("pastes",JSON.stringify(state.pastes));
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes