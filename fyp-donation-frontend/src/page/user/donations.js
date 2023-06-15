import { useState } from "react";
import API from "../../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { donationStatus } from "../../constants/helper";
import { Link, useNavigate } from "react-router-dom";

export default function UserDonations(){
    const user = useSelector((state) => state.donation.user);
    const navigate=useNavigate();
    const [donations,setDonations]=useState([]);
    const loadData=()=>{
        API.get("user/donations/"+user.id)
        .then((data)=>{
            console.log(data);
            setDonations(data);
        });
    }

    const goto=(url)=>{
        navigate(url);
    }

    useEffect(()=>{loadData()},[]);

    return (
        <div >
            <div className="table-responsive">
                
                <table className="table">
                    <thead>

                        <tr>
                            <th>
                                Organization
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Image
                            </th>
                            <th>
                                Item Name
                            </th>

                            
                            <th>
                                Status
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations.map((donation)=><tr key={donation._id} onClick={()=>{goto("/user/donation-detail/"+donation._id)}}>
                                <th>
                                    {donation.organization.name}
                                </th>
                                <th>
                                    {donation.category.name}
                                </th>
                                <th>
                                    {
                                        donation.photo===""?"No Photo":
                                        <img alt="dd" src={API.img( donation.photo)} style={{width:"75px"}} />
                                    }
                        
                                </th>
                                <th>
                                    {donation.name}
                                </th>
                                <th>    
                                    {donationStatus[donation.status]}
                                </th>
                                <th>
                                    <Link to={"/user/donation-detail/"+donation._id}>Detail</Link>
                                </th>
                            
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}