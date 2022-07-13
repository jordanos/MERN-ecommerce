import { zIndexValues } from 'shared/utils/Styles';
import styled from 'styled-components';

interface Props {
  active: boolean;
}

const StyledModal = styled.div<Props>`
  width: 0;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(4, 18, 88, 0.4);
  opacity: 0;

  ${(props) =>
    props.active && `width: 100%; opacity: 1; z-index: ${zIndexValues.modal};`}
`;

export default StyledModal;
