const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  // Obter Um registro
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact ID' });
    }

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not found
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.status(401).json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const {
      name, phone, email, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category ID' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.create({
      name,
      phone,
      email: email || null,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const {
      name, phone, category_id, email,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact ID' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category ID' });
    }

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      phone,
      email: email || null,
      category_id: category_id || null,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact ID' });
    }

    await ContactsRepository.delete((id));

    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton { desingn pattern }
module.exports = new ContactController();
