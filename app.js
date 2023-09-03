const express = require("express");

const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/db");

const taskRoutes = require("./Routes/todo");

app.use("/api/tasks", taskRoutes);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "todo.html"));
});

const port = process.env.PORT || 3000;
db.authenticate()
  .then(() => {
    console.log("connected to DAtabase Successfully");

    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => console.log("failed to cnnect to Db", err));
