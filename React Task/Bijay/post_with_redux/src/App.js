import "./App.css";
import Post from "./components/Post";

import { useState } from "react";
import ToogleMode from "./components/ToogleMode";
import { connect } from "react-redux";

const App = props => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMe = () => {
    console.log("Dark Mode");
    setDarkMode(!darkMode);
  };
  // console.log(props.ui);
  return (
    <div className="main-container">
      <div className="toggle">
        <ToogleMode toggleMe={toggleMe} />
      </div>
      {darkMode ? <div className="dark-mode"></div> : ""}
      <div className="container">
        <section className="posts-container">
          <div className="post-container">
            {/* <Post /> */}
            {props.ui.map(post => (
              <Post key={post.user_id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ui: state.postData.posts,
});

export default connect(mapStateToProps)(App);
