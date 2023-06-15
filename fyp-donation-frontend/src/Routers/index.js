import { Navigate, useRoutes } from "react-router-dom";
import AdminLayout from "../layout/admin";
import AdminDashboard from "../page/admin/dashboard";
import Forgot from "../page/auth/forget.js";
import Login from "../page/auth/login.js";
import Register from "../page/auth/register.js";
import UserLayout from "../layout/user";
import UserDashboard from "../page/user/dashboard";
import HomePage from "../page/home";
import AdminCategory from "../page/admin/category";
import AdminOrganization from "../page/admin/organization";
import AdminRider from "../page/admin/rider";
import UserDonate from "../page/user/donate";
import UserDonations from "../page/user/donations";
import UserDonationDetail from "../page/user/donationsDetail";
import AdminDonation from "../page/admin/donations";
import AdminDonationDetail from "../page/admin/donations/details";
import AboutPage from "../page/about";
import Organization from "../page/org";
import ContactPage from "../page/contact";
import AdminFAQ from "../page/admin/faq";
import Faq from "../page/faq";
import Social from "../page/social";
import ChangePass from "../page/user/changePass";
import UserProfile from "../page/user/profile";
export default function Router() {
    return useRoutes([
        {
            path: "admin",
            element: <AdminLayout />,
            children: [
                { path: "index", element: <AdminDashboard /> },
                { path: "category", element: <AdminCategory /> },
                { path: "organization", element: <AdminOrganization /> },
                { path: "rider", element: <AdminRider /> },
                { path: "donations", element: <AdminDonation /> },
                { path: "faq", element: <AdminFAQ /> },
                { path: "donations-detail/:id", element: <AdminDonationDetail /> },

                { path: '', element: <Navigate to="/admin/index" replace={true} /> },
                { path: '*', element: <Navigate to="/admin/index" replace={true} /> },

            ]
        },
        {
            path: "user",
            element: <UserLayout />,
            children: [
                { path: "index", element: <UserDashboard /> },
                { path: "donate", element: <UserDonate /> },
                { path: "donations", element: <UserDonations /> },
                { path: "profile", element: <UserProfile /> },
                { path: "changepass", element: <ChangePass /> },
                { path: "donation-detail/:id", element: <UserDonationDetail /> },
                
                { path: '', element: <Navigate to="/user/donations" replace={true} /> },
                { path: '*', element: <Navigate to="/user/donations" replace={true} /> },
                
            ]
        },
        {
            path: "home",
            element: <HomePage/>
        },
        { path: "faq", element: <Faq /> },
        { path: "social", element: <Social /> },
        {
            path: "about",
            element: <AboutPage/>
        },
        {
            path: "orgs",
            element: <Organization/>
        },
        {
            path: "contactus",
            element: <ContactPage/>
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />,
        },
        {
            path: '/forgot',
            element: <Forgot />,
        },

        { path: '*', element: <Navigate to="/home" replace={true} /> },
        { path: '', element: <Navigate to="/home" replace={true} /> },
    ]);
}