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
import ProfilePage from "./Dachboard/main";
import {useAppDispatch} from "./hooks/redux";
import {getLocalStorage} from "./utils/storage/localStorageUtils.ts";
import {useEffect} from "react";
import {isTokenActive} from "./utils/storage/isTokenActive.ts";
import {autoLogin} from "./store/accounts/account.slice.ts";

const App : React.FC = () => {
    const dispatch = useAppDispatch();
    const token = getLocalStorage('authToken');

    useEffect(() => {
        if (typeof token === 'string') {
            if (isTokenActive(token)) {
                dispatch(autoLogin(token));
            }
        }
    }, [dispatch, token]);

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<GetCategories />} />
                    <Route path="/categories/:currentPage" element={<GetCategories/>}/>
                    <Route path="/home" element={<GetCategories/>}/>
                    <Route path="/categories/search/:searchTerm" element={<GetCategories />} />
                    <Route path="/categories/add" element={<AddCategory/>}/>
                    <Route path="/products/add/:categoryId" element={<AddProduct/>}/>
                    <Route path="/products/add/" element={<AddProduct/>}/>
                    <Route path="/product/edit/:productId" element={<EditProduct/>}/>
                    <Route path="/products" element={<GetProducts/>}/>
                    <Route path="/categories/edit/:categoryId" element={<EditCategory/>}/>
                    <Route path={"account/login"} element={<Login/>}/>
                    <Route path={"account/register"} element={<Register/>}/>
                    {/*<Route path={"/register"} element={<Register/>} />*/}
                    {/*<Route path={"/login"} element={<Login/>} />*/}
                    {/*<Route path={"/products"} element={<ProductCreatePage/>} />*/}
                </Route>
                <Route path={"/dashboard"} element={<DashboardLayout/>}>
                    <Route index element={<ProfilePage />} />
                    <Route path="/dashboard/categories/search/:searchTerm" element={<GetCategories />} />
                </Route>
            </Routes>
        </>
    );
}

export default App



