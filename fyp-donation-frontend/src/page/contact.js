import { FaFacebook, FaInstagram, FaTwitter, FaYoutubeSquare } from "react-icons/fa";
import Menu from "../components/menu";

export default function ContactPage() {
    return (<div>
        <Menu />
        <div className="container py-5">

                <div className="row">
                    <div className="col-md-6 d-flex order-md-1 order-2 align-items-center">
                        <div>

                            <h3>
                                <span style={{fontWeight:"700"}}>Contact</span>
                                <span className="ms-3">Us</span>
                            </h3>
                            <p style={{textAlign:"justify"}}>
                                We're here to help! If you have any questions, feedback or suggestions, please don't hesitate to contact us. Our team is ready to assist you in any way possible.
                                <br/>
                                <br/>

                                You can reach us through the following channels:
                                <br/>
                                <strong>Email:</strong> Yush.shrestha2013@gmail.com
                                <br/>
                                <strong>Phone:</strong> +977-9844115366
                                <br/>
                                <strong>Address:</strong> Imadol, Lalitpur, Nepal
                            </p>
                            <div className="row">
                                <div className="col-md-5">
                                    <a className="btn w-100 text-white" href="tel:9844115366" style={{background:"#ED6B4B",padding:"10px",borderRadius:"10px"}}>
                                        Give Us A Call
                                    </a>
                                </div>
                                <div className="col-md-7 my-md-0 my-4 text-md-end text-center text-white">
                                        <a href="https://www.facebook.com/yushs/" className="btn btn-square social me-3">
                                            <FaFacebook ></FaFacebook>
                                        </a>
                                        <a href="https://www.instagram.com/yushshrestha/" className="btn btn-square social me-3">
                                            <FaInstagram ></FaInstagram>
                                        </a>
                                        <a href="facebook" className="btn btn-square social me-3">
                                            <FaTwitter ></FaTwitter>
                                        </a>
                                        <a href="facebook" className="btn btn-square social me-3">
                                            <FaYoutubeSquare ></FaYoutubeSquare>
                                        </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6 order-1 order-md-2 mb-3"> 
                        <img src="/contactus-img.png"  className="w-100" alt=""/>
                    </div>
            </div>
        </div>
    </div>);
}