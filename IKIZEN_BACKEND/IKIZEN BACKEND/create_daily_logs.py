import psycopg2

db_url = "postgresql://postgres:VISHNUVARDHANKUNDA@db.wdlxvaoqxdzujwismcao.supabase.co:5432/postgres"

def push_sql():
    try:
        print("Connecting to database...")
        conn = psycopg2.connect(db_url)
        conn.autocommit = True
        cursor = conn.cursor()
        
        sql_script = """
        CREATE TABLE IF NOT EXISTS daily_logs (
            id UUID PRIMARY KEY,
            user_id UUID NOT NULL,
            log_date VARCHAR(20) NOT NULL,
            calories_consumed INTEGER DEFAULT 0,
            protein_consumed INTEGER DEFAULT 0,
            carbs_consumed INTEGER DEFAULT 0,
            fat_consumed INTEGER DEFAULT 0,
            foods JSONB,
            exercises JSONB,
            mood VARCHAR(50),
            UNIQUE(user_id, log_date)
        );
        """
        
        print("Executing SQL script to create daily_logs table...")
        cursor.execute(sql_script)
        
        print("daily_logs table created successfully!")
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error connecting to or executing on the database:", str(e))

if __name__ == "__main__":
    push_sql()
