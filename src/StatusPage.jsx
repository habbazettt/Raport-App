/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getNilai } from "./data/data.raport"
import { Triangle } from "react-loader-spinner"
import Lottie from "lottie-react"
import Congrats from './Congrats.json'
import Failed from './Failed.json'
import Effect from './Effect.json'

const StatusPage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const nim = useParams().nim
    const navigate = useNavigate()

    useEffect(() => {
        getNilai((res) => {
            setData(res)
            setIsloading(false)
        })
    }, [])

    const santri = data.find((item) => item.nim == nim)

    return (
        <div>
            {
                isLoading ? <div className='w-full h-screen flex flex-col justify-center items-center gap-4 bg-primary'>
                    <Triangle
                        visible={true}
                        height="100"
                        width="100"
                        color="white"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <h1 className='text-white font-poppins'>Mengambil Data...</h1>
                </div>
                    :
                    <div className={`w-full relative h-screen ${santri?.status == "LULUS" ? "bg-green-600" : "bg-red-600"} flex flex-col justify-center items-center px-2`}>
                        {
                            santri?.status == "LULUS" ? <Lottie animationData={Congrats} loop={true} className="w-[150px]" /> : <Lottie animationData={Failed} loop={true} className="w-[150px]" />
                        }
                        <h1 className="text-4xl text-white text-center">
                            {
                                santri?.status == "LULUS" ? "Selamat," : "Mohon Maaf,"
                            }
                        </h1>
                        <p className="text-4xl text-white font-semibold mt-1 text-center">{santri?.nama}</p>
                        <p className="mt-2 text-lg text-white">
                            {santri?.status == "LULUS" ? "Anda dinyatakan lulus" : "Anda dinyatakan tidak lulus"}
                        </p>

                        <button
                            onClick={() => navigate(`/raport/${nim}`)}
                            className={`bg-white ${santri?.status == "LULUS" ? "text-green-600" : "text-red-600"} rounded-lg text-lg shadow-md px-4 py-2 absolute bottom-10`}
                        >Lihat Raport</button>

                        <div>
                            {
                                santri?.status == "LULUS" && <Lottie animationData={Effect} loop={true} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen z-10" />
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default StatusPage