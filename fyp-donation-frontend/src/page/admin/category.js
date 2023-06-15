import { useEffect, useState } from "react";
import API from "../../api";
// import { useSelector } from "react-redux";

export default function AdminCategory() {
    const [categorys, setcategorys] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState(null);
   
    // Fetch all categorys from the server on component mount
    useEffect(() => {
        loadcategory();
    }, []);

    const loadcategory=()=>{
        API.get('/category')
            .then(data => {
                setcategorys(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Add a new category to the server
    const addcategory = (event) => {
        event.preventDefault();
        API.post('/category', { name: newCategory })
            .then(_categorys => {
                console.log(_categorys);
                loadcategory();
                setNewCategory('');
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Update an existing category on the server
    const updatecategory = (event) => {
        event.preventDefault();
        API.post(`/category/update`, editCategory)
            .then(_data => {
                setcategorys(categorys.map(category => category._id === _data._id ? _data : category));
                setEditCategory(null);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Delete a category from the server
    const deletecategory = (id) => {
        API.post(`/category/del`,{id})
            .then(response => {
                loadcategory();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (

        <div>
            <h1>Categorys of Donation</h1>

            <div className="p-3 shadow bg-white mb-3">
                <form onSubmit={addcategory}>
                    <div className="row">
                        <div className="col-md-9">
                            <input className="form-control" type="text" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />

                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary" type="submit">Add category</button>
                        </div>
                    </div>
                </form>

            </div>

            {/* Edit category form */}
            {editCategory &&
                <div className="p-3 shadow bg-white mb-3">
                    <form onSubmit={updatecategory}>
                        <div className="row">
                            <div className="col-md-9">
                                <input className="form-control" type="text" value={editCategory.name} onChange={(event) => setEditCategory({ ...editCategory, name: event.target.value })} />

                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" type="submit">Update category</button>
                                <button className="btn btn-danger" onClick={()=>{setEditCategory(null)}} type="submit">Cancel</button>
                            </div>
                        </div>

                    </form>
                </div>
            }

            {/* List of categorys */}
            <div className="bg-white shadow mb-3 p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Category
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {categorys.map(category => (
                            <tr key={category._id}>
                                <td>
                                    {category.name}

                                </td>
                                <td>
                                    <button onClick={() => setEditCategory(category)}>Edit</button>
                                    <button onClick={() => deletecategory(category._id)}>Delete</button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );

}