import { useState } from "react";

export function GeneralInfo() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(true);
    const [status, setStatus] = useState('editing');

    function handleNameInput(e) {
        setName(e.target.value);
    }

    function handleEmailInput(e) {
        setEmail(e.target.value);
    }

    function handlePhoneInput(e) {
        setPhone(e.target.value);
    }

    function handleAddressInput(e) {
        setAddress(e.target.value);
    }

    async function handleEditSave(e) {
        e.preventDefault();
        if (status === 'editing') {
            setStatus('saving');
            await sendMessage();
            setIsEditing(!isEditing);

            setStatus('saved');
        }
        else if (status === 'saved') {
            setStatus('editing');
            await sendMessage();
            setIsEditing(!isEditing);
        }
    }

    function sendMessage() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000);
        })
    }

    return (
        <div>
            <h1>Personal details</h1>
            {isEditing ? (
                <div>
                    <form action="" onSubmit={handleEditSave}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" placeholder="Enter full name" name="name" id="name" value={name} onChange={(e) => handleNameInput(e)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter email" name="email" id="email" value={email} onChange={(e) => handleEmailInput(e)}/>
                    </div>
                    <div>
                        <label htmlFor="phone-number">Phone number:</label>
                        <input type="text" placeholder="Enter phone number" name="phone-number" id="phone-number" value={phone} onChange={(e)=> handlePhoneInput(e)}/>
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input type="text" placeholder="Enter address" name="address" id="address" value={address} onChange={(e)=> handleAddressInput(e)}/>
                    </div>
                    <div>
                    <button type="submit">Add personal info</button>
                    </div>
                </form>
                {status === 'saving' &&
                        < div >
                            <p>Saving...</p>
                            <div className="spinner"></div>
                        </div>
                }
                </div>
            )
                
            :
                (
                    <div>
                        {status === 'saved' && (
                            <div>
                                <h3>Preview:</h3>
                                <p>Name: {name}</p>
                                <p>Email: {email}</p>
                                <p>Phone: {phone}</p>
                                <p>Address: {address}</p>
                                <button onClick={handleEditSave}>Edit</button>
                            </div>
                        )}
                        {status === 'editing' && (
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