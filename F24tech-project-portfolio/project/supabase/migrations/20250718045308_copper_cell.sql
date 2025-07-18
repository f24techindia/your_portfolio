/*
  # Portfolio Database Schema

  1. New Tables
    - `personal_info` - Personal information and contact details
    - `projects` - Portfolio projects with technologies and links
    - `experience` - Work experience entries
    - `education` - Educational background
    - `skills` - Technical skills list
    - `resume` - Resume file management

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Personal Info Table
CREATE TABLE IF NOT EXISTS personal_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  profile_image TEXT,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  website_url VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  category VARCHAR(50) DEFAULT 'web',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id VARCHAR(255) PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  description TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
  id VARCHAR(255) PRIMARY KEY,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  duration VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  skill_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume Table
CREATE TABLE IF NOT EXISTS resume (
  id SERIAL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on personal_info"
  ON personal_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on experience"
  ON experience FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on education"
  ON education FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on skills"
  ON skills FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on resume"
  ON resume FOR SELECT
  TO public
  USING (true);

-- Create policies for admin write access (using service role)
CREATE POLICY "Allow admin write access on personal_info"
  ON personal_info FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow admin write access on projects"
  ON projects FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow admin write access on experience"
  ON experience FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow admin write access on education"
  ON education FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow admin write access on skills"
  ON skills FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Allow admin write access on resume"
  ON resume FOR ALL
  TO service_role
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_experience_created_at ON experience(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_education_created_at ON education(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(skill_name);