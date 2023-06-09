const express = require("express");
const swagerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const app = express();
const PORT = 2000;

app.use("/api-docs", swagerUI.serve, swagerUI.setup(swaggerJsDocs));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
