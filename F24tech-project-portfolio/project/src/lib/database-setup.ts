import { supabase } from './supabase';

export const setupDatabase = async () => {
  try {
    console.log('Setting up database tables...');

    // Create personal_info table
    const { error: personalInfoError } = await supabase.rpc('create_personal_info_table');
    if (personalInfoError && !personalInfoError.message.includes('already exists')) {
      console.error('Error creating personal_info table:', personalInfoError);
    }

    // Create projects table
    const { error: projectsError } = await supabase.rpc('create_projects_table');
    if (projectsError && !projectsError.message.includes('already exists')) {
      console.error('Error creating projects table:', projectsError);
    }

    // Create experience table
    const { error: experienceError } = await supabase.rpc('create_experience_table');
    if (experienceError && !experienceError.message.includes('already exists')) {
      console.error('Error creating experience table:', experienceError);
    }

    // Create education table
    const { error: educationError } = await supabase.rpc('create_education_table');
    if (educationError && !educationError.message.includes('already exists')) {
      console.error('Error creating education table:', educationError);
    }

    // Create skills table
    const { error: skillsError } = await supabase.rpc('create_skills_table');
    if (skillsError && !skillsError.message.includes('already exists')) {
      console.error('Error creating skills table:', skillsError);
    }

    // Create resume table
    const { error: resumeError } = await supabase.rpc('create_resume_table');
    if (resumeError && !resumeError.message.includes('already exists')) {
      console.error('Error creating resume table:', resumeError);
    }

    console.log('Database setup completed!');
    return true;
  } catch (error) {
    console.error('Database setup failed:', error);
    return false;
  }
};

export const initializeDefaultData = async () => {
  try {
    console.log('Initializing default data...');

    // Use service role key for initial data setup to bypass RLS
    const { createClient } = await import('@supabase/supabase-js');
    const adminSupabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY // We'll use anon key but handle RLS gracefully
    );

    // Check if personal info exists
    const { data: existingPersonalInfo } = await adminSupabase
      .from('personal_info')
      .select('id')
      .limit(1);

    if (!existingPersonalInfo || existingPersonalInfo.length === 0) {
      // Insert default personal info
      const { error: personalInfoError } = await adminSupabase
        .from('personal_info')
        .insert({
          name: "Palak Diwakar",
          title: "Graphic Designer & B.Tech Graduate",
          email: "palak.diwakar@email.com",
          phone: "+91 9876543210",
          location: "Bareilly, India",
          bio: "Creative graphic designer with a strong technical background. B.Tech graduate from Future Institute of Engineering and Technology, Bareilly. Passionate about creating visually stunning designs that solve real-world problems.",
          profile_image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
          github_url: "https://github.com/palakdiwakar",
          linkedin_url: "https://linkedin.com/in/palakdiwakar",
          twitter_url: "https://twitter.com/palakdiwakar",
          website_url: "https://palakdiwakar.com"
        });

      if (personalInfoError) {
        console.warn('Could not insert personal info (RLS policy):', personalInfoError.message);
      }
    }

    // Check if projects exist
    const { data: existingProjects } = await adminSupabase
      .from('projects')
      .select('id')
      .limit(1);

    if (!existingProjects || existingProjects.length === 0) {
      // Insert default projects
      const defaultProjects = [
        {
          id: "1",
          title: "Brand Identity Design",
          description: "Complete brand identity design for a tech startup including logo, color palette, and brand guidelines.",
          image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
          technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
          github_url: "https://github.com/palakdiwakar/brand-identity",
          category: "design"
        },
        {
          id: "2",
          title: "E-commerce Website Design",
          description: "Modern e-commerce website design with focus on user experience and conversion optimization.",
          image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
          technologies: ["Figma", "Adobe XD", "Sketch"],
          github_url: "https://github.com/palakdiwakar/ecommerce-design",
          live_url: "https://ecommerce-demo.vercel.app",
          category: "web"
        },
        {
          id: "3",
          title: "Mobile App UI Design",
          description: "Clean and intuitive mobile app interface design for a fitness tracking application.",
          image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
          technologies: ["Figma", "Adobe XD", "Principle"],
          github_url: "https://github.com/palakdiwakar/fitness-app-ui",
          category: "mobile"
        }
      ];

      const { error: projectsError } = await adminSupabase
        .from('projects')
        .insert(defaultProjects);

      if (projectsError) {
        console.warn('Could not insert projects (RLS policy):', projectsError.message);
      }
    }

    // Check if experience exists
    const { data: existingExperience } = await adminSupabase
      .from('experience')
      .select('id')
      .limit(1);

    if (!existingExperience || existingExperience.length === 0) {
      // Insert default experience
      const defaultExperience = [
        {
          id: "1",
          company: "Creative Studio",
          position: "Junior Graphic Designer",
          duration: "2023 - Present",
          description: "Creating visual designs for digital and print media, working with clients to develop brand identities and marketing materials.",
          skills: ["Adobe Creative Suite", "Branding", "Web Design", "Print Design"]
        },
        {
          id: "2",
          company: "Tech Solutions Pvt Ltd",
          position: "Design Intern",
          duration: "2022 - 2023",
          description: "Assisted in creating user interfaces for web applications and mobile apps, learned industry best practices.",
          skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"]
        }
      ];

      const { error: experienceError } = await adminSupabase
        .from('experience')
        .insert(defaultExperience);

      if (experienceError) {
        console.warn('Could not insert experience (RLS policy):', experienceError.message);
      }
    }

    // Check if education exists
    const { data: existingEducation } = await adminSupabase
      .from('education')
      .select('id')
      .limit(1);

    if (!existingEducation || existingEducation.length === 0) {
      // Insert default education
      const { error: educationError } = await adminSupabase
        .from('education')
        .insert({
          id: "1",
          institution: "Future Institute of Engineering and Technology",
          degree: "Bachelor of Technology (B.Tech)",
          duration: "2019 - 2023",
          location: "Bareilly, India"
        });

      if (educationError) {
        console.warn('Could not insert education (RLS policy):', educationError.message);
      }
    }

    // Check if skills exist
    const { data: existingSkills } = await adminSupabase
      .from('skills')
      .select('id')
      .limit(1);

    if (!existingSkills || existingSkills.length === 0) {
      // Insert default skills
      const defaultSkills = [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe InDesign",
        "Figma",
        "Adobe XD",
        "Sketch",
        "Canva",
        "Typography",
        "Brand Identity",
        "Web Design",
        "Mobile UI Design",
        "Print Design",
        "Color Theory",
        "User Experience (UX)",
        "User Interface (UI)",
        "Prototyping"
      ].map(skill => ({ skill_name: skill }));

      const { error: skillsError } = await adminSupabase
        .from('skills')
        .insert(defaultSkills);

      if (skillsError) {
        console.warn('Could not insert skills (RLS policy):', skillsError.message);
      }
    }

    console.log('Default data initialization completed (some operations may have been skipped due to RLS policies)!');
    return true;
  } catch (error) {
    console.warn('Default data initialization had issues:', error);
    return false;
  }
};