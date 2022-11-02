import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import style from './Signup.module.css'


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className={style.signup} onSubmit={handleSubmit} >
      <h3 className={style.head}>Sign Up</h3>
      <input 
       className={style.input}
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        placeholder="EMAIL ADDRESS" 
      />
      <input 
        className={style.input}
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
        placeholder="PASSWORD" 
      />
      <button disabled={isLoading} className={style.submit} >Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup