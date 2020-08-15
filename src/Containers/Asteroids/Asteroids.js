import React, { Component } from 'react'
// import './Asteroids.css';
// import Calendar from '../../Components/Calendar/Calendar';
import InfoAsteroides from '../../Components/InfoAsteroids/InfoAsteroids'
import NavAsterois from '../../Components/NavAsteroids/NavAsteroids'


// const style = {
//     position: "relative",
//     margin: "50px auto"
// }


class Asteroids extends Component {
   
render() {

    return (
        <div>
            <div className="fondoSet"></div>
            <div><NavAsterois /></div>
            <div className="p-5 border bg-light">
                <InfoAsteroides />     
            </div>

        </div>
    )
}}

export default Asteroids;
