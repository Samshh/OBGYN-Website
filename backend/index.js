const express = require("express");
const AppDataSource = require("./data-source");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Routes
    app.get("/fetch-admin", async (req, res) => {
      try {
        const adminRepository = AppDataSource.getRepository("Admin");
        const admins = await adminRepository.find();
        res.json(admins);
      } catch (error) {
        res.status(500).json({ error: "Database query failed" });
      }
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));