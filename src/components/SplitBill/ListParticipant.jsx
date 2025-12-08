import logo from "../../assets/LOGO.png";
import {Link, useNavigate, useParams} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";
import {alertError} from "../../lib/alert.js";
import {ParticipantList} from "../../lib/api/BillApi.js";
import {useState} from "react";
import bgMoney from "../../assets/bg-money.png";

export default function ListParticipant() {
    const {kegiatanId} = useParams();
    const [token, _] = useLocalStorage("token", "");
    const [participant, setParticipant] = useState([
        //default value nya
        {
            "id" : 1,
            "name" : "Lionel Bintang",
            "cost_total" : 120000
        }
    ])
    const navigate = useNavigate();

    async function fetchParticipant(){
        const response = await ParticipantList(token, kegiatanId)

        const responseBody = await response.json();

        if (response.status === 200) {
            setParticipant(responseBody.data)
            console.log(responseBody.data)
        }else {
            await alertError(responseBody.errors)
        }
    }

    useEffectOnce(() => {
        fetchParticipant()
            .then(()=> console.log("succes fetch data"))
    })

    // useEffect(() => {
    //     fetchContact()
    //         .then(()=> console.log("succes fetch data"))
    // },[reload])


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
                className="w-full max-w-3xl bg-[#226B80]/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
            >

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-[#FFEBD3] font-poppins">
                        Participants
                    </h2>


                    <Link to={`/dashboard/splitnow/${kegiatanId}/add`}
                        className="px-4 py-2 text-sm rounded-lg bg-[#FFEBD3] text-[#226B80] font-semibold hover:bg-white transition-all duration-300"
                    >
                        + Add People
                    </Link>
                </div>

                <div className="space-y-3">
                    {/*iterasi participant nya */}
                    {/*{participant ? (*/}
                    {/*    participant.map((participant) => (*/}
                    {/*        <Link to={`/dashboard/splitnow/${kegiatanId}/addItem/${participant.id}/items`} key={participant.id}*/}
                    {/*            className="flex items-center justify-between bg-white/20 rounded-xl px-4 py-3"*/}
                    {/*        >*/}

                    {/*            <div className="text-[#FFEBD3] font-medium text-lg">{participant.name}</div>*/}


                    {/*            <div className="flex items-center space-x-4">*/}

                    {/*                <Link to={`/dashboard/splitnow/${kegiatanId}/addItem/${participant.id}`} //ke items add*/}
                    {/*                    className="px-3 py-1 text-sm rounded-md bg-[#226B80] text-[#FFEBD3] hover:bg-[#1A5363] transition"*/}
                    {/*                >*/}
                    {/*                    Add Item*/}
                    {/*                </Link>*/}


                    {/*                <div className="text-[#FFEBD3] font-semibold text-lg">*/}
                    {/*                    Rp {participant.cost_total.toLocaleString("id-ID")}*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </Link>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <div*/}
                    {/*        className="text-center text-[#FFEBD3]/70 py-6 border border-dashed border-[#FFEBD3]/40 rounded-xl">*/}
                    {/*        Belum ada participant*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    {participant ? (
                        participant.map((participant) => (
                            <div
                                key={participant.id}
                                onClick={() =>
                                    navigate(
                                        `/dashboard/splitnow/${kegiatanId}/addItem/${participant.id}/items`
                                    )
                                }
                                className="cursor-pointer flex items-center justify-between bg-white/20 rounded-xl px-4 py-3 hover:bg-white/30 transition"
                            >
                                <div className="text-[#FFEBD3] font-medium text-lg">
                                    {participant.name}
                                </div>

                                <div className="flex items-center space-x-4">

                                    {/* BUTTON ADD ITEM */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // ⛔ stop click ke parent
                                            navigate(
                                                `/dashboard/splitnow/${kegiatanId}/addItem/${participant.id}`
                                            );
                                        }}
                                        className="px-3 py-1 text-sm rounded-md bg-[#226B80] text-[#FFEBD3] hover:bg-[#1A5363] transition"
                                    >
                                        Add Item
                                    </button>

                                    <div className="text-[#FFEBD3] font-semibold text-lg">
                                        Rp {participant.cost_total.toLocaleString("id-ID")}
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-[#FFEBD3]/70 py-6 border border-dashed border-[#FFEBD3]/40 rounded-xl">
                            Belum ada participant
                        </div>
                    )}

                </div>
            </div>

            <div className="flex justify-center mt-3">
                <Link to={`/dashboard/splitnow/${kegiatanId}/summary`}
                    className="bg-[#226B80] text-[#FFEBD3] font-bold text-[20px] px-9 py-2 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-10"
                >
                    Calculate Bill
                </Link>
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