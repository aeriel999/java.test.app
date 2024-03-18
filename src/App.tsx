import { Routes, Route } from "react-router-dom";
import '/node_modules/antd/dist/reset.css';
import DefaultLayout from "./container/layots/_Layout.tsx";
import GetCategories from "./Categories/getAll";
import AddCategory from "./Categories/create";
import EditCategory from "./Categories/update";
import AddProduct from "./Products/create";
import GetProducts from "./Products/getAll";
import EditProduct from "./Products/update";
import Login from "./views/login";
import Register from "./views/register";
import DashboardLayout from "./Dachboard/layots/_DashboardLayout.tsx";
import {useAppSelector} from "./hooks/redux";
import NotFoundPage from "./errors/notFound.tsx";

const App : React.FC = () => {

    const {isLogin, user} = useAppSelector(state => state.account);

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<GetCategories />} />
                <Route path="/home" element={<GetCategories/>}/>
                <Route path="/categories/search/:searchTerm" element={<GetCategories />} />
                <Route path="/products" element={<GetProducts/>}/>
                <Route path={"account/login"} element={<Login/>}/>
                <Route path={"account/register"} element={<Register/>}/>
            </Route>

            {isLogin && (
                <>
                (isAdmin && (
                    <Route path={"/dashboard"} element={<DashboardLayout/>}>
                        <Route index element={<GetCategories />} />
                        <Route path="/dashboard/categories/search/:searchTerm" element={<GetCategories />} />
                        <Route path="/dashboard/categories/add" element={<AddCategory/>}/>
                        <Route path="/dashboard/categories/edit/:categoryId" element={<EditCategory/>}/>
                        <Route path="/dashboard/products" element={<GetProducts/>}/>
                        <Route path="/dashboard/products/add/:categoryId" element={<AddProduct/>}/>
                        <Route path="/dashboard/products/add/" element={<AddProduct/>}/>
                        <Route path="/dashboard/product/edit/:productId" element={<EditProduct/>}/>
                    </Route>   ))
                </>
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App


