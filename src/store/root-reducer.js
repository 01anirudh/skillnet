import { combineReducers } from "redux";
import userReducer from "./users/users.reducer";
import articleReducer from "./articles/article.reducer";

const rootReducer = combineReducers({
	userState: userReducer,
	articleState: articleReducer,
});

export default rootReducer;