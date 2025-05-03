// Creates the supabase api client

// import {createClient} from '@supabase/supabase-js'

// const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeXhmd2NkZGlncXV6ZGNkdWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc3MTc1NTAsImV4cCI6MTk3MzI5MzU1MH0.gQCSvtkF6PYgpDiepWPTqQkLjoAO-miKX4egXOkQiVU'

// const SUPABASE_URL = "https://kfyxfwcddigquzdcduix.supabase.co"

// export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kktbvzvdasmewiynwmiz.supabase.co'; // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdGJ2enZkYXNtZXdpeW53bWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNTg5NDcsImV4cCI6MjA2MTczNDk0N30.TGBJG9_alxKd0jtbyX5kB7nudCdViXlo2ZoYb6S9rks';    // Replace with your anon key
// export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

