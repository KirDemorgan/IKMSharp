import React from "react";
import Feed from "./components/Feed";
// @ts-ignore
import "./styles/App.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>News Feed</h1>
            <Feed />
        </div>
    );
};

export default App;
