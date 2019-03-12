import React from "react";
import ReactDOM from "react-dom";
import Firebase, { FirebaseContext } from './components/Firebase';
import App from './components/App';
import "./components/css/main.css";

const MyApp = () => (
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
);

ReactDOM.render(<MyApp />, document.getElementById("root"));
