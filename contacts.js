const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

console.log(contactsPath);

async function updateContactsList(newList) {
  await fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const parcedData = await JSON.parse(data);

    return parcedData;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const findContact = await contactList.find(
      (contact) => contact.id === contactId
    );
    console.log(findContact);
    return findContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const index = await contactsList.find(
      (contact) => contact.id === contactId
    );
    const filteredContact = contactsList.splice(index, 1);
    updateContactsList(contactsList);
    return filteredContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    contactsList.unshift(newContact);

    updateContactsList(contactsList);
    return contactsList;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
