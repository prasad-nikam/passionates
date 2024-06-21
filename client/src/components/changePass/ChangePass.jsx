import React from 'react'
import './style.css';

function ChangePass() {
    return (
        <div className="login-container">
            <h2>Change password</h2>
            <form>
                <input
                    type="password"
                    name="oldpassword"
                    placeholder="Old Password"
                    required
                />
                <input
                    type="password"
                    name="newpassword"
                    placeholder="New Password"
                    required
                />
                <input
                    type="password"
                    name="oldpassword"
                    placeholder="Conferm Password"
                    required
                />
                <button type="submit">Change Password</button>
            </form>
        </div>
    )
}

export default ChangePass