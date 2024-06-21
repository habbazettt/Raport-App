/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { getNilai } from "./data/data.raport"
import { Triangle } from "react-loader-spinner"
import { Key, Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import VerifModal from "./VerifModal"

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getNilai((res) => {
      setData(res)
      setIsloading(false)
    })
  }, [data])

  const handleSearch = (e) => {
    navigate(`/status/${search}`)
    console.log(search);
  }

  const handleModal = () => {
    setOpenModal(!openModal)
  }


  return (
    <div className="w-full absolute h-screen">
      {
        isLoading ? <div className='w-full h-screen flex flex-col justify-center items-center gap-4 bg-primary z-10'>
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
          <div className="container mx-auto p-5 relative">
            <img src="/logo.svg" alt="" className="w-[180px]" />

            <img src="/quran.jpg" alt="" className="w-[250px] mx-auto mt-10" />
            <div className="-mt-3">
              <h1 className="text-center text-2xl font-semibold text-primary">Selamat Datang di Website <br />MTA Student Management System</h1>
            </div>
            <div className="w-full flex justify-center gap-3">
              <div className="relative mt-6 w-[76%]">
                <input onKeyDown={(e) => { if (e.key === 'Enter') { handleModal() } }} onChange={(e) => setSearch(e.target.value)} type="text" id="search" placeholder="Masukkan NIM" className="w-full border border-primary rounded-md p-2 font-poppins" />
                <Search className="absolute translate-y-[-50%] right-3 top-[50%] h-4 w-4 text-gray-500" />
              </div>
              <div className="mt-6 flex justify-center items-center">
                <button className="bg-primary text-white font-poppins rounded-md py-2.5 px-4" onClick={() => setOpenModal(true)}>Cari</button>
              </div>

            </div>

            <VerifModal open={openModal} onClose={handleModal}>
              <div className="w-[340px] lg:container mx-auto">
                <h1 className="text-center text-3xl font-semibold">Verifikasi Data</h1>
                <p className="text-center mt-2 text-lg">Anda akan diarahkan ke halaman raport milik santri <span className="font-semibold">{data.find((item) => item.nim == search)?.nama}</span>, Lanjutkan?</p>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <button className="bg-red-600 text-white font-poppins rounded-md py-2.5 px-3" onClick={() => setOpenModal(false)}>Tidak, Kembali</button>
                <button className="bg-green-600 text-white font-poppins rounded-md py-2.5 px-3" onClick={handleSearch}>Ya, Lanjutkan</button>
              </div>
            </VerifModal>
          </div>
      }
      <p className={`w-full text-center absolute text-xs bottom-6 right-1/2 translate-x-1/2 ${isLoading ? 'hidden' : 'block'} text-black/60 z-9`}>&copy;Copyright {new Date().getFullYear()} by Habbaza.id</p>
    </div>
  )
}

export default App