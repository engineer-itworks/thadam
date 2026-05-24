const db = require('../firestore/firestore-connection.js');
const Joi = require('joi');

// Create a new product
exports.createProduct = async (req, res) => {
    // const { name, category, price, description } = req.body; // Example fields

    const productSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(50).required(),
        category: Joi.string().min(3).max(20).required(),
        price: Joi.number().min(5).max(1000).required(),
        // email: Joi.string().email().required(),
        // age: Joi.number().min(18).required(),
        // address: Joi.string().optional(),
      });
      
    // Ensure the required data is provided
    // if (!name || !category || !price || !description) {
    //     return res.status(400).json({ error: 'Missing required fields' });
    // }

    const { error, value } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: 'Validation Error',
            details: error.details,
        });
    }

    try {
        const newProductRef = db.collection('products').doc();
        await newProductRef.set(value); // Using the validated value

        res.status(200).json({
            message: 'Product created successfully!',
            data: value,
        });


        // // Reference to the 'products' collection
        // const productsRef = db.collection('products');
    
        // // Add new document to Firestore (auto-generate document ID)
        // const newProductRef = await productsRef.add({
        //     name,
        //     category,
        //     price,
        //     description,
        //     createdAt: admin.firestore.FieldValue.serverTimestamp(), // Automatically set timestamp
        // });
    
        // res.status(201).json({ message: 'Product added successfully', id: newProductRef.id });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message,
        });
    }
};

exports.updateProduct = async (req, res) => {
    const categoryId = req.params.id; // Get category ID from URL parameter
    const updateData = req.body; // Get the fields to update from the request body

    try {
        const docRef = db.collection('products').doc(categoryId);

        // Update document in Firestore
        await docRef.update(updateData);
        res.status(200).json({ message: 'Document successfully updated!' });
    } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'Error updating document' });
    }
};

exports.getAllProducts = async(req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();

        if (productsSnapshot.empty) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Convert Firestore documents to a JSON object array
        const products = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Error retrieving products' });
    }
}

exports.getProductCategories = async(req, res) => {
    try {
        const productCategories = await db.collection('product-categories').get();
    
        if (productCategories.empty) {
        return res.status(404).json({ message: 'No products found' });
        }
    
        // Convert Firestore documents to a JSON object array
        const categories = productCategories.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Error retrieving products' });
    }
}