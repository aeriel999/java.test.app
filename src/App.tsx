import { Routes, Route } from "react-router-dom";
import '/node_modules/antd/dist/reset.css';

import DefaultLayout from "./container/_Layout.tsx";
import GetCategories from "./Categories/getAll";
import AddCategory from "./Categories/create";
import EditCategory from "./Categories/update";
import TestPage from "./Categories/test.tsx";

function App() {
    //const [count, setCount] = useState(0)
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<GetCategories />} />
                    <Route path="/categories/:currentPage" element={<GetCategories/>}/>
                    <Route path="/home" element={<GetCategories/>}/>
                    <Route path="/categories/search/:searchTerm" element={<GetCategories />} />
                    <Route path="/categories/add" element={<AddCategory/>}/>
                    <Route path="/categories/edit/:categoryId" element={<EditCategory/>}/>
                    <Route path={"test"} element={<TestPage/>}/>
                    {/*<Route path={"/register"} element={<Register/>} />*/}
                    {/*<Route path={"/login"} element={<Login/>} />*/}
                    {/*<Route path={"/products"} element={<ProductCreatePage/>} />*/}


                </Route>
            </Routes>
        </>
    )
}

export default App



