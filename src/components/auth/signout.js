import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Layout from '../layout';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }

    render() {
        return (
            <Layout>
                <div>
                    Sorry to see you go!
                </div>
            </Layout>
        );
    }
}


export default connect(null, actions)(Signout);