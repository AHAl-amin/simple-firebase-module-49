import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState()
    const auth = getAuth(app);
    const googlProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googlProvider)
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
    const handleGithubsignIn =() =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser)
        })
        .catch(error =>
            {
                console.log(error)
            }
            )
    }

    return (
        <div>

           {
            user ?
             <button onClick={handleSignOut}>sign out</button> :

           <div>
              <button onClick={handleGoogleSignIn}>google login</button>
              <button onClick={handleGithubsignIn}>Github Login</button>
           </div>
           }
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