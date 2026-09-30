import { createSlice } from "@reduxjs/toolkit";

const initialBookState = {
    books:[],
    pendingBooks:[],
    myBooks:[],
    show:true,
    toggle:true,
    total:0,
    statusBooks:[]
}

const bookSlice = createSlice({
    name: "book",
    initialState: initialBookState,
    reducers: {
      setBooks(state, action) {
        state.books = action.payload;
      },
      setpendingBooks(state,action){
        state.pendingBooks = action.payload;
      },
      setMyBooks(state,action){
        state.myBooks = action.payload;
      },
      setShow(state,action){
        state.show= action.payload;
      },
      setToggle(state,action){
        state.toggle = action.payload;
      },
      setTotal(state,action){
        state.total = action.payload;
      },
      setStatusBooks(state,action){
        state.statusBooks = action.payload;
      }
    }
})

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;

