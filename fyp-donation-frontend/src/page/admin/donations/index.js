/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import API from "../../../api";
import { donationStatus } from "../../../constants/helper";
import Modal from "../../../components/modal";
import { Link } from "react-router-dom";

export default function AdminDonation(){
    const [donations,setDonations]=useState([]);
    const [donation,setDonation]=useState(null);
    const [donationState,setDonationState]=useState(0);
    const [riders, setriders] = useState([]);
    const [onRider, setonRider] = useState(false);

    const loadDonation=()=>{
        API.get('donation/'+donationState)
        .then((data)=>{
            setDonations(data);
        })
        .catch((err)=>{

        });
    };
    useEffect(() => {
        loadRider();
    }, []);

    const loadRider = () => {
        API.get('/riders')
            .then(data => setriders(data))
            .catch(err => console.log(err));
    }

    useEffect(()=>{loadDonation()},[donationState]);

    const initsetRider=(donation)=>{
        setonRider(true);
        setDonation(donation);
        console.log(donation);
    };

    const setCompleted = (donation)=>{
        if(confirm('Do you want to mark donation a picked')){
            API.get('donation/complete/'+donation._id)
            .then((data)=>{
                loadDonation();
            })
        }
    };
    const setRider=(e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        API.post('donation/rider/'+donation._id,formData).then((data)=>{
            loadDonation();
            setonRider(false);
        })
        .catch((err)=>{

        });
    };

    return (

        <div>
            <div className="row">
                {
                    [0,1,2].map((i)=>   <div className="col-md-4">
                    <button className={"btn w-100"+(donationState===i?" btn-primary":"")} onClick={()=>{setDonationState(i)}}>
                        {donationStatus[i]}
                    </button>
                </div>)
                }
             
            </div>
            <div className="shadow mt-3 p-3 bg-white">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Donor
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Oganization
                            </th>
                            <th>
                                Item Name
                            </th>
                            <th>
                                Qty
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donations.map((donation)=><tr>
                                <td>
                                    {donation.user.name}
                                </td>
                                <td>
                                    {donation.category.name}
                                </td>
                                <td>
                                    {donation.organization.name}
                                </td>
                                <td>
                                    {donation.name}
                                </td>
                                <td>
                                    {donation.qty}
                                </td>
                                <td>
                                    {donationState===0?
                                    <button className="btn btn-success me-2" onClick={()=>{initsetRider(donation);}}>Set Rider</button>
                                    :""}
                                     {donationState===1?
                                    <button className="btn btn-success me-2" onClick={()=>{setCompleted(donation);}}>Set Pickedup</button>
                                    :""}
                                    <Link className="btn btn-primary" to={"/admin/donations-detail/"+donation._id} >View Detail</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                onRider?<Modal title="Please select a rider" onClose={()=>{setonRider(false)}}> 
                    <div>
                        <form onSubmit={setRider}>
                            <div className="row">
                                <div className="col-md-4">
                                    <select name="rider" id="rider" className="form-control">
                                        {riders.map((rider)=><option value={rider._id} key={rider._id}>
                                            {rider.name}
                                        </option>)}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-primary">Set Rider</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
                :""
            }
        </div>
    );
}