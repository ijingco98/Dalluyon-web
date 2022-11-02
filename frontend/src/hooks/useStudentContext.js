import {StudentsContext} from '../context/StudentsContext'
import { useContext } from 'react'

export const useStudentContext = () => {
    const context = useContext(StudentsContext)

    if (!context) {
        throw Error('error')
    }

return context
}

export default useStudentContext