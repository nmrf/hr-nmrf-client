import styled from 'styled-components';
import { palette } from 'styled-theme';

const FieldGroupLabel = styled.div`
  position: relative;
  display: table;
  width: 100%;
  border-bottom: 2px solid ${palette('light', 3)};
  padding: 10px 0 3px;
  font-weight: bold;
  color: ${palette('text', 0)};
`;

export default FieldGroupLabel;
