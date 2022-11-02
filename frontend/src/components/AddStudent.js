import { useState } from "react"
import {useStudentContext} from "../hooks/useStudentContext"
import { useAuthContext } from '../hooks/useAuthContext'
import style from './AddStudent.module.css'


import add from '../images/add.png'


const AddStudent = () => {
    const { dispatch } = useStudentContext()
    const { user } = useAuthContext()

    const [studentCount, setStudentCount] = useState(0);
    const [name, setname] = useState('')
    const [number, setNumber] = useState('')
    const [surfLevel, setSurfLevel] = useState('')
    const [payment, setPayment] = useState('')
    const [duration, setDuration] = useState('')
    const [instructor, setInstructor] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(studentCount);

        if (!user) {
          setError('You must be logged in')
          return
        }

        const student = {
            name,
            number,
            surfLevel,
            payment,
            duration,
            instructor,
            image
        }
        
        const response = await fetch('/api/students', {
          method: 'POST',
          body: JSON.stringify(student),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          setError(null)
          setEmptyFields([])
          setname('')
          setNumber('')
          setSurfLevel('')
          setPayment('')
          setDuration('')
          setInstructor('')
          setImage('')
          dispatch({type: 'ADD_STUDENT', payload: json})
        }
    
      }

    return(
        <form className={style.form} onSubmit={handleSubmit}>
            {/* <h3> Add a Student</h3> */}
            <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setname(e.target.value)} 
        value={name}
        className={emptyFields.includes('name')? 'error': ''}
        className={style.option}
      />

            <label>Phone Number:</label>
      <input 
        type="number" 
        onChange={(e) => setNumber(e.target.value)} 
        value={number}
        className={emptyFields.includes('number')? 'error': ''}
        className={style.option}
      />

          <label for="standard-select">Surf Level:</label>

      <div class="select">
        <select
        id="standard-select"
        type="text" 
        onChange={(e) => setSurfLevel(e.target.value)} 
        value={surfLevel}
        className={style.option}>
          <option value="none"> </option>
          <option value="Beginner">Beginner</option>
          <option value="Beginner with limited experience">Beginner with limited experience</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
      </select>
      <span class="focus"></span>
    </div>

            <label>Payment:</label>

      <input 
        type="text" 
        onChange={(e) => setPayment(e.target.value)} 
        value={payment}
        className={emptyFields.includes('payment')? 'error': ''}
        className={style.option}
      />

        <label for="standard-select">Duration in Minutes:</label>

      <div class="select">
        <select 
        id="standard-select"
        type="number"
        onChange={(e) => setDuration(e.target.value)}  
        value={duration}
        className={style.option}>
          <option value="0"> </option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">1 hour and 30 minutes</option>
          <option value="120">2 hours</option>
          <option value="180">3 hours</option>
        </select>
        <span class="focus"></span>
        </div>

          <label for="standard-select">Instructor:</label>

      <div class="select">
        <select
        id="standard-select"
        type="text"
        onChange={(e) => setInstructor(e.target.value)} 
        value={instructor}
        className={style.option}>
          <option value="none"> </option>
          <option value="Liam">Liam</option>
          <option value="Kyle">Kyle</option>
          <option value="Jerry">Jerry</option>
          <option value="Iking">Iking</option>
          <option value="Balong">Balong</option>
        </select>
       <span class="focus"></span>
       </div>

                  <label>Image:</label>
      <input 
        type="text" 
        onChange={(e) => setImage(e.target.value)} 
        value={image}
        className={style.option}
      />
    <button className={style.button} onClick={() => setStudentCount(studentCount + 1)}>Add Student</button>
    {error && <div className="error">{error}</div>}
        </form>
    )
}
export default AddStudent