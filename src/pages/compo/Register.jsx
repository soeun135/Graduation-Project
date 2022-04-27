import React, { useState } from 'react';
import axios from 'axios'

const Register = () => {
    const [userForm,setUserForm]=useState({
        id:'',
        pw:'',
        pwCheck:'',
    });

    const onChange=(event)=>{
        //console.log(event.target.value);
        setUserForm({
            ...userForm,
            [event.target.name]:event.target.value,
        })
    };

    const onClick=(event)=>{
        if(userForm.pw!==userForm.pwCheck){
            alert('check pw!');
        }
        else{
            axios.post('/api/register',userForm
            ).then(
                document.location.href='/login'
            ).catch((err)=>{
                console.log(err);
            })
        }
    }
    return (
        <div>
            ID : <input name='id' placeholder='id' onChange={onChange}/><br/>
            PW : <input name='pw' placeholder='pw' onChange={onChange}/><br/>
            PW Check : <input name='pwCheck' placeholder='pw check' onChange={onChange}/><br/>
            <button onClick={onClick}>register button</button>
        </div>
    );
};

export default Register;