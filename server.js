require('dotenv').config();
const app = require('./src/app');
const basicConfig = require('./src/config/basic');
const db = require('./src/utils/db');
const { dbUri } = require('./src/config/db');

// making connection to database
db.connectDB((basicConfig.node.env === 'production') ? dbUri.prod : dbUri.dev);

app.listen(basicConfig.port, () => {
  console.log(`server is running on port ${basicConfig.port}`);
});
