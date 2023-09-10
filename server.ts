const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());

const port = process.env.PORT as string;

// add routes here
app.use("/prisma", routes);
app.listen(port, () => console.log(`Server running on port ${port}`));
