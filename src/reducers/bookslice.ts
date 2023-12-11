import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash"
import cardInterface from "../types/bookmark";
import { tagsjson } from "../helpers/createhelper";
const initialState:any = {
    bookmarkArray : <any>[],
    tagstate : <any>[]
}

const bookslice = createSlice({
    name:"bookmarks",
    initialState,
    reducers:{
        joinToArray : (state,action)=>{
            let newArray =  Object.keys(action.payload).map((key,index)=>{
                        return {
                            ...action.payload[key],
                            "_id":key
                        }
            })
           
            console.log(newArray)
            state.bookmarkArray = newArray
            let newtags = <any>[]
             newArray.map((value)=>[
               newtags =  _.union(newtags,value.tags)
            ])
            state.tagstate = newtags
            // console.log(state.bookmarkArray)
            // state.bookmarkArray = []

        },
        deletebookmark :(state,action) =>{
            state.bookmarkArray - _.filter(state.bookmarkArray,(book:cardInterface)=>{
                return book._id!=action.payload
            })
            if(state.bookmarkArray.length===0){
                state.tagstate = []
            }else{

                let newArray = state.bookmarkArray.map((book:cardInterface)=>{
                    return book.tags
                })
                newArray = _.flatten(newArray)
                state.tagstate = _.uniqWith(newArray,_.isEqual)

            }
        }


        
    }


})

export const {joinToArray,deletebookmark} = bookslice.actions
export default bookslice.reducer