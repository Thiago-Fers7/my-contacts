import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3333');
  }

  async listContacts(orderBy = 'asc') {
    return this.HttpClient.get(
      `/contacts?orderBy=${orderBy}`,
    );
    // /88bf0dce-c83a-491b-9f33-2ff65e9d5156
  }

  async createContact(contact) {
    return this.HttpClient.post(
      '/contacts', contact,
    );
  }
}

export default new ContactsService();
