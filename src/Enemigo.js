import ataqueEnemigo1Img from './ataqueEnemigo1.png';

function AtaqueEnemigo({ display }) {
    return (
        <img 
            src={ataqueEnemigo1Img} 
            alt='ataque enemigo' 
            className='Personaje-img ataqueEnemigoImg'
            style={{display: display}} />
    )
}

export default AtaqueEnemigo;