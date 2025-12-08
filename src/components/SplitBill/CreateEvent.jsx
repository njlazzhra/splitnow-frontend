import logo from '../../assets/LOGO.png';
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useLocalStorage} from "react-use";
import {useState} from "react";
import {Link, useNavigate} from "react-router";
import {CreateKegiatan} from "../../lib/api/BillApi.js";
import bgMoney from "../../assets/bg-money.png";


export default function CreateEvent() {

    const[name, setName] = useState('')
    const[event_date, setEventDate] = useState('')
    const[location, setLocation] = useState('')
    const[taxPercentage, setTaxPercentage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [token, _] = useLocalStorage("token", "")
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return; // Prevent double submission
        setIsSubmitting(true); // Disable button

        const response = await CreateKegiatan(token,name,event_date,location,taxPercentage );
        const responseBody = await response.json();
        console.log(responseBody)
        if(response.status === 201){
            await alertSuccess("Berhasil membuat event baru")
            navigate({
                pathname : `/dashboard/splitnow/${responseBody.data.id}/participant`,
            })
        }else{
            console.log(responseBody.taxPercentage)
            await alertError("silahkan login terlebih dahulu "+ responseBody.error)
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


            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md bg-white/20 backdrop-blur-lg glass-effect rounded-2xl p-5 shadow-lg">
                    <h2 className="text-3xl font-bold text-[#226B80] mb-6 text-center font-poppins">Buat Event Baru</h2>
                    <form className="space-y-2" onSubmit={handleSubmit}>


                        <div>
                            <label htmlFor="event-name" className="block text-[#226B80] font-medium mb-1">Event Name</label>
                            <input type="text" id="event-name" name="event-name" placeholder="Masukkan nama event" onChange={(e) => setName(e.target.value)}
                                   className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50 focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50 transition-all duration-300"/>
                        </div>


                        <div>
                            <label htmlFor="event-date" className="block text-[#226B80] font-medium mb-1">Event Date</label>
                            <input type="date" id="event-date" name="event-date" onChange={(e) => setEventDate(e.target.value)}
                                   className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50 focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50 transition-all duration-300"/>
                        </div>


                        <div>
                            <label htmlFor="location" className="block text-[#226B80] font-medium mb-1">Location</label>
                            <input type="text" id="location" name="location" placeholder="Masukkan lokasi" onChange={(e) => setLocation(e.target.value)}
                                   className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50 focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50 transition-all duration-300"/>
                        </div>


                        <div>
                            <label htmlFor="tax" className="block text-[#226B80] font-medium mb-1">
                                Tax (%)
                            </label>
                            <input onChange={(e) => setTaxPercentage(e.target.value)}
                                   type="number"
                                   id="tax"
                                   name="tax"
                                   placeholder="Contoh: 10"
                                   min="0"
                                   step="0.01"
                                   className="w-full px-4 py-3 rounded-lg border border-[#226B80]/50
           focus:border-[#226B80] focus:ring-1 focus:ring-[#226B80]/50
           transition-all duration-300"/>
                        </div>



                        <div className="pt-4">
                            <button type="submit"
                                    className="w-full py-3 rounded-xl bg-[#226B80] text-[#FFEBD3] font-bold font-poppins btn-animate hover:bg-[#1A5363] transition-all duration-300">
                                Buat Event
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