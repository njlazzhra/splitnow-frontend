import logo from "../../assets/LOGO.png";
import {Link, useNavigate, useParams} from "react-router";

import {alertError, alertSuccess} from "../../lib/alert.js";
import {useState} from "react";
import {useLocalStorage} from "react-use";
import {addParticipant} from "../../lib/api/BillApi.js";
import bgMoney from "../../assets/bg-money.png";

export default function AddParticipant() {
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [token, _] = useLocalStorage("token", "")
    const navigate = useNavigate();
    const {kegiatanId} = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true); // Disable button

        const response = await addParticipant(token,kegiatanId,name);
        const responseBody = await response.json();
        if(response.status === 201){
            await alertSuccess("Berhasil menambahkan participant")
            navigate({
                pathname : `/dashboard/splitnow/${kegiatanId}/participant`,
            })
        }else{
            console.log(responseBody.taxPercentage)
            await alertError("Error "+ responseBody.error)
        }

        setTimeout(() =>{
            setIsSubmitting(false)
        },2000)

    }

    return <div className="m-0 p-0">


        <nav className="w-full bg-[#226B80] text-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="2xl:h-15 h-10 w-auto"/>
                </div>
                <div className="flex items-center space-x-4">

                    <Link to="/dashboard/splitnow"
                          className=" px-4 py-2 rounded-lg text-[#FFEBD3] btn-animate  font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] hover:text-[#226B80]">
                        Home
                    </Link>

                    <Link to="/dashboard/splitnow/create"
                          className="px-4 py-2 rounded-lg  font-medium text-[24px] transition-all duration-300 bg-[#FFEBD3] text-[#226B80]">
                        New Split
                    </Link>

                    <Link to="/dashboard/user/profile"
                          className="px-4 py-2 rounded-lg btn-animate  font-medium text-[24px] transition-all duration-300 hover:bg-[#FFEBD3] hover:text-[#226B80] ">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>


    <main className="min-h-screen bg-[#FFEAA5] flex flex-col pt-20">

        <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                <h2 className="text-3xl font-bold text-[#226B80] mb-6 text-center font-poppins">
                    Tambah Participant
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>


                    <div>
                        <label htmlFor="participant-name" className="block text-[#226B80] font-medium mb-1">
                            Nama Participant
                        </label>
                        <input onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="participant-name"
                            name="participant-name"
                            placeholder="Masukkan nama participant"
                            className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50 bg-[#FFEBD3]/50
                   focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50
                   transition-all duration-300"
                        />
                    </div>


                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-[#226B80] text-[#FFEBD3]
                   font-bold font-poppins btn-animate hover:bg-[#1A5363] transition-all duration-300">
                            Tambah Participant
                        </button>
                    </div>

                </form>
            </div>
        </div>

        <div
            className="flex-1 relative flex items-end justify-center bg-contain bg-no-repeat 2xl:bg-repeat bg-bottom"
            style={{ backgroundImage: `url(${bgMoney})` }}
        >
        </div>

    </main>

    </div>
}