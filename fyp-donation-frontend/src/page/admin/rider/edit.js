import { useState } from "react";
import API from "../../../api";

export default function AdminRiderEdit({ org,onUpdate, canceled }){
    const [name, setname] = useState(org.name);
    const [address, setaddress] = useState(org.address);
    const [contact, setcontact] = useState(org.contact);
    const [detail, setdetail] = useState(org.detail);
    const id=org._id;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            address,
            contact,
            detail,
        };
        API.post('/riders/update/'+id, data)
            .then(data => onUpdate(data))
            .catch(err => console.log(err));
        setname('');
        setaddress('');
        setcontact('');
        setcontact('');
    };

    return (
        <div>
            <h2>Update Rider</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-4">
                        <label>
                            Rider Name:
                        </label>
                        <input required className='form-control' type="text" value={name} onChange={e => setname(e.target.value)} />

                    </div>
                    <div className="col-md-4">
                        <label>
                            Rider address:
                        </label>
                        <input required className='form-control' type="text" value={address} onChange={e => setaddress(e.target.value)} />

                    </div>
                    <div className="col-md-4">
                        <label>
                            Rider contact:
                        </label>
                        <input required className='form-control' type="text" value={contact} onChange={e => setcontact(e.target.value)} />

                    </div>
                    <div className="col-md-12">
                    <label>
                            Rider Detail:
                        </label>
                        <textarea required className='form-control' type="text" value={detail} onChange={e => setdetail(e.target.value)} ></textarea>
                    </div>
                  
                    <div className="col-md-12 pt-3">
                        <div>

                            <button className='btn btn-primary me-2' type="submit">Update Rider</button> 
                            <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}