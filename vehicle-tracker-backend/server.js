require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeDataRoutes = require('./routes/routeDataRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/route-data', routeDataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
