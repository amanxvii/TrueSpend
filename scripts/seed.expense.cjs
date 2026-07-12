const {neon} = require("@neondatabase/serverless");
const crypto = require ("node:crypto");

const databaseUrl =
"postgresql://neondb_owner:npg_uotUaOgnQw35@ep-super-wave-atxwtt86-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

if (!databaseUrl) {
    throw new Error("DATABASE_URL is required")
}

const sql = neon(databaseUrl);

const expenseItems = [
    {
        title: "Lunch at Cafe",
        category: "Food",
        amount: 250,
        expense_date: "04-13-2026" ,
    },
    {
        title: "Uber Ride",
        category: "Transport",
        amount:180,
        expense_date: "04-12-2026"
    },
    {
        title:"Grocery Shopping",
        category:"Grocery",
        amount:1200,
        expense_date: "04-10-2026"
    },
    {
        title:"Netflix Subscription",
        category:"Entertainment",
        amount:499,
        expense_date:"04-08-2026"
    },
    {
        title:"Electricity Bill",
        category:"Bills",
        amount:2200,
        expense_date:"04-06-2026"
    },
    {
        title:"Coffee",
        category:"Food",
        amount:120,
        expense_date:"04-02-2026"
    },
    {
        title:"Mobile Recharge",
        category:"Bills",
        amount:299,
        expense_date:"04-15-2026"
    },
    {
        title:"Snacks",
        category:"Food",
        amount:80,
        expense_date:"04-15-2026"
    },
];

async function seed () {
    await sql`
    CREATE TABLE IF NOT EXISTS expense_transaction (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    amount INTEGER NOT NULL,
    expense_date TEXT NOT NULL,
    created_at BIGINT NOT NULL
    )
    `;

    for(const item of expenseItems) {
        await sql`
        INSERT INTO expense_transaction (id, title, category, amount, expense_date, created_at)
        VALUES (
        ${crypto.randomUUID()},
        ${item.title},
        ${item.category},
        ${item.amount},
        ${item.expense_date},
        ${Date.now()}
        )
        `; 
    }
    console.log(` Seed complete inserted ${expenseItems.length}`)
}

seed().catch((error) => {
    console.log("Seed Failed", error);
    process.exit(1);
});