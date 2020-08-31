import React from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";


import { Link } from 'react-router-dom';

import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

const RegisterForm = props => {

    const { values, handleChange, isSubmitting, errors } = props;
  
    return (
      <Form>
  
        <ErrorMessage name="all">{msg => <div className="uk-alert-warning" uk-alert="true">{msg}</div>}</ErrorMessage>
  
        <div className="uk-margin">
          <Field id="email" type="text" className="uk-input" name="email" tabIndex="1" placeholder="Adresse Email" />
          {errors && errors.email && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.email}</div>)}
          <Field type="hidden" name="all" />
        </div>

        <div className="uk-margin">
          <Field id="pseudo" type="text" className="uk-input" name="pseudo" tabIndex="2" placeholder="Nom et prenom" />
          {errors && errors.pseudo && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.pseudo}</div>)}
        </div>
  
        <div className="uk-margin">
          <Field id="password" type="password" className="uk-input" name="password" tabIndex="3" placeholder="Mot de passe" />
          {errors && errors.password && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.password}</div>)}
        </div>

        <div className="uk-margin">
          <Field id="confirm_password" type="password" className="uk-input" name="confirm_password" tabIndex="4" placeholder="Confirmer le mot de passe" />
          {errors && errors.confirm_password && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.confirm_password}</div>)}
        </div>

        <div className="uk-margin uk-child-width-1-1" uk-grid="true">
          <div >
            <Field as="select" name="sexe" className="uk-select">
              <option value="">Sexe</option>
              <option value="M">Homme</option>
              <option value="F">Femme</option>
            </Field>            
            {errors && errors.sexe && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.sexe}</div>)}
          </div>
          {/* <div>
            <Field as="select" name="age" className="uk-select">
              <option value="0">Age</option>
              <option value="m">Homme</option>
              <option value="f">Femme</option>
            </Field>   
            {errors && errors.age && (<div className="invalid-feedback uk-text-danger uk-text-small">{errors.age}</div>)}
          </div> */}
        </div>
        <p className="uk-text-small uk-text-center">
        En créant un compte sur AfroZikBox, vous acceptez
  nos <Link to="/login">Conditions Générales d’utilisation</Link> et reconnaissez avoir
 lu et compris notre <Link to="/login">Politique de Confidentialité</Link>
.
        </p>
  
        <div className="uk-margin uk-flex uk-flex-center">
          <button type="submit" className="uk-button uk-button-primary uk-width-1-1" tabIndex="3" disabled={isSubmitting}>
            S'inscrire
          </button>
        </div>
        <div className="uk-margin uk-text-center">
          Vous avez déjà un compte ? <Link to="/login">Connexion</Link>
        </div>
  
      </Form>
    )
};

const FormikRegister = withFormik({

    mapPropsToValues({ email, password, pseudo, all, confirm_password, sexe }) {
        return {
        email: email || '',
        pseudo: pseudo || '',
        password: password || '',
        confirm_password: confirm_password || '',
        sexe: sexe || '',
        all: all || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Inserer une adresse email valide').required('Inserer une adresse email'),
        pseudo: Yup.string().required('Inserer un nom et prenom'),
        password: Yup.string().required('Inserer un mot de passe'),
        confirm_password : Yup.string().when("password", {
          is: (val) => (val && val.length > 0) ? true : false,
          then: Yup.string().required('Saisir la confirmation du mot de passe.').oneOf(
            [Yup.ref("password"), null],
            "Les deux mot de passe ne sont pas identique."
        )}
        ),
        sexe: Yup.string().required('Selectionner votre sexe')
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting, props }) {

        const { authStore } = props;

        let data = {
          "nom" : values.pseudo,
          "email" : values.email,
          "password" : values.password,
          "sexe" :values.sexe
        }

        authStore.register(data, (errors) => {

          // console.log(errors.message);
          setErrors({ all: errors.message });


          resetForm();
        })

        
        // setSubmitting(false)
        
    }

})(RegisterForm)

export default inject('authStore')(observer(FormikRegister));