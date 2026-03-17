// Script to create posts table in Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createPostsTable() {
  // Create the posts table using SQL
  const { data, error } = await supabase.rpc('create_posts_table', {
    sql_query: `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        category TEXT,
        date TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
  });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Table created or already exists');
  }
}

createPostsTable();
