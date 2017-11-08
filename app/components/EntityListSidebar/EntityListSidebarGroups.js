/*
 *
 * EntityListSidebarGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EntityListSidebarGroupLabel from './EntityListSidebarGroupLabel';
import EntityListSidebarOption from './EntityListSidebarOption';

const Group = styled.div`
  margin-bottom: 1px;
`;

class EntityListSidebarGroups extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const groups = this.props.groups;

    return (
      <div>
        { groups && groups.entrySeq().map(([groupId, group]) =>
          group.get('options') && group.get('options').size > 0
            ? (
              <Group key={groupId}>
                <EntityListSidebarGroupLabel
                  label={group.get('label')}
                  icon={group.get('icon') || group.get('id')}
                  expanded={this.props.expanded[groupId]}
                  onToggle={(evt) => {
                    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
                    this.props.onToggleGroup(groupId, !this.props.expanded[groupId]);
                  }}
                />
                { this.props.expanded[groupId] &&
                  <div>
                    { group.get('options') &&
                      group.get('options').valueSeq().map((option, i) => (
                        <EntityListSidebarOption
                          key={i}
                          option={option}
                          groupId={group.get('id')}
                          onShowForm={this.props.onShowForm}
                        />
                      ))
                    }
                  </div>
                }
              </Group>
            )
            : null
        )}
      </div>
    );
  }
}
EntityListSidebarGroups.propTypes = {
  groups: PropTypes.object,
  expanded: PropTypes.object,
  onShowForm: PropTypes.func.isRequired,
  onToggleGroup: PropTypes.func.isRequired,
};

EntityListSidebarGroups.contextTypes = {
  intl: PropTypes.object.isRequired,
};

export default EntityListSidebarGroups;