import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success,setSuccess] = useState('')

    const handleChange = (e) => {
        setError('')
        setForm({ ...form, [e.target.name]: e.target.value })
        // console.log(form)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!form.email) {
            setError("Email field is empty")
            return
        }
        if (!form.password) {
            setError("password field is empty")
            return
        }
        setLoading(true)
        setError('')
        setSuccess('')
        try{
            const response = await api.post('/users/login',form)
            setSuccess("Login successful")
            localStorage.setItem('token',response.data.token)
            navigate('/dashboard')
        }
        catch(error){
            setError(error.response?.data?.message || "Something went wrong")
        }finally{
            setLoading(false)
        }

    }

    return (
        <div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <form onSubmit={handleSubmit}>

                <input type="email" placeholder="email" name="email" value={form.email} onChange={handleChange} />
                <input type="password" placeholder="password" name="password" value={form.password} onChange={handleChange} />
                <button type="submit" disabled={loading} >{loading? "Login...":"Login"}</button>
            </form>
        </div>
    );
}

export default Login;