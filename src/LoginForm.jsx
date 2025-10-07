import { useState } from "react";

const LoginForm = ({login})=>{
    const [formData, setFormData] =  useState({"d": "", "name":"","animal":""})
    const onChange = (evt)=>{
        setFormData({
            ...formData,
            [evt.target.name]:evt.target.value})
    }

    const onSubmit = async (evt)=>{
        evt.preventDefault()
        console.log(formData)
        await login({...formData, custom:{animal:formData.animal}})
    }
    return(
        <form onSubmit={onSubmit}>
            <label>User:</label>
            <input type="text" name="id" value={formData.id} onChange={onChange}/>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={onChange}/>
            <label>Favorite Animal:</label>
            <input type="text" name="animal" value={formData.animal} onChange={onChange}/>
            <button type="submit" className=" border-black p-2">Start!</button>

            <input type="text" name="animal"    
                onChange={()=>console.log("onchange")}  
                // onPaste={()=>console.log("onpaste")}
                onBlur={()=>console.log('onBlur')}
                />
        </form>
    )
}

export default LoginForm;