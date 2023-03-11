const server = require("./sockets");

require("./Database");

server.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
