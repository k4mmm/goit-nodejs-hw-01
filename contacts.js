const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("");

function listContacts() {
  fs.readFile(`${contactsPath}/db/contacts.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(`${contactsPath}/db/contacts.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => contact.id === parseInt(contactId)
    );
    console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(`${contactsPath}/db/contacts.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const contacts = JSON.parse(data);
    const filterContacts = contacts.filter(
      (contact) => contact.id !== parseInt(contactId)
    );
    fs.writeFile(
      `${contactsPath}/db/contacts.json`,
      JSON.stringify(filterContacts),
      (err) => {
        if (err) console.error(err);
      }
    );
    console.table(filterContacts);
  });
}

function addContact(name, email, phone) {
  fs.readFile(`${contactsPath}/db/contacts.json`, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    }
    const contacts = JSON.parse(data);
    const newContact = { id: uuidv4(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    fs.writeFile(
      `${contactsPath}/db/contacts.json`,
      JSON.stringify(updatedContacts),
      (err) => {
        if (err) console.error(err);
      }
    );
    console.table(updatedContacts);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
