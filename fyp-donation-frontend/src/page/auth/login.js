import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate
    //  Link, useNavigate 
    } from "react-router-dom";
import { saveAuth } from "../../store/reducer";
import "../../styles/auth.css";
import API from "../../api";
import { FaEnvelope, FaEye, FaEyeSlash, FaPhone, FaUser } from 'react-icons/fa';

import './auth.css';
import Menu from "../../components/menu";
export default function Login() {
    const [mode, setMode] = useState(1);
    const [ispass, setispass] = useState(false);
    const [ispass1, setispass1] = useState(false);
    const logged= useSelector((state) => state.donation.logged);
    const user= useSelector((state) => state.donation.user);
    const dispatch=useDispatch();
    if(logged){
        if(user.role==="user"){
            return <Navigate to="/user" />;
        }else{
            return <Navigate to="/admin" />;
        }
    }
    const login=(e)=>{
        e.preventDefault();
        API.post('login',API.getFormData(e.target))
        .then((authData)=>{
            API.setToken(authData.token);
            dispatch(saveAuth(authData.user));
        })
        .catch((err)=>{
            if(err.response){
                alert(err.response.data.message);
            }else{

                alert("some error occured please try again");
            }
        });
    }
    const signup=(e)=>{
        e.preventDefault();
        API.post('register',API.getFormData(e.target))
        .then((authData)=>{
            if(authData.status){

                API.setToken(authData.token);
                dispatch(saveAuth(authData.user));
            }else{
                alert(authData.message);
            }
        })
        .catch((err)=>{
            if(err.response){
                alert(err.response.data.message);
            }else{

                alert("some error occured please try again");
            }
        });
    }

    const tooglePasswordType=()=>{
        setispass(!ispass);
        document.getElementById('lpass').type=ispass?"password":'text'
    };

    const tooglePasswordType1=()=>{
        setispass1(!ispass1);
        document.getElementById('spass').type=ispass1?"password":'text'
    };

    return (
        <div className="">
            <Menu />
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="p-2 flex-grow">
                    <div className="smallContainer border shadow rounded">
                        <div className="row g-0">
                            <div className="col-sm-6 col-xs-12 d-none d-sm-block position-relative" id='leftCol'>
                                <img src="/login-img.jpg" className="h-100" />
                                <div id="pt-5 text-end w-100" className="position-absolute end-0 top-0">
                                    <span href="#" className={"customBtn " + (mode === 1 ? "activeBtn" : "")} onClick={() => { setMode(1) }}>Login</span><br />
                                    <span href="#" className={"customBtn " + (mode === 2 ? "activeBtn" : "")} onClick={() => { setMode(2) }}>SignUp</span>
                                </div>

                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <div className="d-flex flex-column h-100" >

                                    <div className="text-center d-sm-none d-xs-block">
                                        <div className="switch-button">
                                            <input className="switch-button-checkbox" type="checkbox"></input>
                                            <label className="switch-button-label" for=""><span className="switch-button-label-span">Login</span></label>
                                        </div>
                                    </div>
                                    {
                                        mode === 1 ?
                                            <div className="my-auto p-5">
                                                <div className="text-center">
                                                    <div>
                                                        <img src="/logo.png" height="72" />
                                                    </div>
                                                    <h2 className="h3 pb-3">LOGIN</h2>
                                                </div>
                                                <form onSubmit={login}>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon"> <FaUser size={22} /> </span>
                                                        <input type="email" name="email" className="border-0 border-bottom w-100" placeholder="Enter Email Address" />
                                                    </div>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon" onClick={()=>{tooglePasswordType()}}> {
                                                            ispass?<FaEyeSlash size={22}/>:
                                                            <FaEye size={22} /> 
                                                        } 
                                                        </span>
                                                        <input type="password" name="password" id="lpass" className="border-0 border-bottom w-100" placeholder="Password" />
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-end pt-2">
                                                        {/* <a className="linkFlare" href="#"><small>Forgot Password?</small></a> */}
                                                        <button className="btn btn-accent px-4 rounded-pill">LOGIN</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            <div className="my-auto p-5">
                                                <div className="text-center">
                                                    <div>
                                                        <img alt="" src="/logo.png" height="72" />
                                                    </div>
                                                    <h2 className="h3 pb-3">Sign Up</h2>
                                                </div>
                                                <form onSubmit={signup}>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon"> <FaUser size={22} /> </span>
                                                        <input type="text" name="name" className="border-0 border-bottom w-100" placeholder="Enter Your Name" required />
                                                    </div>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon"> <FaPhone size={22} /> </span>
                                                        <input type="text" name="phone" className="border-0 border-bottom w-100" placeholder="Enter Your Phone No." required />
                                                    </div>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon"> <FaEnvelope size={22} /> </span>
                                                        <input type="email" name="email" className="border-0 border-bottom w-100" placeholder="Enter Email Address" required />
                                                    </div>
                                                    <div className="position-relative my-3 inputGroup text-center">
                                                        <span className="position-absolute icon" onClick={()=>{tooglePasswordType1();}}> 
                                                        {
                                                            ispass1?
                                                            <FaEyeSlash size={22} />
                                                            :
                                                            <FaEye size={22} />
                                                        }
                                                         </span>
                                                        <input type="password" name="password" id="spass" required className="border-0 border-bottom w-100" placeholder="Password"  />
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-end pt-2">
                                                        <button className="btn btn-accent px-4 rounded-pill">SignUp</button>
                                                    </div>
                                                </form>
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}