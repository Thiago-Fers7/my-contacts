import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Container, Overlay, Footer } from './styles';

import Button from '../Button';

export default function Modal({ danger }) {
  return createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Título do Modal</h1>

        <p>Conteúdo do Modal</p>

        <Footer>
          <button type="button">Cancelar</button>

          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
