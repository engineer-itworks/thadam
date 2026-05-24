const db = require('../firestore/firestore-connection.js');
const Joi = require('joi');

const { getFormattedErrorMessage, userSchema } = require('../validators/joiValidator.js');

// Create a new user
exports.createCustomer = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            details: getFormattedErrorMessage(error),
        });
    }

    try {
        const newCustomerRef = db.collection('users').doc();
        await newCustomerRef.set(value); // Using the validated value

        res.status(200).json({
            message: 'User created successfully!',
            data: value,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

// Update existing user
exports.updateCustomer = async (req, res) => {
    const { error, value } = customerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            details: getFormattedErrorMessage(error),
        });
    }

    try {
        // Check if customer exists
        const customerRef = db.collection('customers').doc(req.params.id);
        const customerDoc = await customerRef.get();

        if (!customerDoc.exists) {
            return res.status(404).json({
                message: 'Customer not found!',
            });
        }

        // Update the customer data in Firestore
        await customerRef.update(value); // Updates the document with new data

        return res.status(200).json({
            message: 'Customer updated successfully!',
            data: value,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        await db.collection("customers").doc(req.params.id).delete();

        return res.status(200).json({
            message: 'Customer deleted successfully!',
            data: "",
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

exports.getAllCustomers = async(req, res) => {
    try {
        const customersSnapshot = await db.collection('customers').get();

        if (customersSnapshot.empty) {
            return res.status(200).json([]);
        }

        // Convert Firestore documents to a JSON object array
        const customers = customersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(customers);
    } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Error retrieving customers' });
    }
}