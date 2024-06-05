import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePaddwordVisiblity = () => {
    setShowPassword(!showPassword);
  }

  const [error, setError] = useState();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/auth/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      window.location = "/home";
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className={styles.inputContainer}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <input type="text" placeholder="Username" name="username" value={data.username} onChange={handleChange} className={styles.input} required/>
              <hr />
            </div>
            <div className={styles.inputConatiner}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={data.password} onChange={handleChange} className={styles.input} required/>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash: faEye} className={styles.passwordVisibility} onClick={togglePaddwordVisiblity}/>
              <hr />
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>Log in</button>
            <a href="/login">Forgot your password ?</a>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Don't have an account ?</h1>
          <hr />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid quidem dolores provident obcaecati, iure suscipit rem quos similique eos, dolorum, assumenda error tempora corrupti? Accusantium dolore aliquam suscipit quasi sapiente?</p>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>Sign up</button>
          </Link>
          <p>or continue with</p>
          <div>
            <FontAwesomeIcon icon={faGoogle} className={styles.brandIcon} />
            <FontAwesomeIcon icon={faApple} className={styles.brandIcon} />
            <FontAwesomeIcon icon={faGithub} className={styles.brandIcon}/>
          </div>
        </div>
      </div>
    </div>
  )
}
