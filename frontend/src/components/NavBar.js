import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import style from './NavBar.module.css'

const Navbar = () => {
  const { user } = useAuthContext()

  return (
    <header>
      <div className="container">
       {user && ( <Link to="/"><h1 className={style.students}>Students</h1> </Link> )}
       {user && ( <Link to="/admin"> <h1 className={style.admin}>Admin</h1> </Link> )}
        <nav>
        {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar