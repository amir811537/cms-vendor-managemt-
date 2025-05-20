import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import CustomerDetail from "../Components/pages/CustomerDetail";
import CmsHome from "../Components/pages/CmsHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true, // 👈 Default route ("/") will render Home
        element:<CmsHome></CmsHome>
      },
      {
        path: "home", // 👈 Optional "/home" route (e.g. /home)
        element: <CmsHome />,
      },
      {
        path: "customerDetails",
        element: <CustomerDetail />,
      },
    ],
  },
]);

export default router;
