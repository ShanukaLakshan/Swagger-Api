const express = require("express");
const swagerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const fileUpload = require("express-fileupload");
const app = express();
const PORT = 2000;

let users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Mark David" },
  { id: 3, name: "Sammy Origin" },
];

app.use(express.json());
app.use(fileUpload());
app.use("/api-docs", swagerUI.serve, swagerUI.setup(swaggerJsDocs));

app.get("/string", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/user", (req, res) => {
  const user = { id: 1, name: "John Doe" };
  res.status(200).send(user);
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const obj = users.find((user) => user.id === parseInt(req.params.id));
  if (!obj) {
    res.status(404).send("User not found");
  }
  res.status(200).send(obj);
});

app.post("/create", (req, res) => {
  users = [req.body, ...users];
  res.send(users);
});

app.get("/usersQuery", (req, res) => {
  const obj = users.find((user) => user.id === parseInt(req.query.id));
  if (!obj) {
    res.status(404).send("User not found");
  }
  res.status(200).send(obj);
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  console.log(req.headers);
  let path = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send("OK");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
