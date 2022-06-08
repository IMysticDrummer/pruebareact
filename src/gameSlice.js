import { createSlice } from "@reduxjs/toolkit";

export const gameSlice= createSlice({
  name: 'gameStatus',

  initialState: {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0,
  },

  reducers:{
    addGameStatus: (state, squares) => {
      //Atención, squares debe ser un array de objetos
      state.history.concat(squares);
      state.xIsNext=!state.xIsNext;
      state.stepNumber=state.history.length;
    },

    jumpTo: (state, step) => {
      state.stepNumber=step;
      state.xIsNext=(state.xIsNext%2)===0;
    },
  },
})

export const {addGameStatus, jumpTo} =gameSlice.actions;
export default gameSlice.reducer;