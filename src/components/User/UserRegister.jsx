import dinnerImage from '../../assets/dinner-1.png';
import logo from '../../assets/LOGO.png';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../../lib/alert.js";
import { userRegister } from "../../lib/api/UserApi.jsx";

export default function UserRegister() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        if (password !== confirmPassword) {
            return alertError("password and confirm password not match");
        }
        setIsSubmitting(true);

        try {
            const response = await userRegister({
                username: username,
                password: password,
                name: name
            });

            const responseBody = await response.json();
            console.log(responseBody);

            if (response.status === 201) {
                await alertSuccess("Register Success");
                navigate("/login");
            } else {
                await alertError(responseBody.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            await alertError("Register failed");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="h-full overflow-hidden bg-primary">
            <div className="min-h-screen flex">

                <div className="hidden lg:block w-1/2 relative">
                    <img
                        src={dinnerImage}
                        alt="Hero"
                        className="absolute h-full w-full object-cover"
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6">
                    <div className="w-full max-w-md">

                        <div className="text-center mb-3">
                            <img src={logo} alt="Logo" className="mx-auto h-14 w-auto" />
                        </div>

                        <div className="text-center mb-2">
                            <h2 className="text-3xl font-bold text-secondary mb-2">
                                Buat Akun Baru
                            </h2>
                            <p className="text-secondary/80">
                                Isi data berikut untuk membuat akun Anda.
                            </p>
                        </div>

                        <div className="glass-effect rounded-2xl p-4 shadow-xl">
                            <form className="space-y-2" onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama lengkap"
                                    className="input-focus w-full p-3 border border-accent rounded-lg"
                                />

                                <input
                                    type="email"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Email / Username"
                                    className="input-focus w-full p-3 border border-accent rounded-lg"
                                />

                                <input
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="input-focus w-full p-3 border border-accent rounded-lg"
                                />

                                <input
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="input-focus w-full p-3 border border-accent rounded-lg"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`btn-hover w-full py-3 rounded-xl text-white ${
                                        isSubmitting
                                            ? "bg-secondary/50"
                                            : "bg-secondary hover:bg-secondary/80"
                                    }`}
                                >
                                    {isSubmitting ? "Loading..." : "Daftar ke Akun"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-secondary/80">
                                    Sudah punya akun?{" "}
                                    <Link to="/login" className="font-medium text-secondary">
                                        Masuk sekarang
                                    </Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
