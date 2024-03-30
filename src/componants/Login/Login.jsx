import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState()
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSignOut =() =>{
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}>google login</button>
            <button onClick={handleSignOut}>sign out</button>
            { user &&
             <div>
                <h3>User: {user.displayName}</h3>
                <p>email :{user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;