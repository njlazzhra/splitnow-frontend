import logo from "../../assets/LOGO.png";
import {Link, useParams} from "react-router";
import {alertError} from "../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {useState} from "react";
import {summaryBill} from "../../lib/api/BillApi.js";

export default function SummaryBill() {

    const {kegiatanId} = useParams();
    const [token, _] = useLocalStorage("token", "");
    const [namageKegiatan, setKegiatans] = useState("")
    const [dataKegiatan, setDataKegiatan] = useState("")
    const [subTotal, setSubTotal] = useState("")
    const [totalPembayaran, setTotalPembayaran] = useState("")
    const [tax, setTax] = useState("")
    const [participant, setParticipant] = useState([
        //default value nya
        {
            "id" : 1,
            "name" : "Lionel Bintang",
            "subTotal" : 120000,
            "tax" : 10,
            "totalPembayaran" : 1200000
        }
    ])


    async function fetchSummary(){
        const response = await summaryBill(token, kegiatanId)
        const responseBody = await response.json();


        if (response.status === 200) {
            setParticipant(responseBody.data.participants)
            setKegiatans(responseBody.data.name)
            setDataKegiatan(responseBody.data.event_date)
            setSubTotal(responseBody.data.subTotal.toLocaleString("id-ID", {style: "currency", currency: "IDR"}))
            setTotalPembayaran(responseBody.data.totalPembayaran.toLocaleString("id-ID", {style: "currency", currency: "IDR"}))
            setTax(responseBody.data.taxPercentage)
            console.log(responseBody.data)
        }else {
            await alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        fetchSummary()
            .then(()=> console.log("succes fetch data"))
    })



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


            <div
                className="w-full max-w-3xl bg-[#226B80]/50 rounded-2xl p-8 shadow-lg backdrop-blur-md"
            >


                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-[#FFEBD3]/70 text-sm mb-1">Event Name</p>
                        <h2 className="text-2xl font-bold text-[#FFEBD3]">
                            {namageKegiatan ? namageKegiatan : "Loading..."}
                        </h2>
                    </div>

                    <div className="text-right">
                        <p className="text-[#FFEBD3]/70 text-sm mb-1">Date</p>
                        <p className="text-lg font-semibold text-[#FFEBD3]">
                            {dataKegiatan ? new Date(dataKegiatan).toLocaleDateString("id-ID"): "Loading..."}
                        </p>
                    </div>
                </div>


                <div className="space-y-3 mb-6">
                    {participant ? (
                        participant.map((participant) => (
                            <div className="flex items-center justify-between bg-[#226B80]/70 rounded-xl px-5 py-4" key={participant.id}>

                            <div className="flex items-center space-x-3">
                                <i className="fas fa-user-cog text-secondary text-2xl mr-3"></i>

                            <span className="text-[#FFEBD3] font-medium text-lg">
                            {participant ? participant.name : "Loading..."}
                            </span>
                        </div>


                            <div className="text-[#FFEBD3] font-semibold text-lg">
                                {participant ? "Rp " + participant.total: "Loading..."}
                            </div>
                    </div>
                        ))
                    ) : (
                        <div
                            className="text-center text-[#FFEBD3]/70 py-6 border border-dashed border-[#FFEBD3]/40 rounded-xl">
                            Nggak beli apa apa kelen
                        </div>
                    )}
                    {/*<div className="flex items-center justify-between bg-[#226B80]/70 rounded-xl px-5 py-4">*/}

                    {/*    <div className="flex items-center space-x-3">*/}
                    {/*        <img*/}
                    {/*            src="asset/user-icon.png"*/}
                    {/*            alt="user"*/}
                    {/*            className="w-8 h-8 rounded-full bg-[#FFEBD3]"*/}
                    {/*        />*/}

                    {/*        <span className="text-[#FFEBD3] font-medium text-lg">*/}
                    {/*        Bintang*/}
                    {/*        </span>*/}
                    {/*    </div>*/}


                    {/*        <div className="text-[#FFEBD3] font-semibold text-lg">*/}
                    {/*            Rp 120.000*/}
                    {/*        </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex items-center justify-between bg-[#226B80]/70 rounded-xl px-5 py-4">*/}
                    {/*    <div className="flex items-center space-x-3">*/}
                    {/*        <img*/}
                    {/*            src="asset/user-icon.png"*/}
                    {/*            alt="user"*/}
                    {/*            className="w-8 h-8 rounded-full bg-[#FFEBD3]"*/}
                    {/*        />*/}

                    {/*        <span className="text-[#FFEBD3] font-medium text-lg">*/}
                    {/*            Fadil*/}
                    {/*        </span>*/}
                    {/*    </div>*/}

                    {/*    <div className="text-[#FFEBD3] font-semibold text-lg">*/}
                    {/*        Rp 85.000*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>


                <div
                    className="flex items-center justify-between
                    bg-[#226B80]/70 rounded-xl px-6 py-4"
                >


                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-[#FFEBD3]/70">Subtotal:</span>
                            <span className="text-[#FFEBD3] font-medium">
                                {subTotal ? subTotal : "Loading..."}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-[#FFEBD3]/70">Tax (10%):</span>
                            <span className="text-[#FFEBD3] font-medium">
                                {tax ? tax + "%" : "Loading..."}
                            </span>
                        </div>
                    </div>


                    <div className="text-right">
                        <p className="text-sm text-[#FFEBD3]/70 mb-1">Total</p>
                        <p className="text-2xl font-bold text-[#FFEBD3]">
                            {totalPembayaran ?  totalPembayaran : "Loading..."}
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex justify-center mt-6">
                <Link to={`/dashboard/splitnow`}
                    className="bg-[#226B80] text-[#FFEBD3]
               font-bold text-[20px]
               px-14 py-4 rounded-2xl
               shadow-lg
               hover:shadow-xl hover:-translate-y-1
               transition-all duration-300"
                >
                    Selesai
                </Link>
            </div>

        </div>

    </main>

    </div>
}