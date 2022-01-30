import React, {useEffect, useState} from 'react'
import Event from "./Event";

function App() {



    const [counter, setCounter] = useState(0);
    const [list, setList] = useState([]);
    const [eventNameEl, setEventName] = useState('');
    const [dateEl, setDateEl] = useState('');
    const [timeEl, setTimeEl] = useState('00:00');

    const removeItem = (index) => {
        let filterList = list.filter((item) => list.indexOf(item) !== index)
        setList(filterList)
    }

    useEffect(() => {
        const myInterval = setInterval(() => {
            setCounter(currentCount => {
                return currentCount + 1
            })
        }, 1000)
        return () => {
            clearInterval(myInterval)
        };
    }, []);
    useEffect(() => {
        let dateList = localStorage.getItem('dateList')
        dateList = JSON.parse(dateList)
        if(!dateList) {
            dateList = []
            localStorage.setItem("dateList", JSON.stringify(dateList))
        }
        setList(dateList)
    }, []);
    useEffect(() => {
        localStorage.setItem('dateList', JSON.stringify(list))
    },[list.length])


    const formTitle = document.querySelector('h3')



    const handleSubmit = (e) => {
        e.preventDefault()

        const setDate = new Date(`${dateEl} ${timeEl}`).getTime()
        const currentTime = new Date().getTime()
        const remainingTime = setDate - currentTime;

        if(remainingTime < 0) {
            formTitle.innerText = 'Please Enter Correct Date and Time'
            formTitle.style.color = 'red'
            return
        }
        else if(!eventNameEl) {
            formTitle.innerText = 'Please Enter Event Name'
            formTitle.style.color = 'red'
            return
        }
        else if(!dateEl) {
            formTitle.innerText = 'Please Enter Event Date'
            formTitle.style.color = 'red'
            return;
        }
        else {
            formTitle.innerText = 'Enter New Event Date'
            formTitle.style.color = 'grey'
        }

        let inputsDates = {
            eventNameEl,
            dateEl,
            timeEl
        }

        /*let newList = list.push(inputsDates)*/
        setList([...list, inputsDates])
        localStorage.setItem("dateList", JSON.stringify(list))

        setEventName('')
        setDateEl('')
        setTimeEl('00:00');
    }

    return (
      <section>
          <h1>Countdown Timer</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
              <h3>Enter your event</h3>
              <div className="inputs-div">
                  <input type="text" id='event' placeholder="event"
                         value={eventNameEl}
                         onChange={(e) => setEventName(e.target.value)}
                  />
                  <input type="date" id='date'
                         value={dateEl}
                         onChange={(e) => setDateEl(e.target.value)}
                  />
                  <input type="time" id='time'
                         value={timeEl}
                         onChange={(e) => setTimeEl(e.target.value)}
                  />
                  <button type="submit" className="startBtn">Start</button>
              </div>
          </form>
          <div className="events-container">
              {
                  list.map((item, index) => {
                      return <Event key={index} list={list[index]}
                                    counter={counter}  index={index}
                                    removeItem={removeItem}
                      />
                  })
              }
          </div>

      </section>
    )
}


export default App;