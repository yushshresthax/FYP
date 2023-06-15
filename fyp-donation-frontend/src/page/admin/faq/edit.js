import { useState } from "react";
import API from "../../../api";
// import ImageUploader from "../../../components/imageuploader";

export default function AdminFaqEdit({ faq,onUpdate, canceled }){
    const [q, setq] = useState(faq.question);
    const [a, seta] = useState(faq.answer);

    const id=faq._id;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        API.postForm('/faq/update/'+id, data)
            .then(data => onUpdate(data))
            .catch(err => console.log(err));
       
    };

    return (
        <div>
            <h2>Update Faq</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="row">
                 
                    <div className="col-md-4">
                        <label>
                        question:
                        </label>
                        <input required className='form-control' type="text" name="question" value={q} onChange={e => setq(e.target.value)} />

                    </div>
                   
                    <div className="col-md-12">
                    <label>
                            Answer:
                        </label>
                        <textarea required className='form-control' type="text" name="answer" value={a} onChange={e => seta(e.target.value)} ></textarea>
                    </div>
                  
                    <div className="col-md-3 pt-3">
                        <div>

                            <button className='btn btn-primary me-2' type="submit">Add Faq</button> 
                            <span className='btn btn-danger ' onClick={canceled}>cancel</span>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    );
}