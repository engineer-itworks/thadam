const db = require('../firestore/firestore-connection.js');
const { getFormattedErrorMessage, companySchema } = require('../validators/joiValidator.js');

// Create a new customer
exports.createCompany = async (req, res) => {
    const { error, value } = companySchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            details: getFormattedErrorMessage(error),
        });
    }

    try {
        const newCompanyRef = db.collection('company').doc();
        await newCompanyRef.set(value); // Using the validated value

        res.status(200).json({
            message: 'Company created successfully!',
            data: value,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

// Update existing customer
exports.updateCompany = async (req, res) => {
    const { error, value } = companySchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            details: getFormattedErrorMessage(error),
        });
    }

    try {
        // Check if customer exists
        const customerRef = db.collection('company').doc(req.params.id);
        const customerDoc = await customerRef.get();

        if (!customerDoc.exists) {
            return res.status(404).json({
                message: 'Company not found!',
            });
        }

        // Update the customer data in Firestore
        await customerRef.update(value); // Updates the document with new data

        return res.status(200).json({
            message: 'Company updated successfully!',
            data: value,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        await db.collection("company").doc(req.params.id).delete();

        return res.status(200).json({
            message: 'Company deleted successfully!',
            data: "",
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

exports.getAllCompany = async(req, res) => {
    try {
        const companySnapShot = await db.collection('company').get();

        if (companySnapShot.empty) {
            return res.status(200).json([]);
        }

        // Convert Firestore documents to a JSON object array
        const companies = companySnapShot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(companies);
    } catch (error) {
        console.error('Error retrieving companies:', error);
        res.status(500).json({ error: 'Error retrieving customers' });
    }
}