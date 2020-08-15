import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

const NavAsteroids = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark justify-content-between  mb-3 mt-3">
            <p className="navbar-brand mt=3 mb=0" ><FontAwesomeIcon className="astronauta" icon={faRocket}></FontAwesomeIcon>Asteroids - NeoWs</p>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Buscar</button>
            </form>
            </nav>
</div>
    )
}

export default NavAsteroids
