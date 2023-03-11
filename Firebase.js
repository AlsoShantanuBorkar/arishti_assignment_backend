var admin = require("firebase-admin");

var serviceAccount = require("./config/firebase_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

const sendNotification = (data) => {
  messaging.send(data).then((result) => {});
};

module.exports = sendNotification;
