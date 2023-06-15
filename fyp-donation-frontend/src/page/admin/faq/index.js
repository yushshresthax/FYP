/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import Switch from "../../../components/switch";
// import AdminOrganizationList from "./list";
import API from "../../../api";
// import AdminOrgAdd from "./add";
// import AdminOrgEdit from "./edit";
import AdminFaqList from "./list";
import AdminFaqAdd from "./add";
// import AdminFasEdit from "./edit";
import AdminFaqEdit from "./edit";

export default function AdminFAQ() {
    const [faqs, setfaqs] = useState([]);
    const [faq, setfaq] = useState(null);
    const [mode, setMode] = useState(1);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        API.get('/faq')
            .then(data => setfaqs(data))
            .catch(err => console.log(err));
    }
    const initEdit = (_org) => {
        setfaq(_org);
        setMode(3);
    };

    const initDel = (_faq) => {
        if (confirm('Delete??')) {
            API.post('/faq/delete/'+_faq._id,{ })
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
                    <h1>List of FAQs</h1>
                </div>
                <button className="btn btn-primary" onClick={() => { setMode(2) }}>
                   Add New FAQ
                </button>
            </div>
            <div className="bg-white shadow p-3 mb-3 text-start">
                <Switch test={mode}>
                    <div value={1}>
                        <AdminFaqList faqs={faqs} onEdit={initEdit} onDel={initDel} />
                    </div>
                    <div value={2}>
                        <AdminFaqAdd canceled={() => { setMode(1) }} added={() => { loadData(); setMode(1); }} />
                    </div>

                    <div value={3}>
                        <AdminFaqEdit faq={faq} canceled={() => { setMode(1) }} onUpdate={() => { loadData(); setMode(1); }} />
                    </div>
                </Switch>
            </div>
        </div>
    );

}