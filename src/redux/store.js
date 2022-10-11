import { createStore } from "redux";
import userreducer from "./users/userReducer";

const store = createStore(userreducer);
export default store;
