import React, { useState } from "react";
import { getFirebase } from "../firebase";
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';





const labelStyles = {
    display: "block",
    marginBottom: 4
};

const inputStyles = {
    width: "100%",
    height: "2rem",
    lineHeight: "2rem",
    verticalAlign: "middle",
    fontSize: "1rem",
    marginBottom: "1.5rem",
    padding: "0 0.25rem"
};


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [googleUser, setGoogleUser] = useState();

    getFirebase().auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user);
            setUser(user);
        }
    });


    const logIn = () => {
        getFirebase().auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    const signOut = () => {
        getFirebase()
            .auth()
            .signOut()
            .then(() => {
                setUser();
                setGoogleUser();
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    };

    const responseGoogle = response => {
        setGoogleUser(response);
        setEmail(response.profileObj.email);
    };

    if (user ?? googleUser) {
        return (
            <>
                <h1>{`Logged in as: ${email}`}</h1>
                <button style={{
                    border: "none",
                    color: "#fff",
                    backgroundColor: "#039be5",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "0.9rem"
                }}

                    onClick={signOut} > Sign Out</button >
                <Link to="/" style={{
                    border: "none",
                    color: "#fff",
                    backgroundColor: "#039be5",
                    borderRadius: "4px",
                    padding: "8px 12px",
                    fontSize: "0.9rem"
                }}> View your profile</Link>



            </>
        );
    }

    return (

        <>
            <h1>Sign in</h1>
            <section style={{ margin: "2rem 0" }}>
                <label style={labelStyles} htmlFor="email-field">Email</label>
                <input
                    id="email-field"
                    style={inputStyles}
                    type="email"
                    value={email}
                    onChange={({ target: { value } }) => {
                        setEmail(value);
                    }}
                />

                <label style={labelStyles} htmlFor="password-field">Password</label>
                <input
                    id="password-field"
                    style={inputStyles}
                    type="password"
                    value={password}
                    onChange={({ target: { value } }) => {
                        setPassword(value);
                    }}
                />

                <div style={{ textAlign: "right" }}>
                    <button
                        style={{
                            border: "none",
                            color: "#fff",
                            backgroundColor: "#039be5",
                            borderRadius: "4px",
                            padding: "8px 12px",
                            fontSize: "0.9rem"
                        }}
                        onClick={logIn}
                    >
                        Log In
                    </button>
                    <GoogleLogin
                        clientId="299062469029-b04om2tb8n8hnk2e9ed2i7o718tidook.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />


                </div>
            </section>
        </>
    );
};

export default SignIn;