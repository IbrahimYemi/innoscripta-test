import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusState } from '../../interfaces/AppStatus';

const initialState: StatusState = {
  state: null,
  text: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    showStatus: (state, action: PayloadAction<StatusState>) => {
      state.state = action.payload.state;
      state.text = action.payload.text;
    },
    clearStatus: (state) => {
      state.state = null;
      state.text = '';
    },
  },
});

export const { showStatus, clearStatus } = statusSlice.actions;
export default statusSlice.reducer;