import { combineReducers } from 'redux'

//Actions
const STORE_MAP = 'STORE_MAP';
const INPUT_MARKERS = 'INPUT_MARKERS';
const CHANGE_FILTER = 'CHANGE_FILTER';

//Action Creator
function storeMap(value) {
  return {
    type: STORE_MAP, value
  }
}
function inputMarkers(value) {
  return {
    type: INPUT_MARKERS, value
  }
}
function changeFilter(value) {
  return {
    type: CHANGE_FILTER, value
  }
}

//Reducer
const initialState = {
  map: '',
  markers: [],
  filter: 'parks'
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case STORE_MAP:
      return applyStoreMap(state, action);
    case INPUT_MARKERS:
      return applyInputMarkers(state);
    case CHANGE_FILTER:
      return applyChangeFilter(state, action);
    default:
      return state;
  }
}

//Reducer function

//It saves map variable from Map component to give itself to Sidebar.js
function applyStoreMap(state, action) {
  return {
    ...state,
    map: action.map
  }
}
//To store markers from Map component. It is used to show sideBar component.
function applyInputMarkers(state, action) {
  return {
    ...state,
    markers: action.markers
  }
}
function applyChangeFilter(state, action) {
  if(action.filter !== state.filter) {
    return {
      ...state,
      markers: [],
      filter: action.filter
    }
  }
  return state;
}

//Export Action Creator
const actionCreators = {
  storeMap,
  inputMarkers,
  changeFilter
};
export { actionCreators };
//Export reducer
export default reducer;
