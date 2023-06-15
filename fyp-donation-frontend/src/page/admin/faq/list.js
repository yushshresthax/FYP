// import { Link } from "react-router-dom";

export default function AdminFaqList({faqs,onDel,onEdit}){
        return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Quesition</th>
                    <th>Answer</th>
                  
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    faqs.map(faq=><tr>
                        <td>{faq.question}</td>
                        <td>{faq.answer}</td>

                        <td>
                            <button className="me-2 btn btn-primary" onClick={()=>{onEdit(faq)}}>Edit</button>
                            <button className="me-2 btn btn-danger" onClick={()=>{onDel(faq)}}>Del</button>
                          
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        );
}