import { useState } from "react";
import API from "../../api";
// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { donationStatus } from "../../constants/helper";
import { 
    // Link
    useParams } from "react-router-dom";
import DonationDetailMap from "./donationDetailMap";

export default function UserDonationDetail(){
    const {id}=useParams()
    const [donation,setDonation]=useState(null);
    const loadData=()=>{
        API.get("user/donation/"+id)
        .then((data)=>{
            console.log(data);
            setDonation(data);
        });
    }

    useEffect(()=>{loadData()},id);

    return (
        <div >
            {donation?<div>
                <div className="row">

                <div className="mb-2 col-md-4">
                        <strong>
                            Status
                        </strong>
                        <div>
                            {donationStatus[ donation.status]}
                        </div>
                    </div>
                    <div className="mb-2 col-md-4">
                        <strong>
                            Item Name
                        </strong>
                        <div>
                            {donation.name}
                        </div>
                    </div>
                    <div className="mb-2 col-md-4">
                        <strong>
                            Item Qty
                        </strong>
                        <div>
                            {donation.qty}
                        </div>
                    </div>
                    <div className="mb-2 col-md-4">
                        <strong>
                            Organization
                        </strong>
                        <div>
                            {donation.organization.name}
                        </div>
                    </div>
                    <div className="mb-2 col-md-4">
                        <strong>
                            Category
                        </strong>
                        <div>
                            {donation.category.name}
                        </div>
                    </div>
                    <div className="col-12">
                        <strong>Description</strong>
                        <div>
                            {donation.description}
                        </div>
                    </div>
                    
                    <div className="mb-2 col-12"><hr /></div>
                    <div className="mb-2 col-md-6">
                        <DonationDetailMap position={donation.location}></DonationDetailMap>
                    </div>
                    <div className="mb-2 col-md-6">
                    {
                                        donation.photo===""?"No Photo":
                                        <img alt="" src={API.img(donation.photo)} className="w-100"/>
                                    }
                    </div>
                </div>

            </div>:""}
        </div>
    )
}