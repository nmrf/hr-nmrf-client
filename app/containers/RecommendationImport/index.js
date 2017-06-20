/*
 *
 * RecommendationImport
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { fromJS } from 'immutable';

import { USER_ROLES, CONTENT_SINGLE } from 'containers/App/constants';
// import appMessages from 'containers/App/messages';

import {
  redirectIfNotPermitted,
  updatePath,
} from 'containers/App/actions';

import { isReady } from 'containers/App/selectors';

// import Loading from 'components/Loading';
import Content from 'components/Content';
import ContentHeader from 'components/ContentHeader';
import ImportEntitiesForm from 'components/forms/ImportEntitiesForm';

import viewDomainSelect from './selectors';
import messages from './messages';
import { save, resetForm } from './actions';

export class RecommendationImport extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillReceiveProps(nextProps) {
    // reload entities if invalidated
    if (nextProps.dataReady && !this.props.dataReady) {
      this.props.redirectIfNotPermitted();
    }
  }

  render() {
    const { viewDomain } = this.props;
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
        <Content>
          <ContentHeader
            title={this.context.intl.formatMessage(messages.pageTitle)}
            type={CONTENT_SINGLE}
            icon="recommendations"
            buttons={[{
              type: 'cancel',
              onClick: this.props.handleCancel,
            }]}
          />
          <ImportEntitiesForm
            model="recommendationImport.form.data"
            formData={viewDomain.form.data}
            fieldModel="import"
            handleSubmit={(formData) => this.props.handleSubmit(formData)}
            handleCancel={this.props.handleCancel}
            handleReset={this.props.handleReset}
            saveSuccess={viewDomain.page.saveSuccess}
            saveError={viewDomain.page.saveError}
            template={{
              filename: 'recommendations_template.csv',
              data: [{
                title: 'Title | text (required)',
                number: 'Reference | text (required)',
                accepted: 'Accepted | boolean (true/false)',
                response: 'Response | text (markdown supported)',
              }],
            }}
          />
        </Content>
      </div>
    );
  }
}

RecommendationImport.propTypes = {
  redirectIfNotPermitted: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  viewDomain: PropTypes.object,
  dataReady: PropTypes.bool,
};

RecommendationImport.contextTypes = {
  intl: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  viewDomain: viewDomainSelect(state),
  dataReady: isReady(state, { path: [
    'user_roles',
  ] }),
});

function mapDispatchToProps(dispatch) {
  return {
    redirectIfNotPermitted: () => {
      dispatch(redirectIfNotPermitted(USER_ROLES.MANAGER));
    },
    handleSubmit: (formData) => {
      if (formData.get('import') !== null) {
        fromJS(formData.get('import').rows).forEach((row) => {
          const attributes = row.set('draft', true).toJS();
          dispatch(save({ attributes }));
        });
      }
    },
    handleCancel: () => {
      dispatch(updatePath('/recommendations'));
    },
    handleReset: () => {
      dispatch(resetForm());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationImport);