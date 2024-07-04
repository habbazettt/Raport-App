import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getNilai } from "./data/data.raport"
import { Triangle } from "react-loader-spinner"
import { FileText, Home } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const DetailsPage = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const nim = useParams().nim
    const navigate = useNavigate()
    const pdfRef = useRef()

    useEffect(() => {
        getNilai((res) => {
            setData(res)
            setIsloading(false)
        })
    }, [])

    const downloadPDF = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save(`Raport Tahfidz ${santri.nama} ${santri.nim}.pdf`);
            navigate('/')
        })
    }

    const santri = data.find((item) => item.nim == nim)
    console.log(santri);

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
                    <>
                        <div ref={pdfRef} className="w-[390px] h-full mx-auto sm:mt-10 mt-0 border border-black relative">
                            <div className="text-center p-2.5 relative mx-auto bg-primary text-white">
                                <div className="flex justify-center items-center -mt-5">
                                    <img src="/logoMahadPutih.svg" alt="" className="w-[46px] ml-6" />
                                    <img src="/logoUINPutih.svg" alt="" className="w-[96px] -ml-3" />
                                </div>
                                <h1 className="text-[16px] font-bold -mt-4">MAHAD TAHFIDZ</h1>
                                <h1 className="text-sm font-semibold -mt-1">UIN Sunan Gunung Djati Bandung</h1>
                                <h1 className="text-xs font-light">Tahun Akademik 2023-2024</h1>
                            </div>

                            <div className="w-full h-[1px] bg-black -mt-1.5" />

                            <h1 className="text-center mt-4 font-extrabold">RAPORT KELULUSAN MAHASANTRI</h1>
                            <div className="mt-2 w-[90%] mx-auto">
                                <h1 className="text-sm">No Induk Mahasiswa : {santri?.nim}</h1>
                                <h1 className="text-sm">Nama Mahasantri : {santri?.nama}</h1>
                                <h1 className="text-sm font-semibold">Mentor : {santri?.mentor}</h1>
                                <h1 className="mt-0.5 text-[15px]">Nilai Raport:</h1>
                            </div>

                            <div className="w-[80%] mx-auto text-sm">
                                <div className="flex justify-between">
                                    <h1>Keaktifan RITMA :</h1>
                                    <h1>{santri?.aktif_ritma}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Target dan Setoran :</h1>
                                    <h1>{santri?.target_setoran}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Keaktifan Mahasantri :</h1>
                                    <h1>{santri?.aktif_mahasantri}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Golden Ticket :</h1>
                                    <h1>{santri?.golden_ticket}</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Total Nilai :</h1>
                                    <h1>{santri?.total}</h1>
                                </div>
                                <div className="flex justify-between font-bold mt-0.5">
                                    <h1>Keterangan:</h1>
                                    <h1>{santri?.status}</h1>
                                </div>

                                <div className="flex justify-between font-bold mt-0.5">
                                    <h1>Pembagian Kamar :</h1>
                                    <h1>{santri?.kamar}</h1>
                                </div>
                            </div>

                            <div className="w-full px-3 mx-auto text-center mt-2 font-semibold">
                                {
                                    santri?.status === 'LULUS' ?
                                        <p className="text-[16px]">Selamat anda dinyatakan LULUS! Terimakasih atas dedikasi dan perjuangannya. Ingatlah untuk senantiasa bersyukur</p>
                                        :
                                        <p className="text-[16px]">Tetap semangat melangkah bersama Qur&apos;an. Terimakasih dan jangan bersedih, masih banyak kesempatan di depan</p>
                                }
                            </div>

                            <h1 className="text-right mt-2 mr-5 text-sm">Bandung, 2 Juli 2024</h1>

                            <div className="text-center mx-auto mt-2 pb-5">
                                <p className="text-[16px]">Mengetahui,</p>
                                <p className="text-[16px] -mt-1">Direktur Mahad Tahfidz</p>
                                <img src="/signature.png" alt="" className="w-[110px] mx-auto -mt-3" />
                                <h1 className="font-bold underline -mt-3 text-sm">DR. KH. Asep Musthofa Kamal, M.Ag</h1>
                                <p className="text-xs">NIP. 196104281993031002</p>
                            </div>

                            <img src="/logoMTA.svg" alt="" className="absolute opacity-[0.17] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] -z-10" />
                            <img src="/Stempel.png" alt="" className="absolute -bottom-14 -left-7 w-[400px] -z-10" />
                        </div>

                        <div className="flex justify-center px-4 py-5 gap-4">
                            <button onClick={() => navigate('/')} className="mt-3 bg-primary rounded-md text-white px-3 py-1 font-poppins flex gap-1"><Home className="w-4" />Beranda</button>
                            <button onClick={downloadPDF} className="mt-3 bg-red-500 rounded-md text-white px-3 py-1 font-poppins flex gap-1"><FileText className="w-4" />Cetak PDF</button>
                        </div>
                    </>
            }
        </div >
    )
}

export default DetailsPage