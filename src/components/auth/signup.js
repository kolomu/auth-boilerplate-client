import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUser } from '../../actions';
import Layout from '../layout';

class Signup extends Component {

    handleFormSubmit(formProps){
        // call action creator to sign up the user
        this.props.signupUser(formProps);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                <strong>Oops! </strong>{this.props.errorMessage}
                </div>  
            );
        }
    }


    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

        return (
            <Layout>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} 
                      className="signupForm">

                    <fieldset className="form-group">
                        <Field name="email"
                            type="text"
                            component={renderField}
                            label="Email"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="password"
                            type="password"
                            component={renderField}
                            label="Password"
                        />

                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="passwordConfirm"
                            type="password"
                            component={renderField}
                            label="Password confirmation"
                        />
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit"
                        className="btn btn-primary">Sign up!
                    </button>
                </form>
            </Layout>
        );
    }
}

// will be called with all the properties of the forms, field-names
// and field-values
function validate(values) {
    const errors = {};

    if(!values.email){
        errors.email = 'Please enter an email';
    }

    if(!values.password){
        errors.password = 'Please enter a password';
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match!';
    }

    return errors;
}

// RenderField Component
const renderField = ({ input, label, type,
    meta: { touched, error, warning } }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} 
                  placeholder={label} 
                  type={type} 
                  className="form-control" />
                { touched && ((error && <div className="alert alert-danger"> {error} </div>) ||
                  (warning && <div className="alert alert-warning"> {warning} </div>))
                }
            </div>
        </div>
    );
}

const warn = values => {
  const warnings = {}
  if (values.password && values.password.length < 5) {
    warnings.password = 'Password is not very save! Recommendend length is above 5 characters!'
  }
  return warnings
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error};
}

Signup = reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate,
    warn
})(Signup);

Signup = connect(mapStateToProps, { signupUser })(Signup);
export default Signup;