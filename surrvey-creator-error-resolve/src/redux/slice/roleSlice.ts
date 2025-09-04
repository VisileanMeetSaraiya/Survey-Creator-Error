import { createSlice } from '@reduxjs/toolkit'
import type { RoleState } from '../../Types/types';



export const initialState: RoleState = {
    role : "siteuser"
}

export const roleOptions: RoleState["role"][] = ["siteuser", "qa", "admin"];

export const roleSlice = createSlice({
    name:'roleSlice',
    initialState,
    reducers : {
        changeRole: (state,action) => {
            state.role = action.payload
        }
    }
});

export const {changeRole} = roleSlice.actions;

export default roleSlice.reducer;