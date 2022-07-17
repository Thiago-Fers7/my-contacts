import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        ...formData,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.createContact(contact);

      console.log(response);
      toast({ type: 'success', text: 'Contato criado com sucesso', duration: 3000 });
    } catch {
      toast({ type: 'error', text: 'Erro ao cadastrar contato' });
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        onSubmit={handleSubmit}
        buttonLabel="Cadastrar"
      />
    </>
  );
}
