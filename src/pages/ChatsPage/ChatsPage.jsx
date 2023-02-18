import { RiChat1Line,RiMore2Fill,RiArchiveLine,RiSearchEyeLine} from "react-icons/ri";
export function ChatsPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 xl:grid-cols-4 bg-[#0B131A] text-gray-300">
            {/*Contactos*/}
            <div className="bg-[#1B2831] flex flex-col gap-6">
                {/*Perfil*/}
                <div className="p-4 h-[20vh]">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <img 
                                src="https://img.freepik.com/foto-gratis/retrato-empresario-excitado-vestido-traje_171337-154.jpg?w=740&t=st=1676742697~exp=1676743297~hmac=3ccd9c5f67d60693fa1730a057fc41ab5668beec0ee33f2b858527217a1648b2"
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        </div>
                        <div className="flex items-center gap-8 text-2xl">
                            <RiChat1Line className="hover:cursor-pointer"/>
                            <RiArchiveLine className="hover:cursor-pointer"/>
                            <RiMore2Fill className="hover:cursor-pointer"/>
                        </div>
                    </div>
                    <form className="w-full">
                        <div className="relative">
                            <RiSearchEyeLine className="absolute top-1/2 -translate-y-1/2 left-4"/>
                            <input className="bg-[#222C32] w-full rounded-full py-2 pl-10 pr-4 outline-none" placeholder="Buscar chat"/>
                        </div>
                    </form>
                </div>
                <div className="h-[90vh] overflow-y-scroll">Clientes</div>
            </div>
            {/*Chat*/}
            <div className="xl:col-span-3">Hola 2</div>
        </div>
    )
}