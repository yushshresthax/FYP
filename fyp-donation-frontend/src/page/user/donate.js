import { useEffect, useState } from "react";
import API from "../../api";
// import Switch from "../../components/switch";
import MapWithMarker from "./map_marker";
import ImageUploader from "../../components/imageuploader";
// import axios from "axios";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

export default function UserDonate() {
    const [data, setData] = useState(null);
    const [category, setcategory] = useState({_id:0});
    const [step, setstep] = useState(0);
    const [org, setorg] = useState({_id:0});
    const [location, setlocation] = useState({lat: 26.4667136, lng: 87.277568});
    const user = useSelector((state) => state.donation.user);

    // const [name, setname] = useState('');
    // const [address, setaddress] = useState('');
    // const [description, setdescription] = useState('');
    // const navigate=useNavigate();
    // const [category,setcategory]=useState(0);
    const loadData = () => {
        API.get("general/donate")
            .then((_data) => {
                setData(_data);
                setstep(1);
            }).catch((err) => {

            });
    };

    useEffect(() => {
        loadData();
    }, []);

    const orgSelected = (org) => {
        setorg(org);
        setstep(3);
    };

    const categorySelected = (category) => {
        setcategory(category);
        setstep(2);
    };

    const saveData=(e)=>{
        e.preventDefault();
        let formData=new FormData(e.target);
        formData.append('location',JSON.stringify( location));
        formData.append('category',category._id)
        formData.append('organization',org._id)
        formData.append('userId',user.id)
        API.postForm("user/donate",formData)
        .then((data)=>{
            setstep(4);
        })
        .catch((err)=>{

        });
    };

    return (
        <div>
            <h5>Donation</h5>
            <hr />
            {
                step === 0 ?
                    <div>
                        <h1>
                            Loading Data
                        </h1>
                    </div> : ""
            }
            {
                step === 1 ?
                    <div value={1}>
                         <h6>
                            Please Choose Donation Category
                        </h6>
                        <hr />
                        <div className="row">
                            {
                                data.categories.map((cat) => <div key={cat._id} className="col-md-3">
                                    <button  className={" w-100 btn shadow p-3"+(cat._id===category._id?" btn-success":"")} onClick={() => { categorySelected(cat) }}>
                                        {cat.name}
                                    </button>
                                </div>)
                            }

                        </div>
                    </div>
                    : ""
            }

            {
                step===2?
                <div value={2}>
                    <h6>
                        Please Choose One of organization
                    </h6>
                    <hr />
                    <div className="row">
                        {
                            data.orgs.map((_org) => <div key={_org._id} className="col-md-3">
                                <button className={"w-100 btn shadow p-3"+(_org._id===org._id?" btn-success":"")} onClick={() => { orgSelected(_org) }}>
                                    {_org.name}

                                </button>
                            </div>)
                        }

                    </div>
                </div>:""
            }
            {
            step===3?
                <div value={3}>
                    <form onSubmit={saveData}>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="">Organization</label>
                                <input readOnly type="text" value={org.name} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Category</label>
                                <input readOnly type="text" value={category.name} className="form-control"  />
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-8">
                                <label htmlFor="name">Item Name</label>
                                <input type="text" name="name" id="name" className="form-control" required />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="qty">Item qty</label>
                                <input type="number" min={0} name="qty" id="qty" className="form-control" required/>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" className="form-control" required></textarea>
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="location">Location</label>
                                <MapWithMarker publishLocation={(loc)=>{setlocation(loc);console.log(loc);}}></MapWithMarker>
                            </div>
                            <div className="col-md-6 mt-2">
                                <label htmlFor="description">Image</label>

                                <ImageUploader name={"image"} isrequired={false}></ImageUploader>
                            </div>

                        </div>
                        <div className="py-2">
                            <button className="btn btn-primary">
                                Donate Now
                            </button>
                        </div>
                        
                    </form>
                </div>:""
            }
            {
                step===4?<div>
                    <div className="text-center">
                        <div>
                            <img src="/logo-fb.jpg" style={{width:"75px"}} alt="" />
                        </div>
                        <div>
                            <h4 className="mt-3">
                                Thank you for Donating. <br />
                                One of our representative will contact you soon.
                            </h4>
                        </div>
                    </div>
                </div>:""
            }


        </div>
    );
}