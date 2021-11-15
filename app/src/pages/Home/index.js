import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import formatPhone from '../../utils/formatPhone';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    fetch(`http://localhost:3333/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, [orderBy]);

  return (
    <Container>

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquise pelo nome"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer orderBy={orderBy}>
        <header>
          {filteredContacts.length ? (
            <button
              type="button"
              onClick={() => setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))}
            >
              <span>Nome</span>
              {' '}
              <img src={arrow} alt="Ordenação" />
            </button>
          ) : (
            <strong>Nenhum contato encontrado!</strong>
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
