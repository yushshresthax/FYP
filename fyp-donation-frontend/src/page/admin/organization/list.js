// import { Link } from "react-router-dom";

export default function AdminOrganizationList({orgs,onDel,onEdit}){
        return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Detail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    orgs.map(org=><tr>
                        <td>{org.name}</td>
                        <td>{org.address}</td>
                        <td>{org.contact}</td>
                        <td>{org.detail}</td>
                       
                        <td>
                            <button className="me-2 btn btn-primary" onClick={()=>{onEdit(org)}}>Edit</button>
                            <button className="me-2 btn btn-danger" onClick={()=>{onDel(org)}}>Del</button>
                          
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        );
}