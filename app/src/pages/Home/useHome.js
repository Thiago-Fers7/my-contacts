import {
  useEffect, useMemo, useState, useCallback, useTransition,
} from 'react';
import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [DeferredSearchTerm, setDeferredSearchTerm] = useState('');

  const [isPending, startTransition] = useTransition();

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(DeferredSearchTerm.toLowerCase())
  )), [contacts, DeferredSearchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(value);

    startTransition(() => {
      setDeferredSearchTerm(value);
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  const handleOrderBy = useCallback(() => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prev) => prev.filter((contact) => contact.id !== contactBeingDeleted.id));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato excluído com sucesso!',
      });
    } catch {
      toast({
        type: 'error',
        text: 'Ocorreu um erro ao excluir o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    isPending,
    handleTryAgain,
    orderBy,
    handleDeleteContact,
    handleOrderBy,
  };
}
