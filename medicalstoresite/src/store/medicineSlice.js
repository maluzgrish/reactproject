import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userMedicines: JSON.parse(localStorage.getItem('userMedicines')) || {},
};

const medicineSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    addMedicine: (state, action) => {
      const { userId, medicine } = action.payload;
      if (!state.userMedicines[userId]) {
        state.userMedicines[userId] = [];
      }
      if (state.userMedicines[userId].length < 5) {
        state.userMedicines[userId].push({ ...medicine, addedTime: new Date().toISOString() });
        localStorage.setItem('userMedicines', JSON.stringify(state.userMedicines));
      }
    },
    updateMedicine: (state, action) => {
      const { userId, medicine } = action.payload;
      const userMeds = state.userMedicines[userId];
      const index = userMeds.findIndex((med) => med.id === medicine.id);
      if (index !== -1) {
        userMeds[index] = { ...medicine, addedTime: userMeds[index].addedTime }; // Preserve the original addedTime
        localStorage.setItem('userMedicines', JSON.stringify(state.userMedicines));
      }
    },
    deleteMedicine: (state, action) => {
      const { userId, medicineId } = action.payload;
      state.userMedicines[userId] = state.userMedicines[userId].filter((med) => med.id !== medicineId);
      localStorage.setItem('userMedicines', JSON.stringify(state.userMedicines));
    },
  },
});

export const { addMedicine, updateMedicine, deleteMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;
