/*
 *
 * UserLogin
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import Page from 'components/Page';
import SimpleForm from 'components/forms/SimpleForm';

import { updatePath } from 'containers/App/actions';
import { makeSelectAuth } from 'containers/App/selectors';

import { login } from './actions';
import makeUserLoginSelector from './selectors';
import messages from './messages';

export class UserLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { error, messages: message } = this.props.authentication;
    const required = (val) => val && val.length;

    return (
      <div>
        <Helmet
          title={`${this.context.intl.formatMessage(messages.pageTitle)}`}
          meta={[
            {
              name: 'description',
              content: this.context.intl.formatMessage(messages.metaDescription),
            },
          ]}
        />
        <Page
          title={this.context.intl.formatMessage(messages.pageTitle)}
          actions={
            [
              {
                type: 'simple',
                title: 'Cancel',
                onClick: this.props.handleCancel,
              },
              {
                type: 'primary',
                title: 'Login',
                onClick: () => this.props.handleSubmit(
                  this.props.userLogin.form.data
                ),
              },
            ]
          }
        >
          {error &&
            message.map((errorMessage, i) =>
              <p key={i}>{errorMessage}</p>
            )
          }
          <Link to="register">Do not have an account? Register here</Link>
          { this.props.userLogin.form &&
            <SimpleForm
              model="userLogin.form.data"
              handleSubmit={(formData) => this.props.handleSubmit(formData)}
              handleCancel={this.props.handleCancel}
              labels={{ submit: 'Log in' }}
              fields={[
                {
                  id: 'email',
                  controlType: 'input',
                  model: '.email',
                  placeholder: this.context.intl.formatMessage(messages.fields.email.placeholder),
                  validators: {
                    required,
                  },
                  errorMessages: {
                    required: this.context.intl.formatMessage(messages.fieldRequired),
                  },
                },
                {
                  id: 'password',
                  controlType: 'input',
                  model: '.password',
                  placeholder: this.context.intl.formatMessage(messages.fields.password.placeholder),
                  validators: {
                    required,
                  },
                  errorMessages: {
                    required: this.context.intl.formatMessage(messages.fieldRequired),
                  },
                },
                {
                  id: 'passwordReset',
                  controlType: 'link',
                  path: '/login/reset/',
                  label: false,
                  text: this.context.intl.formatMessage(messages.resetPasswordLink),
                  onClick: this.props.handleReset,
                },
              ]}
            />
          }
        </Page>
      </div>
    );
  }
}

UserLogin.propTypes = {
  userLogin: PropTypes.object.isRequired,
  authentication: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

UserLogin.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userLogin: makeUserLoginSelector(),
  authentication: makeSelectAuth(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (formData) => {
      dispatch(login(formData.toJS()));
    },
    handleCancel: () => {
      dispatch(updatePath('/'));
    },
    handleReset: () => {
      dispatch(updatePath('/login/reset/'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
