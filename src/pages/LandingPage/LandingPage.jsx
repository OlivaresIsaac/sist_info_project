import './LandingPage.css'
import psicologo from '../../assets/psicologo.png'
import team from '../../assets/team2.png'
import AbstractCard from "../../components/AbstractCard/AbstractCard";
import { useState, useEffect } from "react"
import { getDoctors } from "../../firebase/doctors-service";

//Muestra la bienvenida a página y tiene la lista de doctores
export function LandingPage() {
    const [docsInfo, setDocsInfo] = useState([])
    const [showedInfo, setShowedInfo] = useState([])
    const [isDoc, setisDoc] = useState(true)
    const [searchData, setSearchData] = useState({displayName: "", specialty:"",preferedLanguage: "", avgScore:""})

    
useEffect(() => {
    

    const loadDoctors = async () => {
        await getDoctors().then((result) => {
            setShowedInfo(result)
            setDocsInfo(result)
            // setDoctors(result)
            // console.log(result)
        })
       
    }

    loadDoctors()

    return () => {
      
    };
}, []);   


const onSubmit = (event) => {
    event.preventDefault();
    const doctorsToShow = []
    docsInfo.forEach((doctor) => {
        let nameBoolean = true
        let languageBoolean = true
        let starsBoolean = true
        let specialtyBoolean = true

        if (searchData.displayName !== "") {
            nameBoolean = (doctor.displayName.includes(searchData.displayName)) 
        } 

        if (searchData.specialty !== "") {

            specialtyBoolean = (searchData.specialty === doctor.specialty) 
        } 

        if (searchData.preferedLanguage !== "") {
           
            languageBoolean = (parseInt(searchData.preferedLanguage) === doctor.preferedLanguage) 
        } 

        if (searchData.avgScore !== "") {
            starsBoolean = (parseInt(searchData.avgScore) === doctor.avgScore) 
        } 

        if (nameBoolean && languageBoolean && specialtyBoolean && starsBoolean) {
            doctorsToShow.push(doctor)
        }
      
    })

    setShowedInfo(doctorsToShow)

}

const handleOnChange = (event) => {
   
    const {name, value} = event.target
    setSearchData({
        ...searchData,
        [name]: value
    })
}

const resetSearchData = () => {
    setSearchData({displayName: "", specialty:"",preferedLanguage: "", avgScore:""})
    setShowedInfo(docsInfo)
}
    


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

            <div className='doctor-searcher'> 
            <form onSubmit={onSubmit}>

                <h2 className='h2-title'>Buscador de Doctores</h2> 
                <div className='doctor-searcher-inputs'>


                <div>
                    <input placeholder="Nombre del doctor"  onChange={handleOnChange} className="input"  name="displayName"/>
                </div> 

                    <div>
                        Idioma:   
                        <select className="seleccionador" name="preferedLanguage" onChange={handleOnChange}> 
                            <option value={1}>Español</option>
                            <option value={2}>English</option>
                            <option value={3}>Português</option>
                            <option value={4}>日本</option>
                            <option value={5}>Latinus</option>
                        </select>
                    </div>

                <div>
                    Especialidad:   
                    <select className="seleccionador" name="specialty" onChange={handleOnChange}>
                        <option value="Parejas">Parejas</option>
                        <option value="Infantil">Infantil</option>
                        <option value="Salud Mental">Salud Mental</option>
                        <option value="Tercera edad">Tercera edad</option>
                        <option value="Familia">Familia</option>
                    </select>
                </div>

                <div>
                    Estrellas:   
                    <select className="seleccionador" name="avgScore" onChange={handleOnChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                    </select>
                </div>
                    
                    <div>
                        <button type="submit"> Buscar</button>
                    </div>

                    <div >
                        <button type="button" onClick={resetSearchData}> Ver todos</button>
                    </div>
                   

                    
                </div>

              
                </form>

                
            </div>
           
            {(showedInfo.length === 0) && (
                <div className='abstractCardContainer'>
                      <h2 className='h1-title'>No se han encontrado doctores</h2>
                </div>
            )}

            {(showedInfo.length > 0) && (
                <div className='abstractCardContainer'>
                {
                    showedInfo.map((cardInfo, key) => {
                       return(
                        <div className='abstractCard' key={key}> 
                       <AbstractCard Info={cardInfo} isDoc={isDoc} key={key}/>
                       </div> 
                       )
                    })
                }
               
            </div>
            )}

            

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

