import React, { useState, useRef, useEffect } from "react";
import { useStudentContext} from "../hooks/useStudentContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import style from './StudentDetails.module.css'

const getTimestampInSeconds = (myDate) => {
  return Math.floor(myDate.getTime() / 1000);
};

const secondsToTimeString = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const StudentDetails = ({student}) => {
 
  const {dispatch} = useStudentContext()
  const { user } = useAuthContext()
  const handleClick = async () => {

    if (!user) {
      return
    }

  const response = await fetch('/api/students/'+ student._id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  const json = await response.json()

  if(response.ok){
    dispatch({type: 'DELETE_STUDENT', payload: json})
  }
  }

  const [timeRemaining, setTimeRemaining] = useState('....');

	const resetCountdown = () => {};

	useEffect(() => {
		const durationInSeconds = student.duration * 60;
		const dateNowInSeconds = getTimestampInSeconds(new Date());
		const createdAtInSeconds = getTimestampInSeconds(new Date(student.createdAt));
		let remTimeInSeconds = durationInSeconds - (dateNowInSeconds - createdAtInSeconds);

		if (remTimeInSeconds > 0) {
			const timerStart = setInterval(() => {
				if (remTimeInSeconds > 0) {
					remTimeInSeconds = remTimeInSeconds - 1;
					const remTime = secondsToTimeString(remTimeInSeconds);
					setTimeRemaining(remTime);
				} else {
					setTimeRemaining('Time lapsed');
					clearInterval(timerStart);
				}
			}, 1000);
		}else {
			setTimeRemaining('Time lapsed');
		}
	}, []);

  return (
      <div className= {style.details}>
          <img src={student.image} alt="student" className= {style.profile}/>
          <h4 className= {style.name} >Name: {student.name}</h4>
          <p>Number: {student.number}</p>
          <p>Surf Level: {student.surfLevel}</p>
          <p>Payment: {student.payment}</p>
          <p>Class Duration: {student.duration}</p>
          <p>Assigned Instructor: {student.instructor}</p>
          <p>{formatDistanceToNow(new Date(student.createdAt), {addSuffix: true})}</p>
          <span onClick={handleClick}>Delete</span>
          <h2>{timeRemaining}</h2>
      </div>
 
    )
  }
  
  export default StudentDetails