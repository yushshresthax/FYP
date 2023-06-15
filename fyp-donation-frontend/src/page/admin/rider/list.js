// import { Link } from "react-router-dom";

export default function AdminRiderList({riders,onDel,onEdit}){
        return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>contact</th>
                    <th>Detail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    riders.map(rider=><tr>
                        <td>{rider.name}</td>
                        <td>{rider.address}</td>
                        <td>{rider.contact}</td>
                        <td>{rider.detail}</td>
                       
                        <td>
                            <button className="me-2 btn btn-primary" onClick={()=>{onEdit(rider)}}>Edit</button>
                            <button className="me-2 btn btn-danger" onClick={()=>{onDel(rider)}}>Del</button>
                          
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        );
}