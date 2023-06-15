import { useSelector } from "react-redux";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function ChangePass(){
    const user = useSelector((state) => state.donation.user);
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data=API.getFormData(e.target);
        data.userId=user.id;
        console.log(user);
        if(data.newpassword!==data.cpassword){
            alert("Please confirm password")
            return;
        }

        API.post('user/pass',data)
        .then((res)=>{
            if(res.sucess){
                navigate('/user');
            }else{
                alert('Wrong current password');
            }
        })
        .catch((err)=>{
            alert('Something went wrong, please try again');

        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="password">Old Password</label>
                        <input type="password" name="password" id="password" className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="newpassword">New Password</label>
                        <input type="password" name="newpassword" id="newpassword" className="form-control" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" name="cpassword" id="cpassword" className="form-control" />
                    </div>
                    <div className="col-md-4 py-4">
                        <button className="btn btn-primary">Change</button>
                    </div>
                </div>
            </form>
        </div>
    );
}