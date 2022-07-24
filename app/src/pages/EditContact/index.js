import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        contactFormRef.current.setFieldsValues(contactData);

        setIsLoading(false);
        setContactName(contactData.name);
      } catch {
        history.push('/');
        toast({
          type: 'error',
          text: 'Contato não encontrado.',
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({ type: 'success', text: 'Contato editado com sucesso', duration: 3000 });
    } catch {
      toast({ type: 'error', text: 'Erro ao editar contato' });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : contactName} />
      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Salvar Alterações"
        ref={contactFormRef}
      />
    </>
  );
}
