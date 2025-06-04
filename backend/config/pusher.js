// config/pusher.js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1994338",
  key: "a0d012255f87110c4d74",
  secret: "04e613ef2e69f08ced1b",
  cluster: "ap1",
  useTLS: true
});

module.exports = pusher;
