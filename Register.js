import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { NOTIFY } from '../based/Constants';
import { initRegister } from '../based/InitializeData';
import Language from '../based/Language';
import Notify from '../based/Notify';
import AccountsServices from '../based/services/AccountsServices';

const Register = props => {
    const [data, setData] = useState(initRegister);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (cookie.load('token')) window.location.href = "/manage-products"
    }, [])

    const _handleRegister = async (e) => {
        e.preventDefault();
        const [err, res] = await AccountsServices.Register(data);

        if (!err) {
            Notify(NOTIFY.SUCCESS, Language.getValue("notifyTitle.success"), 'Đăng ký thành công');

            let today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            cookie.save('token', res.data.accessToken, { expires: tomorrow })

            window.location.href = "/manage-products"
        } else {
            Notify(NOTIFY.ERROR, Language.getValue("notifyTitle.error"), 'Đăng ký thất bại');
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
        className="register w-75 mt-custom mx-auto"
        style={{ "--mt-custom-value": "150px" }}
    >
        <h1 className="text-center">Đăng ký tài khoản</h1>
        <div className="row">
            <div className="col-4 m-auto text-center">
                <input
                    id="last_name" name="last_name"
                    className="form-control mt-2"
                    type="text"
                    placeholder="Họ *"
                    value={data.last_name}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.last_name)[0] &&
                    <label htmlFor="last_name" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.last_name)[0].last_name}</label>
                }
                <input
                    id="first_name" name="first_name"
                    className="form-control mt-2"
                    type="text"
                    placeholder="Tên *"
                    value={data.first_name}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.first_name)[0] &&
                    <label htmlFor="first_name" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.first_name)[0].first_name}</label>
                }
                <input
                    id="email" name="email"
                    className="form-control mt-2"
                    type="email" placeholder="Email *"
                    value={data.email}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.email)[0] &&
                    <label htmlFor="email" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.email)[0].email}</label>
                }
                <input
                    id="phone_number" name="phone_number"
                    className="form-control mt-2"
                    type="text"
                    placeholder="Số điện thoại *"
                    value={data.phone_number}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.phone_number)[0] &&
                    <label htmlFor="phone_number" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.phone_number)[0].phone_number}</label>
                }
                <input
                    id="password" name="password"
                    className="form-control mt-2"
                    type="password"
                    placeholder="Mật khẩu *"
                    value={data.password}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.password)[0] &&
                    <label htmlFor="password" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.password)[0].password}</label>
                }
                <input
                    id="confirm_password" name="confirm_password"
                    className="form-control mt-2"
                    type="password"
                    placeholder="Xác nhận mật khẩu *"
                    value={data.confirm_password}
                    onChange={_handleChange} />
                {
                    errors && errors.length > 0 && errors.filter(x => x.confirm_password)[0] &&
                    <label htmlFor="confirm_password" className="w-100 text-left text-danger px-2">{errors.filter(x => !!x.confirm_password)[0].confirm_password}</label>
                }
                <p className="text-left mt-2">Đã có tài khoản? <a href="/login">Đăng nhập ngay</a></p>
                <button className="btn btn-info w-100 font-weight-bold" onClick={_handleRegister}>Đăng ký</button>
            </div>
        </div>
    </div>
};

export default Register;