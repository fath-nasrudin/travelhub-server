const { mongoose } = require('../../config/db');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info(`mongodb success connected to: ${uri}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.info('database success disconnected');
  } catch (error) {
    console.errpr(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  disconnectDB,
};
