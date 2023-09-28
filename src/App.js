import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./pages/loginpage/login.component.jsx";
import Homepage from "./pages/homepage/homepage.component.jsx"
import { useEffect } from "react";
import { getUserAuth } from "./store/users/users.action";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/feed" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

