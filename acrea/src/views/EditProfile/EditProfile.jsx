import React, { useState,useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Styles from "./css/EditProfile.module.css";
import { Config } from '../../config/Config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import useApi from '../../utils/useApi';
import { AuthUserDetailsSliceAction } from '../../store/AuthUserDetailsSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function EditProfile() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    var userAuthDetails = useSelector(state => state.AuthUserDetailsSlice);

    const dispatch = useDispatch();
    const [userEditObj, setUserEditObj] = useState({
        usrFullName: userAuthDetails.usrFullName,
        usrEmail: userAuthDetails.usrEmail,
        usrMobileNumber: userAuthDetails.usrMobileNumber,
        usrProfileUrl: userAuthDetails.usrProfileUrl,
        userBio: userAuthDetails.userBio,
    });

    // State for password change
    const [passwordChangeObj, setPasswordChangeObj] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            const response = await fetch(`${Config.apiBaseUrl}/uploadProfileImage`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.profileUrl) {
                setUserEditObj({ ...userEditObj, usrProfileUrl: data.profileUrl });
                toast.success("Profile image updated!");
            } else {
                toast.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Error uploading image");
        }
    };

    async function editUserDetailsHandler(e) {
        e.preventDefault();
    
        if (!userEditObj.usrFullName || !userEditObj.usrMobileNumber) {
            toast.error("Please fill all fields.", {
                position: 'bottom-right',
                theme: "dark",
            });
            return;
        }
    
        try {
            const response = await fetch(`${Config.apiBaseUrl}/updateUserProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userAuthDetails.usrAccessToken}`
                },
                body: JSON.stringify(userEditObj),
            });
    
            const apiResponse = await response.json();
            console.log("API Response:", apiResponse);  // Debugging
    
            if (!response.ok) {
                throw new Error(apiResponse.message || "Failed to update profile");
            }
    
            // Update Redux and Local Storage
            dispatch(AuthUserDetailsSliceAction.setUsrFullName(apiResponse.user_details.usrFullName));
            dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(apiResponse.user_details.usrMobileNumber));
            dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(apiResponse.user_details.usrProfileUrl));
            dispatch(AuthUserDetailsSliceAction.setUserBio(apiResponse.user_details.userBio));
    
            localStorage.setItem("usrFullName", apiResponse.user_details.usrFullName);
            localStorage.setItem("usrMobileNumber", apiResponse.user_details.usrMobileNumber);
            localStorage.setItem("usrProfileUrl", apiResponse.user_details.usrProfileUrl);
            localStorage.setItem("userBio", apiResponse.user_details.userBio);
    
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.message || "Error updating profile");
        }
    }
    

    

    // Password change handler
    async function changePasswordHandler(e) {
        e.preventDefault();
        const { currentPassword, newPassword, confirmNewPassword } = passwordChangeObj;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            toast.error("Please fill all password fields.", {
                position: 'bottom-right',
                theme: "dark",
            });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.", {
                position: 'bottom-right',
                theme: "dark",
            });
            return;
        }

        const apiCallPromise = new Promise(async (resolve, reject) => {
            const apiResponse = await useApi({
                url: "/resetPassword",
                method: "POST",
                authRequired: true,
                authToken: userAuthDetails.usrAccessToken,
                data: {
                    usrPasswordCurrent: passwordChangeObj.currentPassword,
                    usrPasswordNew:passwordChangeObj.confirmNewPassword,
                },
            });

            if (apiResponse && apiResponse.error) {
                reject(apiResponse.error.message);
            } else {
                resolve(apiResponse);
            }
        });

        await toast.promise(apiCallPromise, {
            pending: "Changing password...",
            success: {
                render({ toastProps, closeToast, data }) {
                    return data.message || "Password changed successfully.";
                },
            },
            error: {
                render({ toastProps, closeToast, data }) {
                    return data;
                },
            },
        }, {
            position: 'bottom-right',
            theme: "dark",
        });

        // Clear password fields after successful change
        setPasswordChangeObj({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    }
    useEffect(() => {
        console.log("Redux State Updated:", userAuthDetails);
        setUserEditObj({
            usrFullName: userAuthDetails.usrFullName,
            usrEmail: userAuthDetails.usrEmail,
            usrMobileNumber: userAuthDetails.usrMobileNumber,
            usrProfileUrl: userAuthDetails.usrProfileUrl,
            userBio: userAuthDetails.userBio,
        });
    }, [userAuthDetails]);
    

    return (
        <div className={Styles.editProfileScreen}>
            <Header />
            <div className={Styles.editProfileInnerScreen}>
                <div className={Styles.editProfileContainer}>
                    <div className={Styles.editProfileContainerLeft} style={{ backgroundColor: Config.color.primaryColor100 }}>
                        <img
                            src={userEditObj.usrProfileUrl || Config.imagesPaths.user_null}
                            className={Styles.editProfileContainerLeftImage}
                            alt="Profile"
                        />
                        <form className={Styles.editProfileContainerLeftForm}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <textarea
                                placeholder='Enter your bio.'
                                rows={8}
                                maxLength={250}
                                value={userEditObj.userBio || ""}
                                style={{ fontSize: Config.fontSize.small, color: Config.color.textColor }}
                                 onChange={(e) => setUserEditObj({ ...userEditObj, userBio: e.target.value })} />
                        </form>
                    </div>
                    <div className={Styles.editProfileContainerRight}>
                        <form className={Styles.editProfileContainerRightForm}>
                            <h3>Edit Profile</h3>
                            <input
                                placeholder='Edit your name.'
                                type={"text"}
                                value={userEditObj.usrFullName}
                                onChange={(e) => setUserEditObj({ ...userEditObj, usrFullName: e.target.value })}
                                style={{width: '30rem',
                                    height: '2.5rem',
                                    padding: '1rem',
                                    border: 'none',
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                    borderRadius: '50px'}}
                            />
                            <input
                                placeholder='Edit your email.'
                                type="email"
                                value={userEditObj.usrEmail}
                                onChange={(e) => setUserEditObj({ ...userEditObj, usrEmail: e.target.value })}
                                disabled
                            />
                            <input
                                placeholder='Edit your phone number.'
                                type={"number"}
                                value={userEditObj.usrMobileNumber}
                                onChange={(e) => setUserEditObj({ ...userEditObj, usrMobileNumber: e.target.value })}
                            />
                        </form>
                        <div className={Styles.editProfileContainerRightButtonsDiv}>
                            <button className="btn btn-primary" onClick={(e) => { editUserDetailsHandler(e) }}>Save</button>
                            <button className="btn btn-danger" onClick={() => navigate("/")}>Cancel</button>
                        </div>
                    </div>
                </div>

                {/* Password Change Section */}
                <div className={Styles.passwordChangeSection}>
                    <h3>Change Password</h3>
                    <form onSubmit={changePasswordHandler} className={Styles.editProfileContainerRightForm}>
                        <div style={{
                            alignItems: "center",
                            justifyContent: "right"
                        }}>
                            <div style={{ flexDirection: 'column'}}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Current Password"
                                    value={passwordChangeObj.currentPassword}
                                    onChange={(e) => setPasswordChangeObj({ ...passwordChangeObj, currentPassword: e.target.value })}
                                    style={{marginTop:'2px'}}
                                />
                            </div>
                            <RemoveRedEyeIcon onClick={() => { setShowPassword(!showPassword) }} 
                                className={Styles.screenRightContainerMidFormEyeIcon}
                                style={{ cursor: 'pointer' }}/>
                        </div>
                        <div style={{
                            alignItems: "center",
                            justifyContent: "right"
                        }}>
                            <div style={{ flexDirection: 'column' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    value={passwordChangeObj.newPassword}
                                    onChange={(e) => setPasswordChangeObj({ ...passwordChangeObj, newPassword: e.target.value })}
                                />
                            </div>
                            <RemoveRedEyeIcon onClick={() => { setShowPassword(!showPassword) }} 
                                className={Styles.screenRightContainerMidFormEyeIcon}
                                style={{ cursor: 'pointer' }}/>
                        </div>
                        <div style={{
                            alignItems: "center",
                            justifyContent: "right"
                        }}>
                            <div style={{ flexDirection: 'column' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Confirm New Password"
                                    value={passwordChangeObj.confirmNewPassword}
                                    onChange={(e) => setPasswordChangeObj({ ...passwordChangeObj, confirmNewPassword: e.target.value })}
                                />
                            </div>
                            <RemoveRedEyeIcon onClick={() => { setShowPassword(!showPassword) }} 
                                className={Styles.screenRightContainerMidFormEyeIcon}
                                style={{ cursor: 'pointer' }}/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={(e) => { changePasswordHandler(e) }}>Change Password</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default EditProfile;
