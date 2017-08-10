import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';

import Layout from '../layout';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
        // need to do something to log user in
        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password } } = this.props;

        return (
            <Layout>
            <div>
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <fieldset className="form-group">
                            <label>Email:</label>
                            <Field name="email" component="input" type="text" className="form-control" {...email} />
                        </fieldset>
                        <fieldset className="form-group">
                            <label>Password:</label>
                            <Field name="password" component="input" type="password" className="form-control" {...password} />
                        </fieldset>
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Sign in</button>
                    </form>
            </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

// Redux Form Helper, inside the Helper we have Field Definitions
// first set of paranthesis for configuration, 
// second set for component
Signin = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin)

Signin = connect(mapStateToProps, { signinUser })(Signin);
export default Signin;

// gives us access to this.props.fields.email / pw
// Hook up redux form reducer
// Action Creator to verify if pw is right