import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Actions
import { logoutAction } from "./actions/logout";

// Libraries
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

// Pages
import ApplicationsPage, {
  applicationsAction,
  applicationsLoader,
} from "./pages/ApplicationsPage";
import RolePage, { roleAction, roleLoader } from "./pages/RolePage";
import ApplicationPage from "./pages/ApplicationPage";

// actions
import { deleteRole } from "./actions/deleteRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "role/:id",
        element: <RolePage />,
        loader: roleLoader,
        action: roleAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteRole,
          },
        ],
      },
      {
        path: "application/:id",
        element: <ApplicationPage />,
        // loader: applicationLoader,
        // action: applicationAction,
        errorElement: <Error />,
      },
      {
        path: "applications",
        element: <ApplicationsPage />,
        loader: applicationsLoader,
        action: applicationsAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "about",
        element: <h1>About</h1>,
      },
    ],
  },
]);

function App(): JSX.Element {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
