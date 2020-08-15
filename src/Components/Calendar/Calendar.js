import React from 'react'
import moment from 'moment'
import './Calendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

    
export default class Calendar extends React.Component {

    
    state = {
        dateContext : moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false
    }
    
    constructor(props) {
        super(props);
        this.width = props.width || "200px";
        this.style = props.style || {};
        this.style.width = this.width; 
    }

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();
    
    
    year = () => {
        return this.state.dateContext.format("YYYY");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); 
        return firstDay;
    }

    setMonth = (month) =>{

        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext 
        });
        console.log(this.state.dateContext)            

    }

    nextMonth = () => {

        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month")
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month")
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();

    }

    OnSelectChage = (value, data) => {
        this.setMonth(data)
        this.props.onMonthChange && this.props.onMonthChange();
    }


    SelectList = (props) =>{
        
        let popup = props.data.map((data) =>{
            return(
                <div key={data}>
                <button onClick={(value) => {this.OnSelectChage(value, data)}}>{data}</button>
                </div>
               )
        })

        return (
            <div className="month-popup">
                {popup}
            </div>
        )
    }


    OnChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }
   
    MonthNav = () => {

        return ( 
        
        <span className="label-month"
        onClick={(e) => {this.OnChangeMonth(e, this.month())}}>
            {this.month()}
            {this.state.showMonthPopup && 
            <this.SelectList data={this.months} />}
        </span>            

        )}

        showYearEditor = () =>{
            this.setState({
                showYearNav: true
            });
        }

        setYear= (year) =>{
            let dateContext = Object.assign({}, this.state.dateContext)
            dateContext = moment(dateContext).set("year", year);
            this.setState({
               dateContext: dateContext 
            })
        }
        
        onYearChange = (e) =>{
            this.setYear(e.target.value);
            this.props.onYearChange && this.props(e, e.target.value)
        }

        onKeyUpYear = (e) =>{

            if(e.which === 13 || e.wich === 27) {
                this.setYear(e.target.value);
                this.setYear({
                    showYearNav: false
                })
            }


        }

        YearNav = () =>{
          
            return (
                this.state.showYearNav
                ? <input 
                    defaultValue = {this.year()}
                    className="editor-year"
                    ref={(yearInput) => {this.yearInput = yearInput}}
                    onKeyUp={(e) => {this.onKeyUpYear(e)}} 
                    onChange={(e) => {this.onYearChange(e)}}
                    type="number"
                    placeholder="Year"/> 
                : 
                <span className="label-year"
                onDoubleClick={(e) => {this.showYearEditor()}}>
                {this.year()}
            </span>
            )
        }

            // selecionar dia mes año
            
        onDayClick = (e, day) => {
                     
          this.props.onDayClick && this.props.onDayClick(e, day)
          
        }
        
        onMonthCurrent = (mes) =>{
            mes = this.month()
            console.log(mes)
        }
        
        



    render() {  // con la funcion weekdays, colocamos los dias cortos en una tabla

        
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];   // insetara espacios en blanco de cada tapa de dias del mes. para eso mete los dias del mes en un array en blanco 
                            // se inserta ell valor de key para que no de erro en la consola. 

        for (let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(<td key={i*51} className="emptySlot">  
                {""}
            </td>)
        }
                            // saca los diads de la semana 
        let daysInMonth = []; //revisar lo del tipo de css

        for(let day = 1; day <= this.daysInMonth(); day ++){

            let diaActual = this.currentDay()
            
            let className = (day !== Number(diaActual)  ? "day" : "day current-day")
            daysInMonth.push(
                <td key={day} className={className}>
                    <span onClick={(e) => {this.onDayClick(e, day)}}>{day}</span>
                </td>
                
            )            
        }
        
        
        let totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if((i % 7) !== 1){
                cells.push(row)
            }else {
                let inRow = cells.slice();
                rows.push(inRow);
                cells=[];
                cells.push(row);
            }
            if (i === totalSlots.lenght - 1){
                let inRow = cells.slice();
                rows.push(inRow) // le cambie de row a rows 
            }
        });

        let trElemets = rows.map((value, index) => {
            return (
                <tr key={index*120}>
                    {value}
                </tr>
            )
        })

    return (
        
        <div className="calendar-container" style={this.style}>
          <table className="calendar">
            <thead>
                <tr className="calendar-header">
                    <td colSpan="5">
                        <this.MonthNav />
                        {" "}
                        <this.YearNav />
                 </td>
                 <td className="nav-month">
                    <i><FontAwesomeIcon className="iconsSmall" icon={faChevronLeft} onClick={(e) => {this.prevMonth()}}/>
                    </i></td>
                    <td className="nav-month">
                    <i><FontAwesomeIcon className="iconsSmall" icon={faChevronRight} onClick={(e) => {this.nextMonth()}} />
                    </i> 
                 </td>                  
                </tr>
            </thead>
                <tbody>
                <tr>
                    {weekdays}
                </tr>
                {trElemets}
                
                </tbody>
        </table>
        </div>
    )
}
}


