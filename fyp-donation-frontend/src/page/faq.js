import { useEffect, useState } from "react";
import Menu from "../components/menu";
import API from "../api";

export default function Faq() {

    const [faqs, setfaqs] = useState([]);
    const [id, setid] = useState(0);
    useEffect(() => {
        API.get("general/faq").then((data) => {
            setfaqs(data);
        })
    }, []);


    const sid=(_id)=>{
        if( _id===id){
            setid(0);
        }else{  
            setid(_id);
        }
    };


    return (<div>
        <Menu />
        <div className="container pt-5">
            <div style={{border:"1px solid #bfbfbf",borderRadius:"5px",overflow:"hidden"}}>

                {
                    faqs.map((f,i)=><div key={f._id} >
                        <div className="p-2 m-0 d-flex align-items-center justify-content-between">
                            <h6 className="m-0">
                                {f.question}
                            </h6>
                            <div>
                                <small className="btn-link" onClick={()=>{sid(f._id)}}>
                                    {
                                        id===f._id?"Hide Answer":"View Answer"
                                    }
                                </small>
                            </div>
                        </div>
                        {
                            i<(faqs.length-1) || id===f._id?
                            <hr className="m-0"/>:""
                        }
                        <p className={"p-2 "+(id===f._id?"":" d-none")}>
                            {f.answer}
                        </p>
                    </div>)
                }
            </div>
        </div>
    </div>
    );
}