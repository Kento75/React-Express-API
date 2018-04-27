import mongoose from 'mongoose';

export default () => {
  const connect = () => {
    const DB_URI = 'mongodb://localhost/Express_api';
    mongoose.connect(DB_URI, (err) => {
      if (err) {
        console.log(`===>  Error connecting to ${DB_URI}`);
        console.log(`Reason: ${err}`);
      } else {
        console.log(`===>  Succeeded in connecting to ${DB_URI}`);
      }
    });
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

};