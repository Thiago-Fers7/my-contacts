import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({ type: 'success', text: 'Contato criado com sucesso', duration: 3000 });
    } catch {
      toast({ type: 'error', text: 'Erro ao cadastrar contato' });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </>
  );
}
