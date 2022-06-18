import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Error toast" />
      <ToastMessage text="Default toast" type="success" />
      <ToastMessage text="Success toast" type="error" />
    </Container>
  );
}
