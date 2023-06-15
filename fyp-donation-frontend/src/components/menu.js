import { Link } from 'react-router-dom';
import './components.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaBars, 
    // FaCross, FaHamburger, 
    FaTimes } from 'react-icons/fa';
import { logout } from '../store/reducer';
export default function Menu() {
    const logged = useSelector((state) => state.donation.logged);
    const user = useSelector((state) => state.donation.user);
    const [ismob, setIsMob] = useState(window.innerWidth <= 425);
    const [show, setshow] = useState(false);
    const dispatch =useDispatch();
    const hide = () => {
        setshow(false);
    }

    window.addEventListener('resize', function () {
        console.log("resize", window.innerWidth <= 425);
        setIsMob(window.innerWidth <= 425);
    });

    return (

        ismob ?
            <div className="mobilemenu">
                <div className='mobilemenu-header d-flex justify-content-between pe-3'>
                    <span>
                        <img src="/logo-crop.png" alt="" style={{maxWidth:"200px",maxHeight:"35px"}} />
                    </span>
                    <span onClick={() => setshow(!show)}>
                        {
                            show ?
                                <FaTimes ></FaTimes>
                                :
                                <FaBars></FaBars>
                        }
                    </span>
                </div>
                {
                    show ? <div className="mobilemenu-sidebar px-3">
                        <hr/>

                        {
                             logged ?
                                 user.role === 'user'?<div className='d-flex align-items-center '>
                                    <img src="/logo-fb.jpg" style={{width:"30px",height:"30px",borderRadius:"20px"}}/>
                                      <Link onClick={() => { hide(); }} className="link mb-2" to="/user">  {user.name}</Link>
                                 </div>:""
                                :""
                        }
                        <hr/>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/home">Home</Link>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/about">About</Link>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/orgs">Organizations</Link>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/faq">FAQs</Link>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/social">Social Cause</Link>
                        <Link className="link mb-2" onClick={() => { hide(); }} to="/contactus">Contact Us</Link>
                        {

                            logged ?

                                user.role === 'admin'?
                                        <Link onClick={() => { hide(); }} className="link mb-2" to="/admin">Admin Panel </Link>
                                    : <div >
                                      
                                        <Link onClick={() => { hide(); }} className="link mb-2" to="/user/donate">Donate Now</Link>
                                      
                                        <Link onClick={() => { hide(); }} className="link mb-2" to="/user/donations">My Donations</Link>
                                 
                                        <Link onClick={() => { hide(); }} className="link mb-2" to="/user/profile">Update Profile</Link>
                                   
                                        <Link onClick={() => { hide(); }} className="link mb-2" to="/user/changepass">Change Password</Link>
                                    
                                        <a className='link' onClick={()=>{dispatch(logout())}}>Logout</a>
                                   
                                    </div>
                                :

                                <div >
                                    <Link className="link mb-2" to="/login">Log In / Register</Link>
                                    <Link className="link mb-2"  to="/user/donate">Donate Now</Link>
                                </div>
                        }
                    </div> : ""
                }

            </div>
            :
            <div className="  Menu">
                <div className="">

                    <div className="d-flex align-items-center">
                        <div className="parts col-md-2">
                            <img src="/logo-crop.png" alt="" style={{maxWidth:"200px"}} />

                        </div>
                        <div className="parts col-md-7 text-center">
                            <Link className="link" to="/home">Home</Link>
                            <Link className="link" to="/about">About</Link>
                            <Link className="link" to="/orgs">Organizations</Link>
                            <Link className="link" to="/faq">FAQs</Link>
                            <Link className="link" to="/social">Social Cause</Link>
                            <Link className="link" to="/contactus">Contact Us</Link>
                        </div>
                        {

                            logged ?

                                user.role === 'admin'
                                    ? <div className="parts col text-end">
                                        <Link className="link" style={{fontSize:"0.9rem"}} to="/admin">Admin Panel </Link>
                                    </div>
                                    : <div className="parts col text-end">
                                        <Link className="link" style={{fontSize:"0.9rem"}} to="/user"> Hello!! {user.name}</Link>
                                        <Link className="link" style={{fontSize:"0.9rem"}} to="/user/donate">Donate Now</Link>
                                    </div>
                                :

                                <div className="parts col-md-3 text-end">
                                    <Link className="link" style={{fontSize:"0.9rem"}} to="/login">Log In / Register</Link>
                                    <Link className="link" style={{fontSize:"0.9rem"}} to="/user/donate">Donate Now</Link>
                                </div>
                        }
                    </div>
                </div>
            </div>


    );
}