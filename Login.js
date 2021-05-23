import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { NOTIFY } from '../based/Constants';
import { initLogin } from '../based/InitializeData';
import Language from '../based/Language';
import Notify from '../based/Notify';
import AccountsServices from '../based/services/AccountsServices';
import './style.css'
import logo from './logo.png';

console.log(logo); 
const Login = props => {
    const [data, setData] = useState(initLogin);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (cookie.load('token')) window.location.href = "/manage-products"
    }, [])

    const _handleLogin = async (e) => {
        e.preventDefault();
        const [err, res] = await AccountsServices.Login(data);

        if (!err) {
            Notify(NOTIFY.SUCCESS, Language.getValue("notifyTitle.success"), 'Đăng nhập thành công');

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            cookie.save('token', res.data.accessToken, { expires: tomorrow })

            window.location.href = "/manage-products"
        } else {
            Notify(NOTIFY.ERROR, Language.getValue("notifyTitle.error"), 'Đăng nhập thất bại');
            setErrors(err.errors)
        }
    }
    const _handleChange = (e) => {
        setErrors([])
        let updatedData = { ...data }
        updatedData[e.target.name] = e.target.value
        setData(updatedData)
    }

    return <div
        className="register w-50 mt-custom mx-auto "
        style={{ "--mt-custom-value": "100px" }}
        // style={{ "--mt-custom-value": "250px" }}
        // w-50 mt-custom mx-auto
    >
        <div className = "logoSeo m-auto text-center "><img src={logo} alt="Logo" /></div>
        <h1 className="text-center">Sign In </h1>
        
        <div className="row">
            <div className="col-5 m-auto text-center">
            
                <input
                    id="number" name="number"
                    className="form-control mt-2"
                    type="number" placeholder="User *"
                    value={data.number}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.email)[0] &&
                    <label htmlFor="email" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.email)[0].email}</label>
                }
                <input
                    id="password" name="password"
                    className="form-control mt-2"
                    type="password"
                    placeholder="Password *"
                    value={data.password}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.password)[0] &&
                    <label htmlFor="password" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.password)[0].password}</label>
                }
                <a href="#">Forgot your password?</a>
                <button className="btn btn-info w-100 font-weight-bold mt-2" onClick={_handleLogin}>Sign In </button>
            </div>
        </div>
    </div>
};

export default Login; 
