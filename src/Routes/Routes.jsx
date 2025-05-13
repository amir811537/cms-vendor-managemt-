import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home2 from "../Components/pages/Home2";
import InputLayout from "../Components/pages/InputLayout";



const router=createBrowserRouter([
    {
        path:'/',
        element:<Mainlayout></Mainlayout>,
        children:[
            {
                path:'/dwonloadpage',
                element:<Home2></Home2>
            },
            {
                path:"/",
                element:<InputLayout></InputLayout>
            }
            
        ]
    }
]);
export default router;