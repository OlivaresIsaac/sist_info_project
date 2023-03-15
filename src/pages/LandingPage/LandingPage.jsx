import './LandingPage.css'
import psicologo from '../../assets/psicologo.png'
import team from '../../assets/team2.png'
import backtopimg from '../../assets/backtop.png'
import AbstractCard from "../../components/AbstractCard/AbstractCard";
import { useState, useEffect } from "react"


export function LandingPage() {
    const [Info, setInfo] = useState({
        Nombre: "Luis Domingos",
        Idioma: "Español",
        Especialidad: "Especialidad",
        Price: "215466",
        imagen: '../../assets/psydocs.png'
    })
    const [isDoc, setisDoc] = useState(true)
    return (
        <>
        <section className='landing'>
            <div className='landing-row'>
               <div className = "psicologo-div"> 
                    <img src={psicologo} className='psicologo' alt='pysdocs'/>
                    
                </div>

                <div className='title'>
                    <h1 className='h1-title'>PSYDOCS</h1>
                    <h2 className='h2-title'>Salud mental a tu alcance</h2>
                    <h3 className='h3-title'>¿Quiénes Somos?</h3>
                </div>
               
            </div>

            <div className='mariobuscadoroplolyolopongobonito'>
                <AbstractCard Info={Info} isDoc={isDoc}/>
            </div>

            <div className='team'>   
                <div className='round-border'>
                <img src={team} className='team-img' alt='pysdocs'/>
                 {/* <h4 className='h4-title'>EQUIPO DE PSYDOCS</h4> */}
                    <p className='teamText'>
                        Psydocs es una plataforma que busca conectar a especialistas de la psicología 
                        con personas que requieran su servicio. Busca doctores de todas partes del mundo 
                        y concreta la consulta perfecta
                    </p>
                    <p className='saying'> 
                        “De nuestras vulnerabilidades vienen nuestras fortalezas”
                    </p>
                    <h5 className='h5-title'>~ Sigmund Freud </h5>
            </div>
            
             </div>
             <div className='final-button'>
                {/* <img src={backtopimg} className='backtopimg' alt='pysdocs'/> */}
                <button className='backtop'> BUSCA LA CONSULTA PERFECTA </button>  
            </div>
        </section>
        </>
    )
}

