import React, { useState, useEffect } from 'react';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
const Event = ({ list, counter, index, removeItem }) => {
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  useEffect(() => {
    countdown();
  }, [counter]);

  const countdown = () => {
    const setDate = new Date(`${list.dateEl} ${list.timeEl}`).getTime();
    // const setDate = new Date("September 09, 2021 23:55:00").getTime();
    const currentTime = new Date().getTime();
    const remainingTime = setDate - currentTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 25;

    let remainingDay = Math.floor(remainingTime / day);
    let remainingHour = Math.floor((remainingTime % day) / hour);
    let remainingMinute = Math.floor((remainingTime % hour) / minute);
    let remainingSecond = Math.floor((remainingTime % minute) / second);

    if (remainingSecond < 10) {
      remainingSecond = `0${remainingSecond}`;
    }
    if (
      remainingDay <= 0 &&
      remainingHour <= 0 &&
      remainingMinute <= 0 &&
      remainingSecond < 10
    ) {
      document.querySelectorAll('.specificEvent')[index].classList.add('redBg')
    }
    if (
      remainingDay <= 0 &&
      remainingHour <= 0 &&
      remainingMinute <= 0 &&
      remainingSecond == '00'
    ) {
      removeItem(index);
      document.querySelectorAll('.specificEvent').forEach(item => {
          item.classList.remove('redBg');
      })


    }
    // if (remainingDay < 0) {
    //     removeItem(index)
    // }

    setDay(remainingDay);
    setHour(remainingHour);
    setMinute(remainingMinute);
    setSecond(remainingSecond);
  };

  return (
    <div className={'specificEvent'}>
      <div className='classList'>
        <span className='event-name'>
          <p id='name'></p>
          {list.eventNameEl}
        </span>
        <span>
          <p>day</p>
          <p id='day'>{day}</p>
        </span>
        <span>
          <p>hour</p>
          <p id='hour'>{hour}</p>
        </span>
        <span>
          <p>minute</p>
          <p id='minute'>{minute}</p>
        </span>
        <span>
          <p>second</p>
          <p id='second'>{second}</p>
        </span>
        <span>
          <button className={'removeBtn'} onClick={() => removeItem(index)}>
            <DeleteTwoToneIcon />
          </button>
        </span>
      </div>
    </div>
  );
};

export default Event;
