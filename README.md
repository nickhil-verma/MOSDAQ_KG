 
# 🛰️ MOSDAQ_KG – RAG-based AI Chatbot for Space Data

MOSDAQ_KG is a Retrieval-Augmented Generation (RAG) chatbot built to provide intelligent, context-aware answers based on space and atmospheric science data from [https://www.mosdac.gov.in](https://www.mosdac.gov.in). The system scrapes, processes, and embeds structured knowledge from over 350+ HTML pages to support advanced question-answering using LLMs.

---
## NOTE:-This is a nodeJS backend API of Vector data embeddings 

## 🚀 Features

- 🔍 **350+ Pages Crawled**: BFS-based scraping of the entire MOSDAC portal using Playwright and NLTK.
- 🧠 **16K+ Knowledge Graph Keywords** extracted and embedded into a vector database.
- 🤖 **RAG Pipeline** integrated with **LLAMA Gemma 3**, locally hosted for private, high-performance inference.
- 💬 **Chat Interface** built using React + Shadcn UI for seamless user interaction.
- 🔗 **Semantic Search**: Retrieves relevant chunks from vector DB using embeddings before injecting them into the LLM.
- 🛢️ **MongoDB Vector Storage** with metadata and source tracking for explainability.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Shadcn UI
- Tailwind CSS

### Backend
- Python
- Node.js
- LLAMA Gemma 3 (Local)
- MongoDB
- JWT Auth (if applicable)

### NLP & Scraping
- Playwright (headless browser automation)
- NLTK (for text cleaning)
- BFS algorithm (for deep traversal)
- Pydantic (data validation)
- HuggingFace Transformers (optional for embedding)
  
---

## 📁 Directory Structure

```

MOSDAQ\_KG/
├── backend/
│   ├── scraper/
│   ├── embedding/
│   ├── api/
│   └── llama\_integration/
├── frontend/
│   └── chatbot-ui/
├── mongodb/
│   └── vector-schema/
└── README.md

````

---

## 🧠 How It Works

1. **Scraping**: A Playwright + BFS-powered crawler visits every relevant page on `mosdac.gov.in`.
2. **Text Extraction**: NLTK and custom filters clean raw HTML content.
3. **Keyword Mapping**: Extracted content is parsed into chunks and vectorized using sentence embeddings.
4. **Storage**: The embeddings and metadata are stored in MongoDB.
5. **Retrieval**: On user query, relevant embeddings are fetched via semantic similarity.
6. **LLM Injection**: Retrieved context is injected into LLAMA Gemma 3 (running locally).
7. **Response**: LLM generates a grounded, contextually relevant response shown in the UI.

---

## 📦 Installation & Setup

> Make sure Python 3.10+, Node.js, and MongoDB are installed.

### Backend
```bash
cd backend
pip install -r requirements.txt
python scrape_and_embed.py  # Optional: first-time setup
python run_llama_api.py     # Starts the local LLM API
````

### Frontend

```bash
cd frontend/chatbot-ui
npm install
npm run dev
```

---

## 🌐 Demo

Coming soon – hosted on localhost / private LLM environment.

---

## 📌 Use Cases

* Educational tool for researchers and students in atmospheric & satellite science.
* Grounded Q\&A assistant for domain-specific government portals.
* Prototype for building RAG-based systems using public datasets.

---

## 🤝 Contributing

Feel free to fork the repo, open issues, or submit PRs. Contributions are welcome!

---

## 📄 License

This project is licensed under MIT License.

---

## 👨‍💻 Author

**Nikhil Verma** – [LinkedIn](https://linkedin.com/in/nikhil-verma-banglore)
 
