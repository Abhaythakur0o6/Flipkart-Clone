import React, { useEffect, useState } from 'react'
import "./LoginSignup.css"
import { useDataContextProvider } from '../../context/DataProvider';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signUpUser, VerifyOtp } from '../../redux/features/UserSlice';
import { SendOtp } from '../../service/Api';

const LoginSignup = () => {

    const { setLoginForm, setUserInfo } = useDataContextProvider();

    const dispatch = useDispatch();

    const toggleForm = (e) => {
        // e.stopPropagation();
        setLoginForm(false)
    }

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        phone: ""
    })

    const onInputChange = (e) => {
        const newData = { ...signupData, [e.target.name]: e.target.value };
        setSignupData(newData);
    };

    const onloginInputChange = (e) => {
        const newData = { ...loginData, [e.target.name]: e.target.value };
        setLoginData(newData);
    };

    // when page changed (from Login to Signup)

    const changeForm = () => {
        setSignupData({
            name: "",
            email: "",
            username: "",
            password: "",
            phone: ""
        })
        setLoginData({
            email: "",
            password: "",
        })

        if (form === "login") {
            setForm("signup")
        } else {
            setForm("login")
        }
    }

    const { user } = useSelector(state => state.user)

    const loghimin = () => {
        dispatch(loginUser(loginData))
    }

    const signupHandeler = () => {
        dispatch(signUpUser(signupData))
    }

    useEffect(() => {
        if (user) {
            setLoginForm(false)
        }
    }, [user])

    const [form, setForm] = useState("login")

    let content;

    const inputRef = React.useRef([])

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputRef.current[index - 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRef.current[index]) {
                inputRef.current[index].value = char;
            }
        });
    }

    const reqOtp = async (email) => {
        const res = await SendOtp(email)
        setForm("otp")
    }

    const checkOtp = (email) => {
        let otp = ""
        inputRef.current.forEach((input, index) => {
            otp = otp + input.value
        })
        dispatch(VerifyOtp({ email: email, otp: otp }))
    }

    if (form === "login") {
        content = <div className="right-section">
            <div className="input-section">
                <input value={loginData.email} onChange={onloginInputChange} type="email" placeholder='Enter Email' name='email' />
                <input value={loginData.password} onChange={onloginInputChange} type="password" placeholder='Enter Password' name='password' />
                <p>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                <button onClick={loghimin} className='login-button'>Login</button>
                <h6>OR</h6>
                <button className='otp-button' onClick={() => reqOtp(loginData.email)}>Request OTP</button>
            </div>
            <div className="input-text">
                <p onClick={changeForm}>New to FlipKart ? Create a account</p>
            </div>
        </div>
    } if (form === "signup") {
        content = <div className="right-section" >
            <div className="signup-input-section">
                <input value={signupData.name} type="text" onChange={onInputChange} placeholder='Enter Your Name' name='name' />
                <input value={signupData.email} type="email" onChange={onInputChange} placeholder='Enter Email' name='email' />
                <input value={signupData.username} type="text" onChange={onInputChange} placeholder='Enter Username' name='username' />
                <input value={signupData.password} type="password" onChange={onInputChange} placeholder='Enter Password' name='password' />
                <input value={signupData.phone} type="tel" onChange={onInputChange} placeholder='Enter Phone' name='phone' />
                <button type="button" onClick={signupHandeler}>Continue</button>
            </div>
            <div className="input-text">
                <p onClick={changeForm}>Already have account ? Log in</p>
            </div>
        </div>
    } if (form === "otp") {
        content = <div className="right-section">
            <div className="otp-input">
                <p>Enter 6 digit OTP sent to your email</p>
                <div className="otp-fields" onPaste={handlePaste}>
                    {Array(6).fill(0).map((_, index) => (
                        <input onKeyDown={(e) => handleKeyDown(e, index)} type="text" onChange={(e) => handleInput(e, index)} maxLength={1} key={index} required ref={e => inputRef.current[index] = e} />
                    ))}
                </div>
                <button className='otp-submit-button' onClick={() => checkOtp(loginData.email)}>Verify</button>
                <p className="resend-otp">Didn't receive the code? <span>Resend</span></p>
            </div>
        </div>
    }
    return (
        <>
            <div className="login-signup" onClick={toggleForm}>
                <div className="login-signup-container" onClick={(e) => e.stopPropagation()}>
                    <div className="left-section">
                        <div className="left-section-text">
                            {form === "login" || " otp" ? <h2>Login</h2> : <h2>Sign Up</h2>}
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="left-section-image">
                            <img src={"https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"} alt="" />
                        </div>
                    </div>
                    {content}
                </div>
                <div onClick={(e) => toggleForm(e)} className="cross">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
        </>
    )
}

export default LoginSignup