const { v4 } = require('uuid'); // uuid -> Universal Unique ID

let contacts = [
  {
    id: v4(),
    name: 'Thiago',
    email: 'thiago@email.com',
    phone: '123123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Luiz',
    email: 'luiz@email.com',
    phone: '991919199',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.email === email)));
  }

  findById(id) {
    return new Promise((resolve) => resolve(contacts.find((contact) => contact.id === id)));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);

      // "resolve()" sozinho por conta precisar de um retorno
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);

      resolve(newContact);
    });
  }

  update(id, {
    name, phone, category_id, email,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
