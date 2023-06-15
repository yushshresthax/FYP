/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import Switch from "../../../components/switch";
import AdminRiderList from "./list";
import API from "../../../api";
import AdminRiderAdd from "./add";
import AdminRiderEdit from "./edit";

export default function AdminRider() {
    const [riders, setriders] = useState([]);
    const [rider, setrider] = useState(null);
    const [mode, setMode] = useState(1);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        API.get('/riders')
            .then(data => setriders(data))
            .catch(err => console.log(err));
    }
    const initEdit = (_rider) => {
        setrider(_rider);
        setMode(3);
    };

    const initDel = (_rider) => {
        if (confirm('Delete??')) {
            API.post('/riders/delete/'+_rider._id,{ })
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
                    <h1>List of Riders</h1>
                </div>
                <button className="btn btn-primary" onClick={() => { setMode(2) }}>
                    Add New Rider
                </button>
            </div>
            <div className="bg-white shadow p-3 mb-3 text-start">
                <Switch test={mode}>
                    <div value={1}>
                        <AdminRiderList riders={riders} onEdit={initEdit} onDel={initDel} />
                    </div>
                    <div value={2}>
                        <AdminRiderAdd canceled={() => { setMode(1) }} added={() => { loadData(); setMode(1); }} />
                    </div>

                    <div value={3}>
                        <AdminRiderEdit rider={rider} canceled={() => { setMode(1) }} onUpdate={() => { loadData(); setMode(1); }} />
                    </div>
                </Switch>
            </div>
        </div>
    );

}