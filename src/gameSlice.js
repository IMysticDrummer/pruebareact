import { createSlice } from "@reduxjs/toolkit";

export const gameSlice= createSlice({
  name: 'gameStatus',

  initialState: {
    stepsHistory: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0,
  },

  reducers:{
    addGameStatus: (state, squares) => {
      //Atención, squares debe ser un array
      //y aquí lo convertimos en un objeto
      //para añadirlo al array stepsHistory
      const squaresTemp={'squares': squares.payload};
      const history=state.stepsHistory.slice(0, state.stepNumber+1);
      state.stepsHistory=[...history,squaresTemp];
      state.xIsNext=!state.xIsNext;
      state.stepNumber=state.stepsHistory.length;
    },

    jumpTo: (state, step) => {
      state.stepNumber=step.payload;
      state.xIsNext=(state.stepNumber%2)===0;
    },
  },
})

export const {addGameStatus, jumpTo} =gameSlice.actions;
export default gameSlice.reducer;