import Personaje from './Personaje';
import AtaqueEnemigo from './Enemigo';
import { useState } from "react";

function GridElementPersonaje({ personajeOnOff }) {
    return (
        <div className='gridElement'>
            {personajeOnOff}
        </div>
    )
}

function GridElementAir({ ataqueEnemigoOnOff }) {
    return (
        <div 
        className='gridElement'
        style={{
            justifySelf: 'center'}} >
                {ataqueEnemigoOnOff}
        </div>
    )
}

function Grid() {
    let gridElementPersonajeArray = [];
    let gridElementAirArray = [];
    const gridTemplateColumnsNumber = 3;
    
    const personajeOn = <Personaje />;
    let personajeOff = null;

    let ataqueEnemigoOff = null;
    const [ataqueEnemigoOn, setAtaqueEnemigoOn] = useState(ataqueEnemigoOff);

    /*Generador de numeros aleatorios con un tope maximo*/

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /*Posicion de el personaje y los ataques*/

    const [
        gridElementPersonajePosition, 
        setGridElementPersonajePosition] = useState(0);
    const [
        gridElementAirAtaqueEnemigoPosition, 
        setGridElementAirAtaqueEnemigoPosition] = useState(null)

    /*Movimiento del personaje con las flechas del teclado*/

    function handleKeyDown(event) {
        if(event.key === 'ArrowRight') {
            if (gridElementPersonajePosition + 1 < gridTemplateColumnsNumber) {
                setGridElementPersonajePosition(gridElementPersonajePosition + 1);
            }
        }
        if(event.key === 'ArrowLeft') {
            if (gridElementPersonajePosition > 0) {
                setGridElementPersonajePosition(gridElementPersonajePosition - 1);
            }
        }
    }

    /*Numero de columnas*/

    for (let i = 0; i < gridTemplateColumnsNumber; i++) {
        if (i === gridElementPersonajePosition) {
            gridElementPersonajeArray.push(
                <GridElementPersonaje personajeOnOff={personajeOn} />
            );
        } else {
            gridElementPersonajeArray.push(
                <GridElementPersonaje personajeOnOff={personajeOff} />
            );
        }
        if (i === gridElementAirAtaqueEnemigoPosition) {
            gridElementAirArray.push(
                <GridElementAir ataqueEnemigoOnOff={ataqueEnemigoOn} />
            );
        } else {
            gridElementAirArray.push(
                <GridElementAir ataqueEnemigoOnOff={ataqueEnemigoOff} />
            );
        }
    }

    function gridTemplateColumnsString() {
        let array = [];
        for (let i = 0; i < gridElementPersonajeArray.length; i++) {
            array.push('1fr')
        }
        return array.join(' ')
    }

    /* CODIGOS DE TIMER ATAQUE ENEMIGO*/
    /*
    0 = Juego sin iniciar
    1 = Juego Iniciado
    */

    const [timerAtaqueEnemigo, setTimerAtaqueEnemigo] = useState(0)  
    
    const [prueba, setPrueba] = useState(0);
    
    let interval = setInterval(() => {
        setPrueba(prueba++);
        console.log(prueba);
    }, 1000);

    function startGame() {
        setTimerAtaqueEnemigo(1);
        setAtaqueEnemigoOn(<AtaqueEnemigo display={"inline"} />);
    }

    function stopGame() {
        setTimerAtaqueEnemigo(0)
        setAtaqueEnemigoOn(<AtaqueEnemigo display={"none"} />);
    }

    return (
        <div 
            className="grid" 
            style={{gridTemplateColumns: gridTemplateColumnsString()}}
            tabIndex={0}
            onKeyDown={handleKeyDown} >
            {gridElementPersonajeArray}
            {gridElementAirArray}
            <button onClick={startGame}>PLAY</button>
            <button onClick={stopGame}>STOP</button>
        </div>
    )
}

export default Grid;