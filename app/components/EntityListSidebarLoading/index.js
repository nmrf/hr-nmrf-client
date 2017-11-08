/*
 *
 * EntityListSidebarLoading
 *
 */
import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import Scrollable from 'components/styled/Scrollable';
import Sidebar from 'components/styled/Sidebar';

const Header = styled.div`
  height: 114px;
  background-color: ${palette('light', 2)};
`;

const Group = styled.div`
  height: 40px;
  display: block;
  width: 100%;
  background-color: ${palette('light', 1)};
  padding: 0.5em 1em 0.5em 1.5em;
  margin-bottom: 1px;
`;

const Option = styled.div`
  height: 50px;
  font-weight: bold;
  padding: 1em 1em 0 1.5em;
  width: 100%;
  background-color: ${palette('asideListItem', 2)};
  border-bottom: 1px solid ${palette('asideListItem', 4)};
`;

const Label = styled.div`
  background-color: ${palette('light', 3)};
  height: 0.85em;
  width: ${(props) => props.width}%;
`;

const ScrollableWrapper = styled(Scrollable)`
  background-color: ${palette('light', 0)};
`;

export class EntityListSidebarLoading extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Sidebar>
          <ScrollableWrapper>
            <Header />
            <Group />
            <Option><Label width={30} /></Option>
            <Option><Label width={35} /></Option>
            <Group />
            <Option><Label width={20} /></Option>
            <Option><Label width={25} /></Option>
          </ScrollableWrapper>
        </Sidebar>
      </div>
    );
  }
}

export default EntityListSidebarLoading;