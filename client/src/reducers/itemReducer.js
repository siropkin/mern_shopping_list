import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
  items: [
    { id: 'id_123', name: 'Eggs' },
    { id: 'id_1223', name: 'Milk' },
    { id: 'id_12333', name: 'HotDog' },
    { id: 'id_112123', name: 'Tea' },
  ]
};

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    default:
      return state;
  }
}
