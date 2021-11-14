const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve(`${__dirname}/db/contacts.json`);

async function listContacts() {
  try {
    const contactsFile = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(contactsFile);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error(error);
    const contacts = [];
    return contacts;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === parseInt(contactId)
  );
  console.table(contact);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filterContacts = contacts.filter(
    (contact) => contact.id !== parseInt(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
  console.table(filterContacts);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.table(updatedContacts);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
