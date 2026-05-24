const db = require('../firestore/firestore-connection.js');
const { getFormattedErrorMessage, userSchema } = require('../validators/joiValidator.js');

// Create a new customer
exports.createUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {  
        return res.status(400).json({
            message: 'Validation Error',
            details: getFormattedErrorMessage(error),
        });
    }

    try {
        const newCustomerRef = db.collection('user').doc();
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

// Update existing customer
// exports.updateUser = async (req, res) => {
//     const { error, value } = userSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({
//             message: 'Validation Error',
//             details: getFormattedErrorMessage(error),
//         });
//     }

//     try {
//         // Check if customer exists
//         const userRef = db.collection('user').doc(req.params.id);
//         const userDoc = await userRef.get();

//         if (!userDoc.exists) {
//             return res.status(404).json({
//                 message: 'User not found!',
//             });
//         }

//         // Update the customer data in Firestore
//         await userRef.update(value); // Updates the document with new data

//         return res.status(200).json({
//             message: 'User updated successfully!',
//             data: value,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Internal Server Error',
//             error: error.message,
//         });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         await db.collection("user").doc(req.params.id).delete();

//         return res.status(200).json({
//             message: 'User deleted successfully!',
//             data: "",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Internal Server Error',
//             error: error.message,
//         });
//     }
// };

// exports.getAllUser = async(req, res) => {
//     try {
//         const userSnapshot = await db.collection('user').get();

//         if (userSnapshot.empty) {
//             return res.status(200).json([]);
//         }

//         // Convert Firestore documents to a JSON object array
//         const users = userSnapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         }));

//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error retrieving customers:', error);
//         res.status(500).json({ error: 'Error retrieving users' });
//     }
// }