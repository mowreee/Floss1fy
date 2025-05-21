### Step 1: Set Up the Backend Project

1. **Create a New Directory for the Backend:**
   Open your terminal and navigate to the directory where you want to create your backend project. Then create a new directory:

   ```bash
   mkdir backend
   cd backend
   ```

2. **Initialize a New Node.js Project:**
   Run the following command to create a `package.json` file:

   ```bash
   npm init -y
   ```

3. **Install Required Packages:**
   Install Express, Mongoose (for MongoDB), and any other necessary packages:

   ```bash
   npm install express mongoose cors dotenv
   ```

   - `express`: A web framework for Node.js.
   - `mongoose`: An ODM (Object Data Modeling) library for MongoDB and Node.js.
   - `cors`: A middleware to enable CORS (Cross-Origin Resource Sharing).
   - `dotenv`: A module to load environment variables from a `.env` file.

### Step 2: Set Up MongoDB

1. **Create a MongoDB Database:**
   If you haven't already, create a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution or install MongoDB locally.

2. **Get Your Connection String:**
   If you're using MongoDB Atlas, get your connection string from the dashboard. It will look something like this:

   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

3. **Create a `.env` File:**
   In your backend directory, create a `.env` file to store your environment variables:

   ```bash
   touch .env
   ```

   Add your MongoDB connection string to the `.env` file:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   ```

### Step 3: Create the Server

1. **Create a `server.js` File:**
   In the backend directory, create a `server.js` file:

   ```bash
   touch server.js
   ```

2. **Set Up Express Server:**
   Open `server.js` and add the following code:

   ```javascript
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Connect to MongoDB
   mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => console.log('MongoDB connected'))
       .catch(err => console.error(err));

   // Define Routes
   app.get('/', (req, res) => {
       res.send('API is running...');
   });

   // Start the server
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

### Step 4: Create Models and Routes

1. **Create a `models` Directory:**
   Create a directory for your MongoDB models:

   ```bash
   mkdir models
   ```

2. **Create a Model:**
   Create a file for your data model, for example, `Appointment.js`:

   ```bash
   touch models/Appointment.js
   ```

   Add the following code to define the Appointment model:

   ```javascript
   const mongoose = require('mongoose');

   const appointmentSchema = new mongoose.Schema({
       dentist: { type: String, required: true },
       date: { type: Date, required: true },
       time: { type: String, required: true },
       status: { type: String, required: true },
   });

   module.exports = mongoose.model('Appointment', appointmentSchema);
   ```

3. **Create Routes:**
   Create a `routes` directory and add a file for your routes, for example, `appointments.js`:

   ```bash
   mkdir routes
   touch routes/appointments.js
   ```

   Add the following code to define the routes for appointments:

   ```javascript
   const express = require('express');
   const router = express.Router();
   const Appointment = require('../models/Appointment');

   // Get all appointments
   router.get('/', async (req, res) => {
       try {
           const appointments = await Appointment.find();
           res.json(appointments);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   });

   // Create a new appointment
   router.post('/', async (req, res) => {
       const appointment = new Appointment(req.body);
       try {
           const savedAppointment = await appointment.save();
           res.status(201).json(savedAppointment);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   });

   module.exports = router;
   ```

4. **Use the Routes in `server.js`:**
   Update your `server.js` to use the routes:

   ```javascript
   const appointmentRoutes = require('./routes/appointments');

   app.use('/api/appointments', appointmentRoutes);
   ```

### Step 5: Run the Server

1. **Start the Server:**
   In your terminal, run the following command to start your server:

   ```bash
   node server.js
   ```

   You should see a message indicating that the server is running and connected to MongoDB.

### Step 6: Connect Your React App to the Backend

1. **Make API Calls:**
   In your React application, you can now make API calls to your backend to fetch or send data. For example, you can use `fetch` or `axios` to interact with the `/api/appointments` endpoint.

### Example API Call in React

You can use the `useEffect` hook in your `Dashboard.jsx` to fetch appointments data:

```javascript
useEffect(() => {
    const fetchAppointments = async () => {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        // Set the appointments data to state
    };

    fetchAppointments();
}, []);
```

### Conclusion

You now have a basic backend setup using Node.js and MongoDB for your React application. You can expand this by adding more models, routes, and features as needed. Make sure to handle errors and validate data appropriately in a production environment.