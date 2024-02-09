import React from "react";
import ReactDOM from "react-dom/client";
// import { StarRating } from "./StarRating";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Amazing!"]} />
    <StarRating size={29} maxRating={10} color="blue" />
    <StarRating size={32} maxRating={5} color="red" defaultRating={3} /> */}
    <App />
  </React.StrictMode>
);
