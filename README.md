# shopping-cart

# 🛒 Shopping Cart – Full Stack Project

פרויקט Full Stack הכולל:
- **Client** – React + Vite + Redux Toolkit
- **Server 1** – ASP.NET Core (.NET) עם SQL Server
- **Server 2** – Node.js API עם Elasticsearch
- **Elasticsearch** – שמירת הזמנות
- **Kibana** – צפייה וניהול נתונים
- **Docker Compose** – הרצה בפקודה אחת

---

## 🧱 Architecture


---

## 📦 Services & Ports

| Service        | Technology        | Port (Host) | Port (Container) |
|---------------|------------------|-------------|------------------|
| Client        | React + Nginx    | 3000        | 80               |
| Server 1      | ASP.NET Core     | 7078        | 8080             |
| Server 2      | Node.js          | 3001        | 3001             |
| SQL Server    | MSSQL 2022       | 1433        | 1433             |
| Elasticsearch | Elasticsearch 8  | 9200        | 9200             |
| Kibana        | Kibana 8         | 5601        | 5601             |

---

## 🚀 Running the Project (Docker)

### Prerequisites
- Docker Desktop
- Docker Compose
- Git

### Run everything
```bash
docker compose up --build

docker compose up -d --build


🛒 Shopping Cart – Full Stack Dockerized Project

פרויקט Full-Stack המדגים מערכת הזמנות מלאה, כולל Client, שני שרתים, מסד נתונים, Elasticsearch ו־Kibana — הכול רץ באמצעות Docker Compose בפקודה אחת.

🧱 Architecture Overview

Client (React + Vite + Redux)
↓
Server 1 – .NET API (Categories & Products)
↓
SQL Server (Docker)

Client
↓
Server 2 – Node.js API (Orders)
↓
Elasticsearch
↓
Kibana (UI לניהול ו־צפייה בנתונים)

📦 Tech Stack

Frontend

React

Vite

Redux Toolkit

Backend

ASP.NET Core (.NET) – מסך ראשון

Node.js (Express / Nest) – מסך שני

Databases

SQL Server 2022 (Docker)

Elasticsearch 8.x

Infrastructure

Docker

Docker Compose

🚀 How to Run the Project
Prerequisites

Docker Desktop

Docker Compose

Git

Run everything

docker compose up --build

Run in background

docker compose up -d --build

Stop everything

docker compose down

🔗 Important API Endpoints
Server 1 (.NET – Categories & Products)

GET http://localhost:7078/api/categories

Server 2 (Node – Orders)

POST http://localhost:3001/api/orders

GET http://localhost:3001/api/orders

🔍 Verify Elasticsearch Data

List indices
GET http://localhost:9200/_cat/indices?v

Count documents
GET http://localhost:9200/orders/_count

View documents
GET http://localhost:9200/orders/_search

🧠 View Data in Kibana

Open Kibana
http://localhost:5601

Go to
Stack Management → Data Views

Create a new Data View

Name: orders

Index pattern: orders*

Timestamp field: createdAt

Go to
Discover

Set time range to
Last 7 days

You should now see the saved orders documents.

⚠️ Notes & Common Pitfalls

If Kibana shows no data

Ensure Data View exists

Increase time range (not “Last 15 minutes”)

📁 Project Structure

shopping-cart
│
├── client/ React + Vite app
├── server/ ASP.NET Core API
├── server_screen_2/ Node.js Orders API
├── elasticsearch/
│ └── index-mapping.json
├── docker-compose.yml
└── README.md

👩‍💻 Author

Lea Fishman

📄 License

Personal / Educational use only.



