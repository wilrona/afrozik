import React from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { inject, observer } from 'mobx-react';

const LoginForm = props => {

    const { values, handleChange, isSubmitting, errors } = props;
  
    return (
      <Form>
  
        <ErrorMessage name="all">{msg => <div className="uk-alert-danger" uk-alert="true">{msg}</div>}</ErrorMessage>
  
        <div className="uk-margin">
          <Field id="email" type="text" className="uk-input" name="email" tabIndex="1" placeholder="Adresse Email" />
          {errors && errors.email && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.email}</div>)}
          <Field type="hidden" name="all" />
        </div>
  
        <div className="uk-margin">
          <Field id="password" type="password" className="uk-input" name="password" tabIndex="2" placeholder="Mot de passe" />
          {errors && errors.password && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.password}</div>)}
        </div>
  
        <div className="uk-margin uk-flex uk-flex-center">
          <button type="submit" className="uk-button uk-button-primary uk-width-1-1" tabIndex="3" disabled={isSubmitting}>
            Connexion
          </button>
        </div>
  
      </Form>
    )
};

const FormikLogin = withFormik({

    mapPropsToValues({ email, password, all }) {
        return {
        email: email || '',
        password: password || '',
        all: all || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Inserer une adresse email valide').required('Inserer une adresse email'),
        password: Yup.string().required('Inserer un mot de passe')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {

        const { authStore } = props;

        console.log(values);

        authStore.login(values.email, values.password, (errors) => {
          console.log(errors)
          if(errors && errors.status === 404){
            setErrors({ all: errors.data.message });
            setSubmitting(false)
          }else{
            
          }
        })

        // resetForm();
        // setSubmitting(false)
        
    }

})(LoginForm)


export default inject('authStore')(observer(FormikLogin));