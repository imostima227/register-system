import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Detail from "./pages/Detail"
import App from "./pages/App"
import About from "./pages/About"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <Login />
    },
    {
        path: "/home",
        element: <App />,
        errorElement: <Main />,
        children: [
            {
                path: "",
                element: <Main />
            },
            {
                path: "detail/:id",
                element: <Detail />
            },
            {
                path: "about",
                element: <About />
            }
        ],
    },
])

export default router