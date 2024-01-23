import ataqueEnemigo1Img from './ataqueEnemigo1.png';

function AtaqueEnemigo({ 
    display, 
    animationName, 
    animationDuration }) {
    return (
        <img 
            src={ataqueEnemigo1Img} 
            alt='ataque enemigo' 
            className='ataqueEnemigoImg'
            style={{
                display: display,
                animationName: animationName,
                animationDuration: animationDuration    
            }} />
    )
}

export default AtaqueEnemigo;