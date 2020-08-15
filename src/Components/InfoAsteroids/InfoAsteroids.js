import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardAsteroides from '../../Containers/CardAsteroids/CardAsteroids'
// import './InfoAsteroids.css'
import { useHistory } from 'react-router-dom'


const API_KEY = 'iwggBTHxZNIpMFbPVTy2hj4tI8GcI1OwhHOGaiaM'
const URL_API = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2020-08-13&end_date=2020-08-14&api_key=${API_KEY}`


const InfoAsteroids = () => {

    const [asteroids, setAsteroids] = useState([]);
  
    const getAsteroids = () => { 
     axios.get(URL_API)
        .then(resp => setAsteroids(resp.data.near_earth_objects))
         .catch(err => console.log(err))
    }

    Object.keys(asteroids).map((key => asteroids[key].map(element => console.log('link' + element.nasa_jpl_url))))


    useEffect(() => {
        getAsteroids()
    }, [])

    const ID_FIREBASE = 'devf-test-48bc4'

    const favData = useHistory()


    const sendData = (name, danger, url, closeApproach) => {

        const URL = `https://${ID_FIREBASE}.firebaseio.com/task.json`;
        let newData = {name: name, danger: danger, url: url, closeApproach: closeApproach}
        
        axios.post(URL, newData)
        .then(res => favData.push('/'))
        .catch(error => error);

    }



return (
    <div className="d-flex flex-wrap col px-md-5">   
    {

    Object.keys(asteroids).map((key => asteroids[key].map(element => {
       return (

       <CardAsteroides 
            key={element.id}
            name={element.name}
            url={element.nasa_jpl_url}
            closeApproach={element.close_approach_data[0].close_approach_date_full}
            danger={element.is_potentially_hazardous_asteroid}
            sendData={sendData}
        />)       

    })))

    }    
    </div>

)
    
}

export default InfoAsteroids
