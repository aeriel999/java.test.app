import { Routes, Route } from "react-router-dom";
import '/node_modules/antd/dist/reset.css';
import Login from "./views/Login";
import Register from "./views/Register";
import {useAppSelector} from "./hooks/redux";
import NotFoundPage from "./errors/notFound.tsx";
import DefaultLayout from "./components/container/site/_Layout.tsx";
import GetCategories from "./components/admin/categories/getAll";
import GetProducts from "./components/admin/products/getAll";
import DashboardLayout from "./components/container/dashboard/layots/_DashboardLayout.tsx";
import AddCategory from "./components/admin/categories/create";
import EditCategory from "./components/admin/categories/update";
import AddProduct from "./components/admin/products/create";
import ProductEditPage from "./components/admin/products/update";

import MainBlogPage from "./components/blog";
import DefaultBlogLayout from "./components/container/blog/_BlogLayot.tsx";


const App : React.FC = () => {

    const {isLogin, user} = useAppSelector(state => state.account);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <Route path={"account/Login"} element={<Login/>}/>
                <Route path={"account/Register"} element={<Register/>}/>

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
                        <Route path="/dashboard/product/edit/:productId" element={<ProductEditPage/>}/>
                    </Route>   ))
                </>
            )}
            <Route path="*" element={<NotFoundPage />} />

            <Route path={"/blog"} element={<DefaultBlogLayout/>}>
                 <Route index element={<MainBlogPage/>}/>
             </Route>
        </Routes>
    );
}

export default App


