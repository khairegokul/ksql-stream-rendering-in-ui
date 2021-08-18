function recordsReducer(state = [], action){
   switch (action.type){
      case "add_record":
         return [...state, action.payload]
      default:
         return state
   }
}
export default recordsReducer