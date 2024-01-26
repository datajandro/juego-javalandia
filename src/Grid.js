import Personaje from './Personaje';
import AtaqueEnemigo from './Enemigo';
import WoodenStick from "./WoodenStick";
import Points from './Points';
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



    /*Generador de numeros aleatorios con un tope maximo*/

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

    const personajeOn = 
        <Personaje 
            handleDireccionMirada={direccionMirada} />;
    let personajeOff = null;

    let ataqueEnemigoOff = null;
    const [ataqueEnemigoOn, setAtaqueEnemigoOn] = useState(ataqueEnemigoOff);

    /*Posicion aleatoria de los Wooden Stick*/

    /* --- puntos --- */

    const [points, setPoints] = useState(0);

    /* --- Velocidad de Ataque enemigo */
    
    const timerAtaqueEnemigoDurationFacil = 1000
    const [timerAtaqueEnemigoDuration, setTimerAtaqueEnemigoDuration] = useState(timerAtaqueEnemigoDurationFacil);

    /* --- posicion aleatoria --- */

    useEffect(() => {
        if (gridElementPersonajePosition === gridElementWoodenStickPosition) {
            setGridElementWoodenStickPosition(getRandomIntWoodenStick(
                gridTemplateColumnsNumber, 
                gridElementPersonajePosition));
            setPoints(points + 1);
            setTimerAtaqueEnemigoDuration(timerAtaqueEnemigoDuration - 50);
        }
      }, [gridElementPersonajePosition, gridElementWoodenStickPosition])

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

    useEffect(() => {
        if (timerAtaqueEnemigo === 1) {
            intervalTimerAtaqueEnemigo = setInterval(() => {
                setAtaqueEnemigoOn(<AtaqueEnemigo 
                    display={"inline"} 
                    animationName={"ataqueEnemigoUp"}
                    animationDuration={`${timerAtaqueEnemigoDuration}ms`} />);
                setGridElementAirAtaqueEnemigoPosition(
                    getRandomIntWoodenStick(gridTemplateColumnsNumber, gridElementAirAtaqueEnemigoPosition)
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
                    stopGame();
                }
            }, timerAtaqueEnemigoDuration);
        }
        return () => clearTimeout(timeoutAtaqueEnemigo);

    }, [gridElementPersonajePosition, gridElementAirAtaqueEnemigoPosition]);

    function startGame() {
        setTimerAtaqueEnemigo(1);
        setPoints(0);
        setTimerAtaqueEnemigoDuration(timerAtaqueEnemigoDurationFacil);
    };

    function stopGame() {
        setTimerAtaqueEnemigo(0)
        setAtaqueEnemigoOn(<AtaqueEnemigo display={"none"} />);
        setGridElementAirAtaqueEnemigoPosition(null)
    };

    const gameStartRef = useRef(null);
    const playButtonRef = useRef();

    useEffect(() => {
      if (timerAtaqueEnemigo === 0) {
        playButtonRef.current.focus();
      } else if (timerAtaqueEnemigo === 1) {
        gameStartRef.current.focus();
      }
    }, [timerAtaqueEnemigo])    

    return (
        <div id='containerOfGrid'>
            { 
                timerAtaqueEnemigo === 0 ? 
                    <button 
                        ref={playButtonRef} 
                        onClick={startGame} 
                        id='playButton' 
                        className='fullScreen'
                        style={{fontSize: "5rem"}}>PLAY</button> 
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
            { timerAtaqueEnemigo === 1 ? <Points puntos={points} /> : null }
        </div>
    )
}

export default Grid;