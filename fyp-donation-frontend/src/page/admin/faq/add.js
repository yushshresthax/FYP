import { useState } from "react";
import API from "../../../api";

export default function AdminFaqAdd({ added, canceled }){
    const [q, setq] = useState('');
    const [a, seta] = useState('');
    


    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = {
        //     name,
        //     address,
        //     contact,
        //     detail,
        // };
        const data=new FormData(e.target);
        API.postForm('/faq', data)
            .then(data => added(data))
            .catch(err => console.log(err));
      
    };

    return (
        <div>
            <h2>Add FAQ</h2>
            <hr />
            <form onSubmit={handleSubmit} >
                <div className="row">
                 
                    <div className="col-md-12">
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