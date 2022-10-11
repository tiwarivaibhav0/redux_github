import { ADD_INFO } from "./userActions";

const initialState = {
  username: "",
};

const userreducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFO:
      return { ...state, username: action.payload };

    default:
      return state;
  }
};

export default userreducer;
