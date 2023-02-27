import { useEffect, useState } from "react";
import {updateDoc, doc,  addDoc, arrayUnion, collection, onSnapshot, query, serverTimestamp, Timestamp, where} from "firebase/firestore";
import {auth, db} from "../../firebase/config"
import { RiChat1Line,RiMore2Fill,RiArchiveLine,RiSearchEyeLine,RiCheckDoubleFill,RiCameraLine,RiLinkM,RiEmotionLine,RiSendPlane2Fill} from "react-icons/ri";

import { useUserContext } from "../../contexts/UserContext";

export function ChatsPage() {

    const [newMessage, setNewMessage] = useState("");
    const [msg, setMessages] = useState([]);
    const {user} = useUserContext();

    useEffect(() => {
        // const queryMessages = query(messagesRef, where("room", "==", "pruebas"))
        // onSnapshot(queryMessages, (snapshot) => {
        //     let messages = [];
        //     snapshot.forEach((doc) => {
        //         messages.push({...doc.data(), id: doc.id});
        //     });
        // setMessages(messages);

        //});
        const recieve = onSnapshot(doc(db, "chats", "31XWY3Tr5pReZfkrP0KU"), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            recieve();
        };
    }, []);

    //const chatsRef = collection(db, "chats");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await updateDoc(doc(db, "chats", "31XWY3Tr5pReZfkrP0KU"),{
            messages: arrayUnion({
                text: newMessage,
                sender: user.displayName,
                date: Timestamp.now()
            })
        });

        // await addDoc(messagesRef, {
        //     text: newMessage,
        //     createdAt: serverTimestamp(),           
        //     room: "pruebas"
        // });

        setNewMessage("");
    };


    return (
        <div className="min-h-screen grid grid-cols-1 xl:grid-cols-4 bg-[#FFFFFF] text-white-500">
            {/*Contactos*/}
            <div className="hidden bg-[#572975] xl:flex flex-col">
                {/*Perfil*/}
                <div className="p-4 h-[17vh]">
                    <div className="flex items-center justify-between mb-1.5">
                        <div>
                            <img 
                                src="https://img.freepik.com/foto-gratis/retrato-empresario-excitado-vestido-traje_171337-154.jpg"
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        </div>
                        <div className="flex items-center gap-8 text-2xl text-white-500">
                            <RiChat1Line className="hover:cursor-pointer"/>
                            <RiArchiveLine className="hover:cursor-pointer"/>
                            <RiMore2Fill className="hover:cursor-pointer"/>
                        </div>
                    </div>
                    <form className="w-full">
                        <div className="relative">
                            <RiSearchEyeLine className="absolute top-1/2 -translate-y-1/2 left-4"/>
                            <input 
                                className="bg-[#FFFFFF] w-full rounded-full py-2 pl-10 pr-4 outline-none" 
                                placeholder="Buscar chat"
                            />
                        </div>
                    </form>
                </div>
                {/*Clientes*/}
                <div className="h-[85vh] overflow-y-scroll">
                    {/*Cliente*/}
                    <div 
                        className="p-4 flex items-center gap-4 bg-[#D5D6DC] border-b border-[#222C32] hover:cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h1>Kira Yoshikage</h1>
                                <p className="text-transparent-500 flex items-center gap-2">
                                    <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "} 
                                    Mi nombre es Yoshikage Kira.
                                </p>
                            </div>
                            <div className="text-white-500 text-xs">14:23</div>
                        </div>
                    </div>
                    {/*Cliente*/}
                    <div
                        className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h1>Josuke Higashikata</h1>
                                <p className="text-white-500 flex items-center gap-2">
                                    <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
                                    <RiCameraLine/>
                                    Foto
                                </p>
                            </div>
                            <div className="text-white-500 text-xs">12:12</div>
                        </div>
                    </div>
                    {/*Cliente*/}
                    <div
                        className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h1>Romero Anfibio</h1>
                                <p className="text-white-500 flex items-center gap-2">
                                    <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
                                    Tengo escamas
                                </p>
                            </div>
                            <div className="text-white-500 text-xs">ayer</div>
                        </div>
                    </div>
                    {/*Cliente*/}
                    <div
                        className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h1>Pudri</h1>
                                <p className="text-white-500 flex items-center gap-2">
                                    <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
                                    Tengo ligma
                                </p>
                            </div>
                            <div className="text-white-500 text-xs">miércoles</div>
                        </div>
                    </div>
                    {/*Cliente*/}
                    <div
                        className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                    >
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 flex justify-between">
                            <div>
                                <h1>Heyo Mason</h1>
                                <p className="text-white-500 flex items-center gap-2">
                                    <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
                                    Hey yo Mason
                                </p>
                            </div>
                            <div className="text-white-500 text-xs">6:55</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Chat*/}
            <div className="xl:col-span-3">
                <header className="h-[10vh] bg-[#ab90b9] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                            <h1>Kira Yoshikage</h1>
                            <span className="text-white-500 text-sm">En línea</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-2xl text-white-500">
                        <RiSearchEyeLine className="hover:cursor-pointer"/>
                        <RiLinkM className="hover:cursor-pointer"/>
                        <RiMore2Fill className="hover:cursor-pointer"/>
                    </div>
                </header>
                {/*Mensajes*/}
                <main className="h-[84vh] overflow-y-scroll p-4">
                    {/* mensajes de prueba */}
                    <div>
                        {/* Mensaje 1
                        <div className="mb-3 flex">
                            <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                                Hola
                            </p>
                        </div>
                        {Mensaje 2}
                        <div className="mb-3 flex">
                            <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                            </p>
                        </div>
                        {Mensaje 3}
                        <div className="mb-3 flex justify-end">
                            <p className="bg-[#ab90b9] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                            </p>
                        </div> */}
                    </div>
                    {/* mensajes reales */}
                    
                    {
                        msg.map((m) => {
                            return(
                            <div className="mb-3 flex">
                                    <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                                        {m.text}
                                    </p>
                            </div>
                            )
                        })
                    }
                    

                </main>
                {/*Enviar mensajes*/}
                <div className="h-[8vh] text-white-500 flex items-center bg-[#ab90b9]">   
                    <form className="w-[60%] xl:w-10/12 flex" onSubmit={handleSubmit}>
                        <input type="text" className="bg-[#D5D6DC] w-full py-2 px-6 rounded-full outline-none text-white-500"
                            placeholder="Escriba un mensaje"
                            onChange={(e)=> setNewMessage(e.target.value)}
                            value={newMessage}
                        />
                        <button type="submit">
                            <RiSendPlane2Fill className="hover:cursor-pointer"/>
                        </button>
                    </form>
                         
                </div>
            </div>
        </div>
    )
}
