import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

export default function EditContact() {
  const { state } = useLocation();
  const { name } = state.contact;

  return (
    <>
      <PageHeader title={`Editar ${name}`} />
      <ContactForm buttonLabel="Salvar Alterações" />
    </>
  );
}
