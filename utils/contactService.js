const Contact = require('../models/contact.model');

class ContactService {
    static async createContact(contactData) {
        const contact = new Contact(contactData);
        return await contact.save();
    }

    static async getAllContacts(userId) {
        return await Contact.find({ userId });
    }

    static async getContactById(contactId) {
        return await Contact.findById(contactId);
    }

    static async updateContact(contactId, updateData) {
        return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
    }

    static async deleteContact(contactId) {
        return await Contact.findByIdAndDelete(contactId);
    }
}

module.exports = ContactService;
