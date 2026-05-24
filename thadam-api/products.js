const db = require("./firestore/firestore-connection.js");

const getAllProducts = async() => {
    app.get('/get-all-products', async (req, res) => {
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
    });
}
  
exports.createProduct = async(req, res) => {
    //app.post('/create-product', async (req, res) => {
        const { name, category, price, description } = req.body; // Example fields
    
        // Ensure the required data is provided
        if (!name || !category || !price || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
    
        try {
            // Reference to the 'products' collection
            const productsRef = db.collection('products');
        
            // Add new document to Firestore (auto-generate document ID)
            const newProductRef = await productsRef.add({
                name,
                category,
                price,
                description,
                createdAt: admin.firestore.FieldValue.serverTimestamp(), // Automatically set timestamp
            });
        
            res.status(201).json({ message: 'Product added successfully', id: newProductRef.id });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Error adding product' });
        }
    // });
}
  
const updateProduct = async(req, res) => {
    app.put('/products/:id', async (req, res) => {
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
    })
}
  
const getAllProductCategories = async() => {
    app.get('/get-all-product-categories', async(req, res) => {
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
    });
}

// //Products
// createProduct();
// updateProduct();
// getAllProducts();
// //Product Categories
// getAllProductCategories();