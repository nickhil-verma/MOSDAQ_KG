const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "knowledge_graph";
const COLLECTION_NAME = "mosdac_nodes";

let collection;

// Connect to MongoDB
async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  collection = db.collection(COLLECTION_NAME);
  console.log("✅ Connected to MongoDB Atlas");
}

// Define API routes
const apiRoutes = express.Router();

// 🔹 Route 1: Raw JSON documents
apiRoutes.get("/json", async (req, res) => {
  try {
    const docs = await collection.find({}).toArray();
    res.json(docs);
  } catch (err) {
    console.error("❌ Error fetching JSON:", err);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
});

 
apiRoutes.get("/vectors", async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db("isro_Hackathon");
    const vectorsCollection = db.collection("vectors");

    const docs = await vectorsCollection.find({}).toArray();

    const vectorData = docs.map(doc => {
      const embedding = Array.isArray(doc.embedding?.values)
        ? doc.embedding.values
        : Array.isArray(doc.embedding)
        ? doc.embedding
        : [];

      return {
        id: doc._id.toString(),
        embedding,
        metadata: {
          ...(doc.metadata || {}),
          source: doc.url || doc.metadata?.url || "",
          title: doc.title || doc.metadata?.title || ""
        }
      };
    });

    res.json(vectorData);
  } catch (err) {
    console.error("❌ Error transforming vector data:", err);
    res.status(500).json({ error: "Failed to format vector data." });
  }
});


// 🔹 Route 3: Debug - returns a single document
apiRoutes.get("/debug", async (req, res) => {
  try {
    const doc = await collection.findOne({});
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Debug fetch failed" });
  }
});

// Mount routes
app.use("/api", apiRoutes);

// Start server only after DB connects
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
