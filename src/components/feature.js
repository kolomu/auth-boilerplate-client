// only visible if you are logged in

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './layout';
import { fetchMessage } from '../actions';

class Feature extends Component {
    componentWillMount(){
        this.props.fetchMessage();
    }


    render() {
        return (
            <Layout>
                <div>
                    {this.props.message}
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state){
    return {
        message: state.auth.message
    }
}

export default connect(mapStateToProps, { fetchMessage })(Feature);