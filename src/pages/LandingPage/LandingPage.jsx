import './LandingPage.css'
import psicologo from 'C:/Users/Andrés Castro/Documents/GitHub/sist_info_project/src/assets/psicologo.png'
import team from 'C:/Users/Andrés Castro/Documents/GitHub/sist_info_project/src/assets/team.png'
import backtopimg from 'C:/Users/Andrés Castro/Documents/GitHub/sist_info_project/src/assets/backtop.png'


export function LandingPage() {

    return (
        <section Landing>
            <img src={psicologo} className='psicologo'/>
            <div tittle className='tittle'>
                <h1>PSYDOCS</h1>
                <h2>Salud mental a tu alcance</h2>
                <h3>¿Quiénes Somos?</h3>
            </div>
            <div SearchBar className='mariobuscadoroplolyolopongobonito'>
                <img src="https://shoplineimg.com/6270c198a039e3002fe13d43/6350f0f34765840022bc45f9/800x.jpg?"></img>
            </div>
            <div Team>   
                <p>
                    <img src={team} className='team'/>
                    <h4>EQUIPO DE PSYDOCS</h4>
                    <p className='teamText'>
                        Pysdocs es una plataforma que busca conectar a especialistas de la psicología 
                        con personas que requieran su servicio. Busca doctores de todas partes del mundo 
                        y concreta la consulta perfecta
                    </p>
                    <p className='saying'> 
                        “De nuestras vulnerabilidades vienen nuestras fortalezas”
                    </p>
                    <h5>~ Sigmund Freud </h5>
                </p>
                <p> 
                    <img src={backtopimg} className='backtopimg'/> 
                    <button onclick="topFunction()" className='backtop'> BUSCA LA CONSULTA PERFECTA </button> 
                </p>
            </div>
        </section>
    )
}

export default LandingPage