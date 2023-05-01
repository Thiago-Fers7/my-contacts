import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useNewContact() {
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

  return {
    contactFormRef,
    handleSubmit,
  };
}
