import { createBrowserRouter } from "react-router-dom";
import App from "./App"
import Dashboard from "./routes/Dashboard";
import About from "./routes/About";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/dash", element: <Dashboard /> },
  { path: "/about", element: <About /> }
]);
