import { useEffect } from "react"
import {useStudentContext} from "../hooks/useStudentContext"
import { useAuthContext } from "../hooks/useAuthContext"


import StudentDetails from '../components/StudentDetails'
import AddStudent from "../components/AddStudent";

const StudentHome = () => {
  const {students, dispatch} = useStudentContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }
    }
    if (user) {
      fetchStudents()
    }
  }, [dispatch, user])

  return (
    <div className="home">
           <AddStudent />
        {students && students.map(student => (
          <StudentDetails student={student} key={student._id} />
          ))}
    </div>
  )
}
  
  export default StudentHome