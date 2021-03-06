/* eslint-disable react/jsx-one-expression-per-line */
import {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import formatPhone from '../../utils/formatPhone';

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
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

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
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prev) => prev.filter((contact) => contact.id !== contactBeingDeleted.id));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato exclu??do com sucesso!',
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
          Esta a????o n??o poder?? ser desfeita!
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
                Voc?? ainda n??o tem nenhum contato cadastrado! <br />
                Clique no bot??o <strong>&ldquo;Novo contato&rdquo;</strong> ??
                cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />

              <span>
                Nenhum resultado foi encontrado para <strong>&ldquo;{searchTerm}&rdquo;</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          <header>
            {!!filteredContacts.length && (
              <button
                type="button"
                onClick={() => setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))}
              >
                <span>Nome</span>
                {' '}
                <img src={arrow} alt="Ordena????o" />
              </button>
            )}
          </header>

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div>
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Editar" />
                </Link>

                <button type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="Deletar" />
                </button>
              </div>
            </Card>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
