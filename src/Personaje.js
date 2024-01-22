import personajeImg from './personaje.png';

function Personaje() {
    return (
      <img src={personajeImg} className='Personaje-img' alt='personaje' />
    )
}

export default Personaje;