import { useAuthContext } from './useAuthContext'
import { useStudentContext } from './useStudentContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: studentsDispatch } = useStudentContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    studentsDispatch({type: 'SET_STUDENTS', payload:null})
  }

  return { logout }
}