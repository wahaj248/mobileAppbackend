const ContactService = require('../utils/contactService');

class ContactController {
    static async addContact(req, res) {
        try {
            // Log req.user to check if userId is available
            console.log('User from JWT:', req.user);
    
            // Check if userId is available
            if (!req.user || !req.user.userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
    
            // Check if file is uploaded
            const contactPicture = req.file ? req.file.path : null;
    
            // Include the file path in contact data
            const contactData = {
                ...req.body,
                contactPicture,
                userId: req.user.userId // Accessing userId correctly from the decoded token
            };
    
            const newContact = await ContactService.createContact(contactData);
            res.status(201).json({ message: 'Contact added successfully', contact: newContact });
        } catch (error) {
            console.error('Error adding contact:', error); // Log the error for debugging
            res.status(400).json({ error: 'Failed to add contact', details: error.message });
        }
    }
    
    
    
    static async getContacts(req, res) {
        try {
            // Log the user ID to ensure it's correct
            console.log('User ID:', req.user.userId);
    
            const contacts = await ContactService.getAllContacts(req.user.userId);
            
            // Log the contacts retrieved
            console.log('Retrieved Contacts:', contacts);
    
            res.status(200).json(contacts);
        } catch (error) {
            console.error('Error retrieving contacts:', error); // Log the error for debugging
            res.status(400).json({ error: 'Failed to retrieve contacts', details: error.message });
        }
    }
    

    static async getContact(req, res) {
        try {
            const contact = await ContactService.getContactById(req.params.id);
            if (!contact) return res.status(404).json({ error: 'Contact not found' });
            res.status(200).json(contact);
        } catch (error) {
            res.status(400).json({ error: 'Failed to retrieve contact', details: error.message });
        }
    }

    static async updateContact(req, res) {
        try {
            // Log the request body and file to check if they are received
            console.log('Request body:', req.body);
            console.log('Uploaded file:', req.file);
    
            // Check if a new image is uploaded
            const contactPicture = req.file ? req.file.path : null;
    
            // Prepare the update data (req.body will have other fields from form-data)
            const updateData = {
                ...req.body,
            };
    
            // If a new image is uploaded, add the contactPicture field to the update
            if (contactPicture) {
                updateData.contactPicture = contactPicture;
            }
    
            // Ensure proper parsing for fields coming from form-data (req.body will be strings)
            if (req.body.someField) {
                updateData.someField = req.body.someField;
            }
    
            const updatedContact = await ContactService.updateContact(req.params.id, updateData);
            if (!updatedContact) {
                return res.status(404).json({ error: 'Contact not found' });
            }
    
            res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
        } catch (error) {
            console.error('Error updating contact:', error);
            res.status(400).json({ error: 'Failed to update contact', details: error.message });
        }
    }
    
    

    static async deleteContact(req, res) {
        try {
            const deletedContact = await ContactService.deleteContact(req.params.id);
            if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
            res.status(200).json({ message: 'Contact deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Failed to delete contact', details: error.message });
        }
    }
}

module.exports = ContactController;
