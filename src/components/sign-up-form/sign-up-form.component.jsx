

import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}


const SignUpForm = () => {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const { displayName,email,password,confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{ displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use")
            } else {
                console.error(error);
            }
        }

    }

    console.log(formFields)

    const handleChange = (e) => {
        e.preventDefault();
        const { name,value } = e.target;

        setFormFields({ ...formFields,[name]: value })
    }

    return (

        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Display Name'
                    required
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    required
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={email} />
                <FormInput
                    label='Password'
                    required
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password} />
                <FormInput
                    label='Confirm Password'
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword} />
                <Button>Sign Up</Button>
                <Button buttonType='inverted'>Sign in</Button>
                <Button buttonType='google'>Sign in with google</Button>
            </form>
        </div>


    )

}
export default SignUpForm;
