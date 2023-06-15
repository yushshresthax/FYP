import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
// import NavBar from "../components/navbar";
import Menu from "../components/menu";
import { logout } from "../store/reducer";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function UserLayout() {


    const logged = useSelector((state) => state.donation.logged);
    const user = useSelector((state) => state.donation.user);
    const dispatch=useDispatch();

    if (!logged) {
        return <Navigate to="/login" />;
    } else {
        return (
            <div >
                <Menu />
                <div>
                    <div className="container pt-5">

                        <div className="row">

                            <div className="col-md-3 d-none d-md-block" style={{}}>
                                <div className="shadow p-3 text-white" style={{backgroundColor:"#393443",borderRadius:"5px"}}>

                                    <div >
                                        <h4>
                                            {user.name}
                                        </h4>
                                        <div>

                                        <FaEnvelope className="me-2"></FaEnvelope> {user.email} 
                                        </div>
                                        <div>
                                            <FaPhone className="me-2"></FaPhone>
                                        {user.phone}
                                        </div>
                                    </div>
                                    
                                    <hr />
                                    <div>
                                        <Link className="text-white" to="/user/donations">My Donations</Link>
                                    </div>
                                    <hr />
                                    <div>
                                        <Link className="text-white" to="/user/profile">Update Profile</Link>
                                    </div>
                                    <hr />
                                    <div>
                                        <Link className="text-white" to="/user/changepass">Change Password</Link>
                                    </div>
                                    <hr />
                                    <div>
                                        <a onClick={()=>{dispatch(logout())}}>Logout</a>
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-9" >
                                <div className="shadow p-3 bg-white" style={{minHeight:"400px"}}>
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}