import React, { useState } from 'react';
import Image from 'next/image';
import logo from './januslogo.png';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA8M_Mu6U-LObR2JObJ8ooAXHXxX49zN9U",
  authDomain: "janus-4326f.firebaseapp.com",
  databaseURL: "https://janus-4326f-default-rtdb.firebaseio.com",
  projectId: "janus-4326f",
  storageBucket: "janus-4326f.appspot.com",
  messagingSenderId: "418343874787",
  appId: "1:418343874787:web:67e43fafabe304a3c8d5d6",
  measurementId: "G-1ZKGB6YD10",
};

const app = initializeApp(firebaseConfig);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Logging in with email: ${email} and password: ${password}`);
	createUserWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		window.location.href = '/start';
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage);
	});
  };


  return (
    <div className="login-container">
      <div className="logo">
        {/* <Image src = {logo} style = {{height: '20%'}}/> */}
      </div>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '1em', cursor: 'pointer', fontFamily: 'myfont' }}>Login</button>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .logo img {
          width: 100px;
          height: auto;
        }
        .login-form {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input {
          margin-bottom: 10px;
          padding: 10px;
          width: 200px;
        }
        button{
			border:1px solid black;
			box-shadow: 3px 3px 3px 0px #888888;
			margin-top: 10px;
			padding-left: 10px;
			cursor: pointer;
			font-size: 1rem;
			transition: background-color 0.2s ease;
		  }
      button:hover {
        box-shadow: 5px 5px 3px 0px #888888;
      }
      `}</style>
    </div>
  );
}
