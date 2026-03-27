import { Route, Routes } from "react-router-dom";
// import  HomePage  from "../pages/HomePage.jsx";
// import AboutPage from "../pages/AboutPage.jsx";
import BooksPage from "../pages/BooksPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading.jsx";
import AdminDashboard from "../pages/AdminDashboardPage.jsx";
// import AdminPage from "../pages/AdminPage.jsx";
import AdminLogin from "../pages/AdminLogin.jsx";
import {
    AddBook,
    EditBook,
    DeleteBook,
} from "../components/BookCRUDComponents.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import MainLayout from "../components/MainLayout.jsx";
import AdminLayout from "../components/AdminLayout.jsx";
import { VerifyPage } from "../components/AdminComponents.jsx";
const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx"));
const AdminPage = lazy(() => import("../pages/AdminPage.jsx"));
const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <HomePage />
                        </Suspense>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <Suspense fallback={<Loading />}>
                            <AboutPage />
                        </Suspense>
                    }
                />
                <Route path="/book" element={<BooksPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-verify" element={<VerifyPage />} />
                <Route element={<ProtectedRoute />}>
                <Route path="/admin-page" element={<AdminPage />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="book-add" element={<AddBook />} />
                    <Route path="book-edit" element={<EditBook />} />
                    <Route path="book-delete" element={<DeleteBook />} />
                </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
