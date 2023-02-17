
import "./Hero.module.css"

export function Hero(){
    return<div>
        <div className="hero-img">
            <img src="img.jpg" alt="" />
        </div>
        <div className="hero-text">
            <h1 className="hero-tittle">Psydocs</h1>
            <h2>Salud mental a tu alcance</h2>
            <button>Quiénes somos</button>
        </div>
    </div>
}