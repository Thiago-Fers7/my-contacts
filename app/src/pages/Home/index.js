import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import formatPhone from '../../utils/formatPhone';

import Loader from '../../components/Loader';
import Divisor from '../../components/Divisor';
import Button from '../../components/Button';
import ContactsService from '../../services/ContactsService';

import {
  Container, Header, ListContainer, Card, InputSearchContainer, ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/icons/sad.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);

        setContacts(contactsList);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [orderBy]);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquise pelo nome"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <>
          <Divisor marginY="1.6rem" />
          <ErrorContainer>
            <img src={sad} alt="Sad" />

            <div className="details">
              <strong>Ocorreu um erro ao obter os seus contatos!</strong>
              <Button>Tente novamente</Button>
            </div>
          </ErrorContainer>
        </>
      )}

      <ListContainer orderBy={orderBy}>
        <header>
          {!!filteredContacts.length && (
            <button
              type="button"
              onClick={() => setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))}
            >
              <span>Nome</span>
              {' '}
              <img src={arrow} alt="Ordenação" />
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
              <Link to={`/edit/${contacts.id}`}>
                <img src={edit} alt="Editar" />
              </Link>

              <button type="button">
                <img src={trash} alt="Deletar" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}
