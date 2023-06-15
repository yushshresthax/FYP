import { useEffect, useState } from "react"
import API from "../api";
import Menu from "../components/menu";

export default function Organization(){
    const [orgs,setORG]=useState([]);
    useEffect(()=>{
        API.get("general/org").then((data)=>{
            setORG(data);
        })
    },[])
    return (<div>
        <Menu/>
        <div className="container pt-5">

            {
                orgs.map((org)=><div key={org._id}>
                    <div className="row">
                        <div className="col-md-3">
                            <img src={API.img(org.image)} className="w-100 pb-5" alt=""/>
                        </div>
                        <div className="col-md-9">
                            <h4 style={{fontWeight:"700"}}>{org.name}</h4>
                            <div className="d-flex justify-content-between">
                                <div>
                                    {org.contact}
                                </div>
                                <div>
                                    {org.address}
                                </div>
                            </div>
                            <hr />
                            <p>{org.detail}</p>
                        </div>
                    </div>
                </div>)
            }
        </div>
    </div>)
}