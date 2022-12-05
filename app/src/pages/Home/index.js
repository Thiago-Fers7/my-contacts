/* eslint-disable react/jsx-one-expression-per-line */
import {
  useEffect, useMemo, useState, useCallback, useTransition,
} from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Divisor from '../../components/Divisor';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import toast from '../../utils/toast';
import ContactsService from '../../services/ContactsService';

import {
  Container,
  Header,
  ListContainer,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';
import ContactsList from '../../components/ContactsList';

export default function Home() {
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

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
      >
        <p>
          Esta ação não poderá ser desfeita!
        </p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquise pelo nome"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header justifyContent={
        // eslint-disable-next-line no-nested-ternary
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )
      }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      <Divisor marginY="1.6rem" />

      {isPending && <h1>Carregando...</h1>}

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button onClick={handleTryAgain}>Tente novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {(!hasError && !isLoading) && (
        <ListContainer orderBy={orderBy}>
          {contacts.length < 1 && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                Você ainda não tem nenhum contato cadastrado! <br />
                Clique no botão <strong>&ldquo;Novo contato&rdquo;</strong> à
                cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />

              <span>
                Nenhum resultado foi encontrado para <strong>&ldquo;{searchTerm}&rdquo;</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            handleDeleteContact={handleDeleteContact}
            handleOrderBy={handleOrderBy}
          />
        </ListContainer>
      )}
    </Container>
  );
}
