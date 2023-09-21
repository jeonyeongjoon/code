import React from "react";
import ReactDOM from "react-dom/client";

import SnakeGame from "./SnakeGame";
// import SnakeGameHooks from './hooks_ver/components/SnakeGame_hooks.tsx';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    {/* <SnakeGameHooks /> */}
    <SnakeGame />
  </React.StrictMode>
);
