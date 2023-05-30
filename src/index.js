import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import "./index.css";
const app = document.getElementById('root');
const root = createRoot(app);
root.render(<App/>)


//ReactDom is nolonger supported

// ReactDOM.render(<App />, document.getElementById("root"));
