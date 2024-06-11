import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateMedicine } from "../../store/medicineSlice";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";

function EditMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userMedicines = useSelector((state) => state.medicines.userMedicines[user?.id] || []);
  
  const [medicine, setMedicine] = useState({ id: '', name: '', availableStock: '', addedTime: '' });

  useEffect(() => {
    const med = userMedicines.find(medicine => medicine.id === parseInt(id));
    if (med) {
      setMedicine(med);
    }
  }, [id, userMedicines]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateMedicine({ userId: user.id, medicine }));
    navigate('/listmedicine');
  };

  const backgroundImageStyle = {
    backgroundImage: 'url(/images/med8.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const cardStyle = {
    maxWidth: '400px', // Adjust width as needed
    margin: 'auto', // Center the card horizontally
    backgroundColor: 'rgba(231, 237, 116, 0.8)', // Semi-transparent white background
    padding: '20px', // Add padding for better spacing
    borderRadius: '10px' // Rounded corners
  };

  return (
    <div style={backgroundImageStyle}>
      <Navbar />
      <div className="container mt-5">
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h2 className="card-title">Edit Medicine</h2>
            <form>
              <div className="form-group">
                <label>Medicine Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={medicine.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Stock Available:</label>
                <input
                  type="number"
                  className="form-control"
                  name="availablestock"
                  value={medicine.availablestock}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Added Time:</label>
                <input
                  type="text"
                  className="form-control"
                  name="addedTime"
                  value={medicine.addedTime}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(EditMedicine);
