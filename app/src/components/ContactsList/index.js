import { Link } from 'react-router-dom';
import { memo } from 'react';
import PropTypes from 'prop-types';
import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import { Card } from './styles';

function ContactsList({
  filteredContacts,
  handleOrderBy,
  handleDeleteContact,
}) {
  return (
    <>
      <header>
        {!!filteredContacts.length && (
          <button
            type="button"
            onClick={handleOrderBy}
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
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Editar" />
            </Link>

            <button type="button" onClick={() => handleDeleteContact(contact)}>
              <img src={trash} alt="Deletar" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category_id: PropTypes.number,
    category_name: PropTypes.string,
  })).isRequired,
  handleOrderBy: PropTypes.func.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default memo(ContactsList);
