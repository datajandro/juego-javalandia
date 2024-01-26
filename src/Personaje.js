import personajeImg from "./img/4_Vulture/Vulture_walk.png";

function Personaje({ handleDireccionMirada }) {
    return (
      <div 
        className="Personaje-img"
        style={{
          background: `url(${personajeImg})`,
          width: "48px", height: "48px",
          transform: handleDireccionMirada,
          animationName: "vueloSinMovimiento",
          animationDuration: "400ms",
          animationIterationCount: "infinite"}}>
      </div>
    )
}

export default Personaje;