import Personaje from './Personaje';
import AtaqueEnemigo from './Enemigo';
import WoodenStick from "./WoodenStick";
import { useState, useEffect, useRef } from "react";

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
    const gridTemplateColumnsNumber = 5;

    const [direccionMirada, setDireccionMirada] = useState("scaleX(-1)");
    
    const personajeOn = 
        <Personaje 
            handleDireccionMirada={direccionMirada} />;
    let personajeOff = null;

    let ataqueEnemigoOff = null;
    const [ataqueEnemigoOn, setAtaqueEnemigoOn] = useState(ataqueEnemigoOff);

    /*Generador de numeros aleatorios con un tope maximo*/

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomIntWoodenStick(max, personajePosition) {
        let resultado;
        resultado = Math.floor(Math.random() * max);

        while (resultado === personajePosition) {
            resultado = Math.floor(Math.random() * max);
        }
        
        return resultado;
    }

    /*
    Posicion de el 
        - personaje, 
        - los ataques y
        - Wooden Stick
    */

    const [
        gridElementPersonajePosition, 
        setGridElementPersonajePosition] = useState(0);
    const [
        gridElementAirAtaqueEnemigoPosition, 
        setGridElementAirAtaqueEnemigoPosition] = useState(null);
    
    const [
        gridElementWoodenStickPosition,
        setGridElementWoodenStickPosition] = useState(
            getRandomIntWoodenStick(
                gridTemplateColumnsNumber, 
                gridElementPersonajePosition)
    );

    /*Movimiento del personaje con las flechas del teclado*/

    function handleKeyDown(event) {
        if(event.key === 'ArrowRight') {
            if (gridElementPersonajePosition + 1 < gridTemplateColumnsNumber) {
                setGridElementPersonajePosition(gridElementPersonajePosition + 1);
                setDireccionMirada("scaleX(-1)");
            }
        }
        if(event.key === 'ArrowLeft') {
            if (gridElementPersonajePosition > 0) {
                setGridElementPersonajePosition(gridElementPersonajePosition - 1);
                setDireccionMirada("scaleX(1)");
            }
        }
    }

    /*Numero de columnas*/

    for (let i = 0; i < gridTemplateColumnsNumber; i++) {

        /* Grid del cielo */
        /*Personaje*/

        if (i === gridElementPersonajePosition) {
            gridElementPersonajeArray.push(
                <GridElementPersonaje personajeOnOff={personajeOn} />
            );
        } else if (i === gridElementWoodenStickPosition) {
            gridElementPersonajeArray.push(<WoodenStick />)
        } else {
            gridElementPersonajeArray.push(
                <GridElementPersonaje personajeOnOff={personajeOff} />
            );
        }

        /*Wooden Stick*/

        

        /*Grid del Aire*/

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

    const [timerAtaqueEnemigo, setTimerAtaqueEnemigo] = useState(0);

    let intervalTimerAtaqueEnemigo;
    
    const [timerAtaqueEnemigoDuration, setTimerAtaqueEnemigoDuration] = useState(1000);

    useEffect(() => {
        if (timerAtaqueEnemigo === 1) {
            intervalTimerAtaqueEnemigo = setInterval(() => {
                setAtaqueEnemigoOn(<AtaqueEnemigo 
                    display={"inline"} 
                    animationName={"ataqueEnemigoUp"}
                    animationDuration={`${timerAtaqueEnemigoDuration}ms`} />);
                setGridElementAirAtaqueEnemigoPosition(
                    getRandomInt(gridTemplateColumnsNumber)
                );
            }, timerAtaqueEnemigoDuration);
            return () => clearInterval(intervalTimerAtaqueEnemigo);
        }
    })

    let timeoutAtaqueEnemigo;

    useEffect(() => {
        if (gridElementAirAtaqueEnemigoPosition === gridElementPersonajePosition) {
            timeoutAtaqueEnemigo = setTimeout(() => {
                if (gridElementAirAtaqueEnemigoPosition === gridElementPersonajePosition) {
                    /*stopGame();*/
                }
            }, timerAtaqueEnemigoDuration);
        }
        return () => clearTimeout(timeoutAtaqueEnemigo);

    }, [gridElementPersonajePosition, gridElementAirAtaqueEnemigoPosition]);

    const gameStartRef = useRef(null);

    function startGame() {
        gameStartRef.current.focus()
        setTimerAtaqueEnemigo(1);
    };

    function stopGame() {
        setTimerAtaqueEnemigo(0)
        setAtaqueEnemigoOn(<AtaqueEnemigo display={"none"} />);
        setGridElementAirAtaqueEnemigoPosition(null)
    };

    useEffect(() => {
        console.log("Personaje: " + gridElementPersonajePosition)
        console.log("Bolita: " + gridElementWoodenStickPosition);
      if (gridElementPersonajePosition === gridElementWoodenStickPosition) {
        setGridElementWoodenStickPosition(getRandomIntWoodenStick);
      }
    }, [gridElementPersonajePosition, gridElementWoodenStickPosition])
    

    return (
        <div id='containerOfGrid'>
            { 
                timerAtaqueEnemigo === 0 ? 
                    <button onClick={startGame} id='playButton' className='fullScreen'>PLAY</button> 
                : null 
            }
            <div 
                className="grid" 
                style={{gridTemplateColumns: gridTemplateColumnsString()}}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                ref={gameStartRef} >
                    {gridElementPersonajeArray}
                    {gridElementAirArray}
            </div>
        </div>
    )
}

export default Grid;