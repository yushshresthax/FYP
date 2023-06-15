import { FaHourglass, FaUserFriends, FaWarehouse } from "react-icons/fa";
import Menu from "../components/menu";

export default function AboutPage(){
    return (
        <div>
            <div className="landing-holder" >

                <Menu/>
                <div className="py-5" style={{background:"#D8D9D5"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <img src="/logo-fb.jpg" className="w-100 pb-5" alt=""/>


                            </div>
                            <div className="col-md-7 ">
                                <div className="ps-5">
                                    <h3 style={{fontWeight:"700"}}>About Us</h3>
                                    <hr/>
                                    <div style={{color:"#707371"}}>

                                        <p>
                                            At Sahyogh, we believe that small acts of kindness can make a big difference in the world. Our mission is to make it easy for people to donate their unused clothes and other reusable materials to those in need, without the hassle of physically traveling to an organization. Through our web application, we aim to bridge the gap between donors and organizations, providing a convenient platform for people to donate from the comfort of their own homes. Our team is committed to making a positive impact on society, and we strive to create a culture of giving that inspires people to be more socially responsible. Join us in our mission to create a more compassionate and connected world.
                                        </p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{background:"#E9DEC2",color:"#52432a"}}>
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <FaHourglass size={38}></FaHourglass>
                                    </div>
                                    <div className="col-6" style={{borderRight:"1px solid #715D3B"}}>
                                        <h4 className="mb-1" style={{fontWeight:700}}>1+</h4>
                                        <div>Years</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <FaUserFriends size={38}></FaUserFriends>
                                    </div>
                                    <div className="col-6" style={{borderRight:"1px solid #715D3B"}}>
                                        <h4 className="mb-1" style={{fontWeight:700}}>15+</h4>
                                        <div>People</div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-2">
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <FaAward size={38}></FaAward>
                                    </div>
                                    <div className="col-6" style={{borderRight:"1px solid #715D3B"}}>
                                        <h4 className="mb-1" style={{fontWeight:700}}>30+</h4>
                                        <div>Awards</div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-2">
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        <FaWarehouse size={38}></FaWarehouse>
                                    </div>
                                    <div className="col-6">
                                        <h4 className="mb-1" style={{fontWeight:700}}>10+</h4>
                                        <div>Donations</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}