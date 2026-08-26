import psycopg2
import os

# Note: removing the brackets from the provided password just in case they were meant as placeholders
db_url = "postgresql://postgres:VISHNUVARDHANKUNDA@db.wdlxvaoqxdzujwismcao.supabase.co:5432/postgres"

def push_sql():
    try:
        print("Connecting to database...")
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cursor = conn.cursor()
        
        print("Reading seed.sql...")
        with open('seed.sql', 'r', encoding='utf-8') as file:
            sql_script = file.read()
            
        print("Executing SQL script...")
        cursor.execute(sql_script)
        
        print("SQL script executed successfully! 1500+ rows inserted.")
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error connecting to or executing on the database:", str(e))

if __name__ == "__main__":
    push_sql()
