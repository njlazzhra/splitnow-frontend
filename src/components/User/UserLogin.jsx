import dinnerImage from '../../assets/dinner-1.png';
import logo from '../../assets/LOGO.png';
import {useState} from "react";
import {Link, useNavigate} from "react-router";
import {useLocalStorage} from "react-use";
import {userLogin} from "../../lib/api/UserApi.jsx";
import {alertError} from "../../lib/alert.js";


export default function UserLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [_, setToken] = useLocalStorage("token", "")
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true); // Disable button
        const response = await userLogin({
            username: username,
            password: password
        });
        const responseBody = await response.json();
        console.log(responseBody)
        if(response.status === 200){
            //save data token nya
            const token = responseBody.data.token;
            setToken(token);

            await navigate({
                pathname : '/dashboard/splitnow'
            })
        }else {
            await alertError(responseBody.message)
            setIsSubmitting(false);
        }

        setTimeout(() =>{
            setIsSubmitting(false)
        },2000)

    }

    return <div className="h-full overflow-hidden bg-primary">

    <div className="min-h-screen flex">


        <div className="hidden lg:block w-1/2 relative">
            <img src={dinnerImage} alt="Hero" className="absolute h-full w-full object-cover"/>
        </div>


        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
            <div className="w-full max-w-md">


                <div className="text-center mb-8">
                    <img src={logo} alt="Logo" className="mx-auto h-20 w-auto"/>
                </div>


                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-secondary mb-2">Masuk ke Akun</h2>
                    <p className="text-secondary/80">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
                </div>


                <div className="glass-effect rounded-2xl p-8 shadow-xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">Alamat
                                Email/Username</label>
                            <div className="relative">
                                <input type="email" id="email" name="email" required onChange={(e) => setUsername(e.target.value)}
                                       placeholder="masukkan@email.anda"
                                       className="input-focus block w-full pl-3 pr-3 py-3 border border-accent rounded-lg bg-white/50 text-secondary placeholder-accent/60 focus:outline-none focus:ring-0 transition-all duration-300"/>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">Kata
                                Sandi</label>
                            <div className="relative">
                                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}
                                       placeholder="••••••••"
                                       className="input-focus block w-full pl-3 pr-3 py-3 border border-accent rounded-lg bg-white/50 text-secondary placeholder-accent/60 focus:outline-none focus:ring-0 transition-all duration-300"/>
                            </div>
                        </div>


                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-secondary">
                                <input type="checkbox" className="h-4 w-4 text-secondary border-accent rounded mr-2"/>
                                Ingat saya
                            </label>

                        </div>


                        <div>
                            <button
                                type="submit"
                                className={`btn-hover w-full py-3 px-4 rounded-xl text-white font-medium text-lg transition-all duration-300 ${
                                    isSubmitting
                                        ? "bg-secondary/50 cursor-not-allowed"
                                        : "bg-secondary hover:bg-secondary/80"
                                }`}
                                disabled={isSubmitting} // Nonaktifkan tombol jika sedang submit
                            >
                                {isSubmitting ? "Loading..." : "Masuk ke Akun"}
                            </button>

                        </div>


                        <div className="grid grid-cols-1">
                            <button type="button" onClick={() => window.location.href = `${import.meta.env.VITE_API_GOOGLE}/auth/google`}
                                    className="w-full flex justify-center items-center py-2 px-4 border border-accent rounded-lg bg-white/70 text-secondary hover:bg-white hover:shadow-md transition-all duration-300">
                                Google
                            </button>

                        </div>

                    </form>


                    <div className="mt-6 text-center">
                        <p className="text-secondary/80">
                            Belum punya akun?
                            <Link to="/register"
                               className="font-medium text-secondary hover:text-secondary/90 transition-colors">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>

    </div>
}