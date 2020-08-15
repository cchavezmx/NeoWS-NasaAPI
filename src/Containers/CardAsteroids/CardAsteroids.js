import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor, faSkullCrossbones, faGlobeAmericas, faStar } from '@fortawesome/free-solid-svg-icons'
import './CardAsteroides.css'



const CardAsteroids = (props) => {

      const {name, danger, url, closeApproach} = props
      
      const {sendData} = props
   
        let className = (
            !danger
                ? "cometa"
                : "danger"
            )

        let Stringurl = `${url};old=0;orb=1;cov=0;log=0;cad=0#orb`

        let iconClass = (
          !danger
            ? faMeteor
            : faSkullCrossbones   
          )

    return (
       

      <div className="card mb-3 card mr=3 padingLeft">
      <div className="row no-gutters padingLeft">
        <div className="col-md-4 mt-3">
      <a href={Stringurl}><span className="col-md-4"><FontAwesomeIcon className={className} icon={iconClass}/></span></a> 
      <p onClick={() => {sendData(name, danger, url, closeApproach)}}><FontAwesomeIcon className="setFav" icon={faStar}/></p>
      </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Nombre: <p className="card-text">{name}</p></h5>
        <h6 className="card-title"><i><FontAwesomeIcon icon={faGlobeAmericas}></FontAwesomeIcon></i>Fecha de acercamiento:</h6>
      <p className="card-text">{closeApproach}</p>    
      
    </div>
    </div>
    </div>
    </div>


       
  )


}

export default CardAsteroids
