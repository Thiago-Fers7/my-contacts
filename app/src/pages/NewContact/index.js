import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        ...formData,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.createContact(contact);

      console.log(response);
    } catch {
      alert('Erro ao criar contato');
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
