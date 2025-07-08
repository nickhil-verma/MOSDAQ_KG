const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "knowledge_graph";
const COLLECTION_NAME = "mosdac_nodes";

let db, collection;

// Connect to MongoDB
async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  collection = db.collection(COLLECTION_NAME);
  console.log("✅ Connected to MongoDB Atlas");
}
connectDB();


// 🔹 Route 1: Raw JSON documents
app.get("/api/json", async (req, res) => {
  try {
    const docs = await collection.find({}).toArray();
    res.json(docs);
  } catch (err) {
    console.error("❌ Error fetching JSON:", err);
    res.status(500).json({ error: "Failed to fetch documents." });
  }
});

// 🔹 Route 2: Vector-formatted output
app.get("/api/vectors", async (req, res) => {
  try {
    const docs = await collection.find({}).toArray();

    const vectorData = docs.map(doc => {
      // Try to extract embedding
      const embedding =
        Array.isArray(doc.embedding?.values)
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

app.get("/api/debug", async (req, res) => {
  const doc = await collection.findOne({});
  res.json(doc);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
