import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <button disabled={isSubmitting}>Submit</button>
    </Form>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ email, password}) {
        return {
            email: email || "",
            password: password || "",
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
            axios
                .post("https://als-artportfolio.herokuapp.com/art/art", values)
                .then(res => {
                    console.log(res); // Data was created successfully and logs to console
                    resetForm();
                    setSubmitting(false);
                    alert("I am sign in");
                })
                .catch(err => {
                    console.log(err); // There was an error creating the data and logs to console
                    setSubmitting(false);
                });
    }
})(LoginForm);

export default FormikLoginForm;