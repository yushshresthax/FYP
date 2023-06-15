import { useDispatch, useSelector } from "react-redux";
import API from "../../api";
import { saveAuth } from "../../store/reducer";

export default function UserProfile(){
    const user = useSelector((state) => state.donation.user);
    const dispatch =useDispatch();
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data=new FormData(e.target);
        data.append('userId',user.id);
        API.post('user/update',data)
        .then((authData)=>{
            alert("Profile Updates Sucessfully");
            API.setToken(authData.token);
            dispatch(saveAuth(authData.user));
        })
        .catch((Err)=>{
            alert("Some error occured please try again")
        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={user.name} className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone" defaultValue={user.phone} className="form-control" />
                    </div>
                    <div className="col-12 my-2">
                        <button className="btn btn-primary">Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    );
}