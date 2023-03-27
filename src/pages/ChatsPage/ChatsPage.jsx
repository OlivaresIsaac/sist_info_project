import { useEffect, useState } from "react";
import {updateDoc, doc,  addDoc, arrayUnion, collection, onSnapshot, query, serverTimestamp, Timestamp, where} from "firebase/firestore";
import { db} from "../../firebase/config"
import {RiChat1Line,RiMore2Fill,RiArchiveLine,RiSearchEyeLine,RiCheckDoubleFill,RiCameraLine,RiLinkM,RiEmotionLine,RiSendPlane2Fill} from "react-icons/ri";
import {AiFillCaretLeft} from "react-icons/ai"

import styles from "./ChatsPage.module.css"

import { useUserContext } from "../../contexts/UserContext";
//Función que recupera los documentos de chats y mantiene actulizado los mensajes
export function ChatsPage() {
    const [isChatSelected, setChatSelected] = useState(false)
    const [archived, setArchived] = useState(false)
    const [changeButton, setChangeButton] = useState("Archivados")

    const [receptorName, setReceptorName] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const {user} = useUserContext();

    const [currentChat, setCurrentChat] = useState("");
    const [currentDoc, setCurrentDoc] = useState()
    const [userChats, setUserChats] = useState([]);
    const [userChatsDoc, setUserChatsDoc] = useState([]);

    useEffect(() => {
        // const queryMessages = query(messagesRef, where("room", "==", "pruebas"))
        // onSnapshot(queryMessages, (snapshot) => {
        //     let messages = [];
        //     snapshot.forEach((doc) => {
        //         messages.push({...doc.data(), id: doc.id});
        //     });
        // setMessages(messages);
        //});
        if(user.userChats.length !== 0){
            
            const queryChats = query(collection(db, "chats"), where("id", "in", user.userChats))
            onSnapshot(queryChats, (snapshot) => {
                let a = []
                snapshot.forEach((doc) => {
                    a.push(doc)
                })
                setUserChatsDoc(a)
            })
        }

        if(currentChat != ""){
            onSnapshot(doc(db, "chats", currentChat), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages);
                }
            });
        }

    }, []);

    const selectChat = async(index) => {
            
            const chat = userChatsDoc[index];

            onSnapshot(doc(db, "chats", chat.id), (doc) => {
                if (doc.exists()) {
                    setCurrentDoc(doc)
                    setCurrentChat(doc.data().id)
                    setMessages(doc.data().messages);
                    setReceptorName((user.isDoctor) ? doc.data().patient : doc.data().doctor);
                    setChatSelected(true);
                };
            });
    };

    const seeArchived =async() => {
        setArchived(!archived)
        if(!archived){
            setChangeButton("Chats")
        }else{
            setChangeButton("Archivados")
        }
    }

    const archive = async() => {
        await updateDoc(doc(db, "chats", currentChat),{
            isArchived: !currentDoc.data().isArchived
        })
        onSnapshot(doc(db, "chats", currentChat), (doc) => {
            if (doc.exists()) {
                setCurrentDoc(doc)
            };
        });
    }

    const activate = async() => {
        await updateDoc(doc(db, "chats", currentChat),{
            active: !currentDoc.data().active
        })
        onSnapshot(doc(db, "chats", currentChat), (doc) => {
            if (doc.exists()) {
                setCurrentDoc(doc)
            };
        });
    }

    const backChat = async() => {
        setCurrentChat("")
        setMessages([]);
        setReceptorName("");
        setNewMessage("")
        setChatSelected(false);
    }
         
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "" || currentChat === "") return;
        
        const mes = newMessage
        const arr = messages
        arr.push(newMessage)
        setNewMessage("")
        setMessages(arr)

        await updateDoc(doc(db, "chats", currentChat),{
            messages: arrayUnion({
                text: mes,
                sender: user.displayName,
                date: Timestamp.now()
            }),
            lastMessage: mes
        });

        // await addDoc(messagesRef, {
        //     text: newMessage,
        //     createdAt: serverTimestamp(),           
        //     room: "pruebas"
        // });

        setNewMessage("");
    };

    if(!isChatSelected){
        return(
        <div >
            <div className="h-min bg-[#572975] p-4 h-[17vh]">
                     <div className="flex items-center justify-between mb-1.5">
                         <div>
                            <h1 className="italic text-white">Chats</h1>
                        </div>
                        <div className="flex items-center text-white-500">
                            <button onClick={()=>{seeArchived()}} className="rounded-full p-2 bg-[#D5D6DC] hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer">
                                {changeButton}
                            </button>
                        </div>
                    </div>
                    {/* <form className="w-full">
                        <div className="relative">
                            <RiSearchEyeLine className="absolute top-1/2 -translate-y-1/2 left-4"/>
                            <input 
                                className="bg-[#FFFFFF] w-full rounded-full py-2 pl-10 pr-4 outline-none" 
                                placeholder="Buscar chat"
                            />
                        </div>
                    </form> */}
                </div>
            {
                userChatsDoc.map((c, key) => {
                    if(c.data().isArchived == archived){
                        if(user.isDoctor){
                                return(<button
                                    key={key} 
                                    onClick={()=>{
                                        selectChat(key)
                                    }}
                                    className="p-4 w-[90vw] flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                                >
                                    <img
                                        src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    <div className="flex-1 flex justify-between">
                                        <div>
                                            <h1>{c.data().patient}</h1>
                                            <p className="text-white-500 truncate flex items-center gap-2">
                                                {c.data().lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </button>)
                            }
                        else{
                                return(<div
                                    key={key} 
                                    onClick={()=>{
                                        selectChat(key)
                                    }}
                                    className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
                                >
                                    <img
                                        src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    <div className="flex-1 flex truncate justify-between">
                                        <div>
                                            <h1>{c.data().doctor}</h1>
                                            <p className="text-white-500 flex items-center gap-2">
                                                {c.data().lastMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                            }
                    }
                    }
                )
            }
        </div>
        )
    }else{
        return(
            <div className={styles.chatCont}>
                <header className="chatHeader p-3 bg-[#ab90b9] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={()=>{backChat()}}>
                            <AiFillCaretLeft />
                        </button>
                        <img
                            src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                            <h1>{receptorName}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-2xl text-white-500">
                        {
                            currentDoc.data().doctor == user.displayName && !currentDoc.data().isArchived && currentDoc.data().active &&(
                                <button onClick={() => {archive()}} className="rounded-full pr-3 pl-3 bg-[#D5D6DC] hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer">
                                    Archivar
                                </button>
                            )
                        }
                        {
                            currentDoc.data().doctor == user.displayName && currentDoc.data().isArchived && currentDoc.data().active &&(
                                <button onClick={() => {archive()}} className="rounded-full pr-3 pl-3 bg-[#D5D6DC] hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer">
                                    Desarchivar
                                </button>
                            )
                        }
                    </div>
                </header>
                {/*Mensajes*/}
                <main className={styles.chatMesCont}>
                    {/* mensajes reales */}
                    {
                        currentDoc.data().active && (

                            <div>

                            {
                                messages.map((m, key) => {
                                    
                                    if (m.sender === user.displayName) {
                                        return (
                                            <div key={key} className="mb-3 flex justify-end">
                                                <p className="bg-[#ab90b9] break-words flex-wrap max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl">
                                                {m.text}
                                                </p>
                                        </div>
                                        )
                                    } else {
                                        return (
                                            <div key={key} className="mb-3 flex">
                                                <p className="bg-[#D5D6DC] flex-wrap max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                                                    {m.text}
                                                </p>
                                            </div>
                                        ) 
                                    }                            
                                })
                            }  
                            </div>
                        )
                    }
                    {
                        !currentDoc.data().active && currentDoc.data().doctor == user.displayName &&(
                            <div className="mb-3 flex justify-end">
                                <button onClick={() => activate()} className="bg-[green] text-white break-words flex-wrap max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl">
                                    activar chat
                                </button>
                            </div>
                        )
                    }

                </main>
                {/*Enviar mensajes*/}
                <div className={styles.chatInput}>
                {
                    !!currentDoc.data().active && !currentDoc.data().isArchived &&(
                        <form className="flex" onSubmit={handleSubmit}>
                    
                            <input type="text" className="bg-[#D5D6DC] w-[70vw] py-2 px-6 rounded-full outline-none text-white-500"
                                placeholder="Escriba un mensaje"
                                onChange={(e)=> setNewMessage(e.target.value)}
                                value={newMessage}
                            />
                            <button type="submit">
                                <RiSendPlane2Fill className="hover:cursor-pointer"/>
                            </button>
                        </form>   
                    )
                }                       
                </div>
            </div>
        )
    }
    }

    // return (
    //     <div className="min-h-screen grid grid-cols-1 xl:grid-cols-4 bg-[#FFFFFF] text-white-500">
    //         {/*Contactos*/}
    //         <div className="hidden bg-[#572975] xl:flex flex-col">
    //             {/*Perfil*/}
    //             <div className="p-4 h-[17vh]">
    //                 <div className="flex items-center justify-between mb-1.5">
    //                     <div>
    //                         <img 
    //                             src="https://img.freepik.com/foto-gratis/retrato-empresario-excitado-vestido-traje_171337-154.jpg"
    //                             className="w-10 h-10 object-cover rounded-full"
    //                         />
    //                     </div>
    //                     <div className="flex items-center gap-8 text-2xl text-white-500">
    //                         <RiChat1Line className="hover:cursor-pointer"/>
    //                         <RiArchiveLine className="hover:cursor-pointer"/>
    //                         <RiMore2Fill className="hover:cursor-pointer"/>
    //                     </div>
    //                 </div>
    //                 <form className="w-full">
    //                     <div className="relative">
    //                         <RiSearchEyeLine className="absolute top-1/2 -translate-y-1/2 left-4"/>
    //                         <input 
    //                             className="bg-[#FFFFFF] w-full rounded-full py-2 pl-10 pr-4 outline-none" 
    //                             placeholder="Buscar chat"
    //                         />
    //                     </div>
    //                 </form>
    //             </div>
    //             {/*Clientes*/}
    //             <div className="h-[85vh] overflow-y-scroll">
    //                 {
    //                     userChatsDoc.map((c, key) => {
    //                         if(user.isDoctor){
    //                             if(currentChat === c.id){
    //                                 return(<div 
    //                                     key={key} 
    //                                     onClick={()=>{
    //                                         selectChat(key)
    //                                     }}
    //                                     className="p-4 flex items-center gap-4 bg-[#D5D6DC] border-b border-[#222C32] hover:cursor-pointer"
    //                                 >
    //                                     <img
    //                                         src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
    //                                         className="w-10 h-10 object-cover rounded-full"
    //                                     />
    //                                     <div className="flex-1 flex justify-between">
    //                                         <div>
    //                                             <h1>{c.patient}</h1>
    //                                             <p className="text-transparent-500 flex items-center gap-2">
    //                                                 <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "} 
    //                                                 {c.lastMessage}
    //                                             </p>
    //                                         </div>
    //                                         <div className="text-white-500 text-xs">14:23</div>
    //                                     </div>
    //                                 </div>)
    //                             }else{
    //                                 return(<button
    //                                     key={key} 
    //                                     onClick={()=>{
    //                                         selectChat(key)
    //                                     }}
    //                                     className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
    //                                 >
    //                                     <img
    //                                         src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
    //                                         className="w-10 h-10 object-cover rounded-full"
    //                                     />
    //                                     <div className="flex-1 flex justify-between">
    //                                         <div>
    //                                             <h1>{c.patient}</h1>
    //                                             <p className="text-white-500 flex items-center gap-2">
    //                                                 <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
    //                                                 <RiCameraLine/>
    //                                                 {c.lastMessage}
    //                                             </p>
    //                                         </div>
    //                                         <div className="text-white-500 text-xs">12:12</div>
    //                                     </div>
    //                                 </button>)
    //                             }
    //                         }else{
    //                             if(currentChat === c.id){
    //                                 return(<button 
    //                                     key={key} 
    //                                     onClick={()=>{
    //                                         selectChat(key)
    //                                     }}
    //                                     className="w-full p-4 flex items-center gap-4 bg-[#D5D6DC] border-b border-[#222C32]"
    //                                 >
    //                                     <img
    //                                         src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
    //                                         className="w-10 h-10 object-cover rounded-full"
    //                                     />
    //                                     <div className="flex-1 flex justify-between">
    //                                         <div>
    //                                             <h1>{c.doctor}</h1>
    //                                             <p className="text-transparent-500 flex items-center gap-2">
    //                                                 <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "} 
    //                                                 {c.lastMessage}
    //                                             </p>
    //                                         </div>
    //                                         <div className="text-white-500 text-xs">14:23</div>
    //                                     </div>
    //                                 </button>)
    //                             }else{
    //                                 return(<div
    //                                     key={key} 
    //                                     onClick={()=>{
    //                                         selectChat(key)
    //                                     }}
    //                                     className="p-4 flex items-center gap-4 hover:bg-[#D5D6DC] border-b border-[#222C32] transition-colors hover:cursor-pointer"
    //                                 >
    //                                     <img
    //                                         src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
    //                                         className="w-10 h-10 object-cover rounded-full"
    //                                     />
    //                                     <div className="flex-1 flex justify-between">
    //                                         <div>
    //                                             <h1>{c.doctor}</h1>
    //                                             <p className="text-white-500 flex items-center gap-2">
    //                                                 <RiCheckDoubleFill className="text-lg text-cyan-500"/>{" "}
    //                                                 <RiCameraLine/>
    //                                                 {c.lastMessage}
    //                                             </p>
    //                                         </div>
    //                                         <div className="text-white-500 text-xs">12:12</div>
    //                                     </div>
    //                                 </div>)
    //                             }
    //                         }
    //                     })
    //                 }

    //             </div>
    //         </div>
    //         {/*Chat*/}
    //         <div className="xl:col-span-3">
    //             <header className="h-[10vh] bg-[#ab90b9] p-4 flex items-center justify-between">
    //                 <div className="flex items-center gap-4">
    //                     <img
    //                         src="https://img.freepik.com/foto-gratis/alegre-joven-pie-aislado-sobre-pared-naranja_171337-16567.jpg"
    //                         className="w-10 h-10 object-cover rounded-full"
    //                     />
    //                     <div>
    //                         <h1>{receptorName}</h1>
    //                         <span className="text-white-500 text-sm">En línea</span>
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center gap-8 text-2xl text-white-500">
    //                     <RiSearchEyeLine className="hover:cursor-pointer"/>
    //                     <RiLinkM className="hover:cursor-pointer"/>
    //                     <RiMore2Fill className="hover:cursor-pointer"/>
    //                 </div>
    //             </header>
    //             {/*Mensajes*/}
    //             <main className="h-[84vh] overflow-y-scroll p-4">
    //                 {/* mensajes de prueba */}
    //                 <div>
    //                     {/* Mensaje 1
    //                     <div className="mb-3 flex">
    //                         <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
    //                             Hola
    //                         </p>
    //                     </div>
    //                     {Mensaje 2}
    //                     <div className="mb-3 flex">
    //                         <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
    //                             Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    //                         </p>
    //                     </div>
    //                     {Mensaje 3}
    //                     <div className="mb-3 flex justify-end">
    //                         <p className="bg-[#ab90b9] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl">
    //                             Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    //                         </p>
    //                     </div> */}
    //                 </div>
    //                 {/* mensajes reales */}
                    
    //                 {
    //                     messages.map((m, key) => {
                            
    //                         if (m.sender === user.displayName) {
    //                             return (
    //                                 <div key={key} className="mb-3 flex justify-end">
    //                                     <p className="bg-[#ab90b9] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tl-xl rounded-bl-xl rounded-br-xl">
    //                                     {m.text}
    //                                     </p>
    //                             </div>
    //                             )
    //                         } else {
    //                             return (
    //                                 <div key={key} className="mb-3 flex">
    //                                     <p className="bg-[#D5D6DC] max-w-[80%] xl:max-w-2xl py-1 px-4 rounded-tr-xl rounded-br-xl rounded-bl-xl">
    //                                         {m.text}
    //                                     </p>
    //                                 </div>
    //                             ) 
    //                         }                            
    //                     })
    //                 }  

    //             </main>
    //             {/*Enviar mensajes*/}
    //             <div className="h-[8vh] text-white-500 flex items-center bg-[#ab90b9]">   
    //                 <form className="w-[60%] xl:w-10/12 flex" onSubmit={handleSubmit}>
    //                     <input type="text" className="bg-[#D5D6DC] w-full py-2 px-6 rounded-full outline-none text-white-500"
    //                         placeholder="Escriba un mensaje"
    //                         onChange={(e)=> setNewMessage(e.target.value)}
    //                         value={newMessage}
    //                     />
    //                     <button type="submit">
    //                         <RiSendPlane2Fill className="hover:cursor-pointer"/>
    //                     </button>
    //                 </form>                       
    //             </div>
    //         </div>
    //     </div>
    // )

