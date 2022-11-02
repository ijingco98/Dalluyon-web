import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import style from './Login.module.css'



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <section className={style.login}>
      <div className={style.loginBox}>
      <div className={style.left}>
				<div className={style.contact}>
					<form onSubmit={handleSubmit}>
						<h3>SIGN IN</h3>
						<input type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email} 
            placeholder="EMAIL ADDRESS" 
            />
						<input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="PASSWORD" 
            />
						<button className={style.submit} disabled={isLoading} >LET'S GO</button>
            {error && <div className="error">{error}</div>}
					</form>
          </div>
			</div>
      <div className={style.right}>
				<div className={style.rightText}>
					<h2>Dalluyon</h2>
					<h5> An admin website for the <br/>
            surfer instructors in <br/>
            Urbiztondo, La Union</h5>
				</div>
				<div className={style.rightInd}>

        </div>
			</div>
      </div>
    </section>

  )}


//     <form className={style.form} onSubmit={handleSubmit}>

//       <h3>Log In</h3>
//       <label>Email address:</label>
//       <input 
//         type="email" 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//       />
//       <label>Password:</label>
//       <input 
//         type="password" 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//       />

//       <button disabled={isLoading}>Log in</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   )
// }

export default Login