import React, { useState } from 'react';
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

    async function editUserDetailsHandler(e) {
        e.preventDefault();
        if (userEditObj.usrEmail === "" || userEditObj.usrFullName === "" || userEditObj.usrMobileNumber === "") {
            toast.error("Please fill all fields.", {
                position: 'bottom-right',
                theme: "dark",
            });
        } else {

            // toast notification
            const apiCallPromise = new Promise(async (resolve, reject) => {
                const apiResponse = await useApi({
                    url: "/updateUserProfile",
                    method: "POST",
                    authRequired: true,
                    authToken: userAuthDetails.usrAccessToken,
                    data: {
                        usrFullName: userEditObj.usrFullName,
                        usrEmail: userEditObj.usrEmail,
                        usrMobileNumber: userEditObj.usrMobileNumber,
                        usrProfileUrl: userEditObj.usrProfileUrl === "" ? null : userEditObj.usrProfileUrl,
                        userBio: userEditObj.userBio === "" ? null : userEditObj.userBio,
                    },
                });

                if (apiResponse && apiResponse.error) {
                    reject(apiResponse.error.message);
                } else {
                    resolve(apiResponse);
                }
            });

            await toast.promise(apiCallPromise, {
                pending: "Editing user details..!!",
                success: {
                    render({ toastProps, closeToast, data }) {
                        dispatch(AuthUserDetailsSliceAction.setUsrEmail(data.user_details.usrEmail));
                        localStorage.setItem("usrEmail", data.user_details.usrEmail);
                        dispatch(AuthUserDetailsSliceAction.setUsrFullName(data.user_details.usrFullName));
                        localStorage.setItem("usrFullName", data.user_details.usrFullName);
                        dispatch(AuthUserDetailsSliceAction.setUsrMobileNumber(data.user_details.usrMobileNumber));
                        localStorage.setItem("usrMobileNumber", data.user_details.usrMobileNumber);
                        dispatch(AuthUserDetailsSliceAction.setUsrProfileUrl(data.user_details.usrProfileUrl));
                        localStorage.setItem("usrProfileUrl", data.user_details.usrProfileUrl);
                        dispatch(AuthUserDetailsSliceAction.setUserBio(data.user_details.userBio));
                        localStorage.setItem("userBio", data.user_details.userBio);
                        return data.message || "Account details updated successfully.";
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

    return (
        <div className={Styles.editProfileScreen}>
            <Header />
            <div className={Styles.editProfileInnerScreen}>
                <div className={Styles.editProfileContainer}>
                    <div className={Styles.editProfileContainerLeft} style={{ backgroundColor: Config.color.primaryColor100 }}>
                        <img
                            src={userAuthDetails.usrProfileUrl ? userAuthDetails.usrProfileUrl : Config.imagesPaths.user_null}
                            className={Styles.editProfileContainerLeftImage}
                        />
                        <form className={Styles.editProfileContainerLeftForm}>
                            <input
                                type='url'
                                placeholder='Enter profile image URL.'
                                style={{ fontSize: Config.fontSize.small, color: Config.color.textColor }}
                                value={userEditObj.usrProfileUrl === null ? "" : userEditObj.usrProfileUrl}
                                onChange={(e) => setUserEditObj({ ...userEditObj, usrProfileUrl: e.target.value })}
                            />
                            <textarea
                                placeholder='Enter your bio.'
                                rows={8}
                                maxLength={250}
                                value={userEditObj.userBio === null ? "" : userEditObj.userBio}
                                style={{ fontSize: Config.fontSize.small, color: Config.color.textColor }}
                                onChange={(e) => setUserEditObj({ ...userEditObj, userBio: e.target.value })}
                            />
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
                            <div style={{ flexDirection: 'column' }}>
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
