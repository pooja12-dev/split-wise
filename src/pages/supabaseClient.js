import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kktbvzvdasmewiynwmiz.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdGJ2enZkYXNtZXdpeW53bWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNTg5NDcsImV4cCI6MjA2MTczNDk0N30.TGBJG9_alxKd0jtbyX5kB7nudCdViXlo2ZoYb6S9rks';    // Replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey, {
    persistSession: true,
    autoRefreshToken: true,
  });
  
