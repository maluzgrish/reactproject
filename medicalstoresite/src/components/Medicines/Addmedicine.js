import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from '../Navbar';
import { addMedicine } from "../../store/medicineSlice";

function Addmedicine() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userMedicines = useSelector((state) => state.medicines.userMedicines[user?.id] || []);

  const [itemName, setItemName] = useState("");
  const [itemStock, setItemStock] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleStockChange = (event) => {
    setItemStock(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("You need to be logged in to add medicines.");
      return;
    }

    if (userMedicines.length < 5) {
      const newItem = {
        id: userMedicines.length + 1,
        name: itemName,
        availablestock: itemStock,
        addedtime: new Date().toISOString(),
      };
      dispatch(addMedicine({ userId: user.id, medicine: newItem }));
      setItemName("");
      setItemStock("");
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("You can only add up to 5 medicines."); // Set error message
    }
  };

  const backgroundImageStyle = {
    backgroundImage: 'url(/images/med9.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const cardStyle = {
    maxWidth: '500px', // Adjust width as needed
    margin: 'auto', // Center the card horizontally
    backgroundColor: 'rgba(175, 227, 123, 0.8)', // Semi-transparent white background
    padding: '20px', // Add padding for better spacing
    borderRadius: '10px', // Rounded corners
    marginTop: '50px' // Margin from the top
  };

  return (
    <div style={backgroundImageStyle}>
      <Navbar />
      <div className="container">
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h2 className="card-title">Add New Medicines</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Enter Medicine Name</label>
                <input
                  type="text"
                  value={itemName}
                  className="form-control"
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label>Enter Available Stock</label>
                <input
                  type="text"
                  value={itemStock}
                  className="form-control"
                  onChange={handleStockChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-small btn-success" type="submit">Add</button>
              </div>
            </form>
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Addmedicine);
