import  React, { useState , useEffect, useRef} from 'react'
import axios from "axios";
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import style from './IncomeAdmin.module.css'


const IncomeAdmin = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => { logout()}
  const [date,setDate] = useState(new Date());
  const [StudentCounter, setStudentCounter]=useState();
  const studentCounter = useRef("...");

  useEffect(() => {
    const header = {'Authorization': `Bearer ${user.token}`}
    axios.get('http://localhost:8080/api/students', {headers:header}).then((res)=>{
      setStudentCounter (res.data.length);
  })
},[]);

const resetIncome = () =>{
  setStudentCounter(0);
}
  return (
    <div>
             {user && (
            <div>
                  <table className= {style.table}>
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Number of Students as of: <br></br>
            {} {}</td>
            <td>{StudentCounter}</td>
        </tr>
        <tr className= {style.active}> 
            <td>Total Income as of: <br></br>
            {} {}</td>
            <td>{!isNaN(StudentCounter)? StudentCounter * 500: ".."}</td>
        </tr>
    </tbody>
</table>

<p>You're logged in as:<span className= {style.email}>{user.email}</span></p>
<br></br>
<button onClick={handleClick}
className= {style.button} >
  Log out</button>

  <button className= {style.button} onClick={resetIncome}>
  Reset Today's Income</button>

</div>
)}
</div>
  )
}

export default IncomeAdmin