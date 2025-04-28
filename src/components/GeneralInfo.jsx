import { useState } from "react";

export function GeneralInfo({ previewMode, data, updateData, isEditing, setIsEditing, generalStatus, setGeneralStatus }) {
  const { name, email, phone, address } = data;
  const [hasSavedOnce, setHasSavedOnce] = useState(false);

  function handleNameInput(e) {
    updateData("name", e.target.value);
  }

  function handleEmailInput(e) {
    updateData("email", e.target.value);
  }

  function handlePhoneInput(e) {
    updateData("phone", e.target.value);
  }

  function handleAddressInput(e) {
    updateData("address", e.target.value);
  }

  async function handleEditSave(e) {
    e.preventDefault();
    if (generalStatus === "editing") {
      setGeneralStatus("saving");
      await sendMessage();
      setIsEditing(!isEditing);
      setHasSavedOnce(true);
      setGeneralStatus("saved");
    } else if (generalStatus === "saved") {
      setGeneralStatus("editing");
      await sendMessage();
      setIsEditing(!isEditing);
    }
  }

  function sendMessage() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  if (previewMode) {
    return (
      <>
        <h1>Personal details</h1>
        <h4>{name}</h4>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
      </>
    );
  } else
    return (
      <div>
        <h1>Personal details</h1>
        {isEditing ? (
          <div>
            <form action="" onSubmit={handleEditSave}>
              <div>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => handleNameInput(e)}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleEmailInput(e)}
                />
              </div>
              <div>
                <label htmlFor="phone-number">Phone number:</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phone-number"
                  id="phone-number"
                  value={phone}
                  onChange={(e) => handlePhoneInput(e)}
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => handleAddressInput(e)}
                />
              </div>
              <div>
                <button type="submit">
                  {hasSavedOnce ? "Update Personal Info" : "Add Personal Info"}
                </button>
              </div>
            </form>
            {generalStatus === "saving" && (
              <div>
                <p>Saving...</p>
                <div className="spinner"></div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {generalStatus === "saved" && (
              <div>
                <h3>Preview:</h3>
                <h4>Name: {name}</h4>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Address: {address}</p>
                <button onClick={handleEditSave}>Edit</button>
              </div>
            )}
            {generalStatus === "editing" && (
              <div>
                <p>Opening data in edit mode...</p>
                <div className="spinner"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
}
