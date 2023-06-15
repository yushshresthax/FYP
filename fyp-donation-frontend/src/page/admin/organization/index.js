/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import Switch from "../../../components/switch";
import AdminOrganizationList from "./list";
import API from "../../../api";
import AdminOrgAdd from "./add";
import AdminOrgEdit from "./edit";

export default function AdminOrganization() {
    const [orgs, setorgs] = useState([]);
    const [org, setorg] = useState(null);
    const [mode, setMode] = useState(1);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        API.get('/organizations')
            .then(data => setorgs(data))
            .catch(err => console.log(err));
    }
    const initEdit = (_org) => {
        setorg(_org);
        setMode(3);
    };

    const initDel = (_org) => {
        if (confirm('Delete??')) {
            API.post('/organizations/delete/'+_org._id,{ })
                .then((data) => {
                    loadData();
                    setMode(1);
                }).catch((err) => {
                    console.log(err);
                })
        }
    };


    return (
        <div>
            <div className="bg-white shadow p-3 mb-3 text-end">
                <div className="text-start">
                    <h1>List of Organizations</h1>
                </div>
                <button className="btn btn-primary" onClick={() => { setMode(2) }}>
                    Add Organization
                </button>
            </div>
            <div className="bg-white shadow p-3 mb-3 text-start">
                <Switch test={mode}>
                    <div value={1}>
                        <AdminOrganizationList orgs={orgs} onEdit={initEdit} onDel={initDel} />
                    </div>
                    <div value={2}>
                        <AdminOrgAdd canceled={() => { setMode(1) }} added={() => { loadData(); setMode(1); }} />
                    </div>

                    <div value={3}>
                        <AdminOrgEdit org={org} canceled={() => { setMode(1) }} onUpdate={() => { loadData(); setMode(1); }} />
                    </div>
                </Switch>
            </div>
        </div>
    );

}