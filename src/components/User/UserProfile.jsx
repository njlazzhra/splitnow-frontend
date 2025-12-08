import logo from '../../assets/LOGO.png';
import {useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {userDetailProfile, userUpdatePassword, userUpdateProfile} from "../../lib/api/UserApi.jsx";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {Link, useNavigate} from "react-router";

export default function UserProfile() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, _] = useLocalStorage("token", "")


    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login"); // redirect ke halaman lain
    }


    async function handleSubmitProfile(e) {
        e.preventDefault();

        const response = await userUpdateProfile(token, name);

        const responseBody = await response.json()
        console.log(responseBody)
        if(response.status === 200){
            await alertSuccess("Update Profile Success")
        }else{
            await alertError(responseBody.message)
        }
    }
    async function handleSubmitPassword(e) {
        e.preventDefault();

        if(password !== confirmPassword) {
            await alertError("password and confirm password not macth")
            return;
        }

        const response = await userUpdatePassword(token, password);

        const responseBody = await response.json();
        console.log(responseBody)
        if(response.status === 200) {
            setPassword('')
            setConfirmPassword('')
            await alertSuccess("Update password Successfully")
        }else{
            await alertError(responseBody.message)
            await alertError(responseBody.error)
        }
    }

    async function fetchUserDetail() {
        const response = await userDetailProfile(token)
        const responseBody = await response.json()
        console.log(responseBody)
        if(response.status === 200){
            setName(responseBody.data.name)
        }else{
            await alertError(responseBody.message)
            await alertError(responseBody.error)
        }
    }

    useEffectOnce(() => {
        fetchUserDetail()
            .then( () => console.log("user detail fetch successfully"))
    })



    return <div className="min-h-screen flex flex-col relative">


    <nav className="w-full bg-[#226B80] text-white fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="2xl:h-15 h-10 w-auto"/>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/dashboard/splitnow"
                   className="px-4 py-2 rounded-lg text-[#FFEBD3] font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] btn-animate  hover:text-[#226B80]">Home</Link>
                <Link to="/dashboard/splitnow/create"
                   className="px-4 py-2 rounded-lg text-[#FFEBD3] font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] btn-animate  hover:text-[#226B80]">New Split</Link>
                <Link to="/dashboard/user/profile"
                   className="px-4 py-2 rounded-lg font-medium text-[24px] transition-all duration-300 bg-[#FFEBD3] btn-animate  text-[#226B80]">Profile</Link>
            </div>
        </div>
    </nav>


    <div className="absolute bottom-0 left-0 w-full h-[300px] z-0">
        <div
            className="absolute bottom-0 w-full h-full bg-[url('asset/bg-money.png')] bg-contain  bg-bottom opacity-20 pointer-events-none"></div>
    </div>


        <main className="container mx-auto px-4 py-40 flex-grow z-10 relative">
            <div className="flex items-center mb-6">
                <i className="fas fa-user-cog text-secondary text-2xl mr-3"></i>
                <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div
                    className="bg-white/10 rounded-xl shadow-custom border border-secondary/30 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user-edit text-primary"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-secondary">Edit Profile</h2>
                        </div>
                        <form onSubmit={handleSubmitProfile}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block text-secondary text-sm font-medium mb-2">Full
                                    Name</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-user text-secondary/60"></i>
                                    </div>
                                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}
                                           className="w-full pl-10 pr-3 py-3 bg-primary/10 border border-secondary/40 text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                                           placeholder="Enter your full name" value={name} required/>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit"
                                        className="w-full bg-secondary text-primary py-3 px-4 rounded-lg hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                                    <i className="fas fa-save mr-2"></i> Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


                <div
                    className="bg-white/10 rounded-xl shadow-custom border border-secondary/30 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <div
                                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-key text-primary"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-secondary">Change Password</h2>
                        </div>
                        <form onSubmit={handleSubmitPassword}>
                            <div className="mb-5">
                                <label htmlFor="new_password" className="block text-secondary text-sm font-medium mb-2">New
                                    Password</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-lock text-secondary/60"></i>
                                    </div>
                                    <input type="password" id="new_password" name="new_password"
                                           onChange={(e) => setPassword(e.target.value)}
                                           className="w-full pl-10 pr-3 py-3 bg-primary/10 border border-secondary/40 text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                                           placeholder="Enter your new password" required/>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="confirm_password"
                                       className="block text-secondary text-sm font-medium mb-2">Confirm
                                    New Password</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-check-double text-secondary/60"></i>
                                    </div>
                                    <input type="password" id="confirm_password" name="confirm_password"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           className="w-full pl-10 pr-3 py-3 bg-primary/10 border border-secondary/40 text-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                                           placeholder="Confirm your new password" required/>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button type="submit"
                                        className="w-full bg-secondary text-primary py-3 px-4 rounded-lg hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                                    <i className="fas fa-key mr-2"></i> Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-10  flex justify-center animate-fade-in">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-3 px-6 btn-animate rounded-lg text-lg font-medium shadow-lg hover:bg-red-700 transition-all duration-300">
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
            </div>


            <div className="mt-10 mb-6 text-center text-secondary/70 text-sm animate-fade-in z-10 relative">
                <p>© 2025 Split Now. All rights reserved.</p>
            </div>
        </main>
    </div>
}