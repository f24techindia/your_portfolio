import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PersonalInfo {
  id?: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profile_image: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  website_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  category: 'web' | 'mobile' | 'design' | 'other';
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id?: number;
  skill_name: string;
  created_at?: string;
}

export interface Resume {
  id?: number;
  file_name: string;
  file_url: string;
  upload_date?: string;
}