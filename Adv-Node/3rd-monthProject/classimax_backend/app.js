
 const userSchema = require('./modals/userModel');
const express = require('express');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json()); 
app.use(fileUpload()); 

// Routes
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



