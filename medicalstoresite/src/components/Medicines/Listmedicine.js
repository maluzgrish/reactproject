// ListMedicines.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMedicine } from "../../store/medicineSlice";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";

function Listmedicines() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userMedicines = useSelector((state) => state.medicines.userMedicines[user?.id] || []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleDeleteItem = (itemId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this medicine?');
    if (isConfirmed) {
      dispatch(deleteMedicine({ userId: user.id, medicineId: itemId }));
    }
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredItems = userMedicines.filter((item) =>
    item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const backgroundImageStyle = {
    backgroundImage: 'url(/images/med7.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <div style={backgroundImageStyle}>

  
    <div> <Navbar/> </div> <br></br><br></br>
      <div className="container">
      <div className="row">
      <div className="col-md-8">
      <input
        type="text"
        placeholder="Search Medicines"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div></div></div><br></br>
      <div className="container">
      <div className="row">
      <div className="col-md-8"></div>
     

     

    
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Available Stock</th>
            <th>Added Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={`/editmedicine/${item.id}`}>{item.id}</Link>
              </td>
              <td>{item.name}</td>
              <td>{item.availablestock}</td>
              <td>{item.addedtime}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/editmedicine/${item.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li key={number + 1} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
              <a onClick={() => paginate(number + 1)} href="#!" className="page-link">
                {number + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default checkAuth(Listmedicines);
