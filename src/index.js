import React from "react";
import ReactDom from "react-dom/client";
import { Board } from "./components/board";
const root = document.getElementById('root');
const rootApp = ReactDom.createRoot(root);
rootApp.render(<Board />)
