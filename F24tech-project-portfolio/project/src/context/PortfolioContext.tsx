import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, PersonalInfo, Project, Experience, Education, Resume } from '../types';
import { supabase } from '../lib/supabase';
import { initializeDefaultData } from '../lib/database-setup';
import { useAuth } from './AuthContext';

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addExperience: (experience: Experience) => Promise<void>;
  updateExperience: (id: string, experience: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (education: Education) => Promise<void>;
  updateEducation: (id: string, education: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  updateSkills: (skills: string[]) => Promise<void>;
  updateResume: (resume: Resume | null) => Promise<void>;
  fetchGitHubProjects: () => Promise<void>;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

const initialData: PortfolioData = {
  personalInfo: {
    name: "Palak Diwakar",
    title: "Graphic Designer & B.Tech Graduate",
    email: "palak.diwakar@email.com",
    phone: "+91 9876543210",
    location: "Bareilly, India",
    bio: "Creative graphic designer with a strong technical background. B.Tech graduate from Future Institute of Engineering and Technology, Bareilly. Passionate about creating visually stunning designs that solve real-world problems.",
    profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    githubUrl: "https://github.com/palakdiwakar",
    linkedinUrl: "https://linkedin.com/in/palakdiwakar",
    twitterUrl: "https://twitter.com/palakdiwakar",
    websiteUrl: "https://palakdiwakar.com"
  },
  projects: [
    {
      id: "1",
      title: "Brand Identity Design",
      description: "Complete brand identity design for a tech startup including logo, color palette, and brand guidelines.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      githubUrl: "https://github.com/palakdiwakar/brand-identity",
      category: "design"
    },
    {
      id: "2",
      title: "E-commerce Website Design",
      description: "Modern e-commerce website design with focus on user experience and conversion optimization.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Figma", "Adobe XD", "Sketch"],
      githubUrl: "https://github.com/palakdiwakar/ecommerce-design",
      liveUrl: "https://ecommerce-demo.vercel.app",
      category: "web"
    },
    {
      id: "3",
      title: "Mobile App UI Design",
      description: "Clean and intuitive mobile app interface design for a fitness tracking application.",
      image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Figma", "Adobe XD", "Principle"],
      githubUrl: "https://github.com/palakdiwakar/fitness-app-ui",
      category: "mobile"
    }
  ],
  experience: [
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
  ],
  education: [
    {
      id: "1",
      institution: "Future Institute of Engineering and Technology",
      degree: "Bachelor of Technology (B.Tech)",
      duration: "2019 - 2023",
      location: "Bareilly, India"
    }
  ],
  skills: [
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
  ],
  resume: null
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<PortfolioData>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      // Initialize default data if tables are empty
      await initializeDefaultData();
      // Then fetch the data
      await fetchPortfolioData();
    } catch (error) {
      console.error('Database initialization error:', error);
      // Fallback to initial data if database fails
      setData(initialData);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Fetch personal info
      const { data: personalInfo, error: personalInfoError } = await supabase
        .from('personal_info')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (personalInfoError && personalInfoError.code !== 'PGRST116') {
        console.warn('Error fetching personal info:', personalInfoError);
      }
      // Fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (projectsError) {
        console.warn('Error fetching projects:', projectsError);
      }
      // Fetch experience
      const { data: experience, error: experienceError } = await supabase
        .from('experience')
        .select('*')
        .order('created_at', { ascending: false });

      if (experienceError) {
        console.warn('Error fetching experience:', experienceError);
      }
      // Fetch education
      const { data: education, error: educationError } = await supabase
        .from('education')
        .select('*')
        .order('created_at', { ascending: false });

      if (educationError) {
        console.warn('Error fetching education:', educationError);
      }
      // Fetch skills
      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('skill_name')
        .order('skill_name');

      if (skillsError) {
        console.warn('Error fetching skills:', skillsError);
      }
      // Fetch resume
      const { data: resume } = await supabase
        .from('resume')
        .select('*')
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle();

      setData({
        personalInfo: personalInfo ? {
          name: personalInfo.name,
          title: personalInfo.title,
          email: personalInfo.email,
          phone: personalInfo.phone,
          location: personalInfo.location,
          bio: personalInfo.bio,
          profileImage: personalInfo.profile_image,
          githubUrl: personalInfo.github_url,
          linkedinUrl: personalInfo.linkedin_url,
          twitterUrl: personalInfo.twitter_url,
          websiteUrl: personalInfo.website_url
        } : initialData.personalInfo,
        projects: projects?.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image,
          technologies: p.technologies || [],
          githubUrl: p.github_url,
          liveUrl: p.live_url,
          category: p.category
        })) || initialData.projects,
        experience: experience?.map(e => ({
          id: e.id,
          company: e.company,
          position: e.position,
          duration: e.duration,
          description: e.description,
          skills: e.skills || []
        })) || initialData.experience,
        education: education?.map(e => ({
          id: e.id,
          institution: e.institution,
          degree: e.degree,
          duration: e.duration,
          location: e.location
        })) || initialData.education,
        skills: skills?.map(s => s.skill_name) || initialData.skills,
        resume: resume ? {
          fileName: resume.file_name,
          fileUrl: resume.file_url,
          uploadDate: resume.upload_date
        } : null
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      // Use initial data if database fetch fails
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (info: PersonalInfo) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('personal_info')
        .upsert({
          name: info.name,
          title: info.title,
          email: info.email,
          phone: info.phone,
          location: info.location,
          bio: info.bio,
          profile_image: info.profileImage,
          github_url: info.githubUrl,
          linkedin_url: info.linkedinUrl,
          twitter_url: info.twitterUrl,
          website_url: info.websiteUrl
        });

      if (error) throw error;
      setData(prev => ({ ...prev, personalInfo: info }));
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  };

  const addProject = async (project: Project) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .insert({
          id: project.id,
          title: project.title,
          description: project.description,
          image: project.image,
          technologies: project.technologies,
          github_url: project.githubUrl,
          live_url: project.liveUrl,
          category: project.category
        });

      if (error) throw error;
      setData(prev => ({ ...prev, projects: [...prev.projects, project] }));
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  };

  const updateProject = async (id: string, project: Project) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          description: project.description,
          image: project.image,
          technologies: project.technologies,
          github_url: project.githubUrl,
          live_url: project.liveUrl,
          category: project.category
        })
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === id ? project : p)
      }));
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  const addExperience = async (experience: Experience) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('experience')
        .insert({
          id: experience.id,
          company: experience.company,
          position: experience.position,
          duration: experience.duration,
          description: experience.description,
          skills: experience.skills
        });

      if (error) throw error;
      setData(prev => ({ ...prev, experience: [...prev.experience, experience] }));
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  };

  const updateExperience = async (id: string, experience: Experience) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('experience')
        .update({
          company: experience.company,
          position: experience.position,
          duration: experience.duration,
          description: experience.description,
          skills: experience.skills
        })
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === id ? experience : e)
      }));
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  };

  const deleteExperience = async (id: string) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        experience: prev.experience.filter(e => e.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  };

  const addEducation = async (education: Education) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('education')
        .insert({
          id: education.id,
          institution: education.institution,
          degree: education.degree,
          duration: education.duration,
          location: education.location
        });

      if (error) throw error;
      setData(prev => ({ ...prev, education: [...prev.education, education] }));
    } catch (error) {
      console.error('Error adding education:', error);
      throw error;
    }
  };

  const updateEducation = async (id: string, education: Education) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('education')
        .update({
          institution: education.institution,
          degree: education.degree,
          duration: education.duration,
          location: education.location
        })
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === id ? education : e)
      }));
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  };

  const deleteEducation = async (id: string) => {
    if (!isAuthenticated) return;
    
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setData(prev => ({
        ...prev,
        education: prev.education.filter(e => e.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting education:', error);
      throw error;
    }
  };

  const updateSkills = async (skills: string[]) => {
    if (!isAuthenticated) return;
    
    try {
      // Clear existing skills
      await supabase.from('skills').delete().neq('id', 0);
      
      // Insert new skills
      const skillsData = skills.map(skill => ({ skill_name: skill }));
      const { error } = await supabase
        .from('skills')
        .insert(skillsData);

      if (error) throw error;
      setData(prev => ({ ...prev, skills }));
    } catch (error) {
      console.error('Error updating skills:', error);
      throw error;
    }
  };

  const updateResume = async (resume: Resume | null) => {
    if (!isAuthenticated) return;
    
    try {
      if (resume) {
        // Clear existing resume
        await supabase.from('resume').delete().neq('id', 0);
        
        // Insert new resume
        const { error } = await supabase
          .from('resume')
          .insert({
            file_name: resume.fileName,
            file_url: resume.fileUrl
          });

        if (error) throw error;
      } else {
        // Clear resume
        await supabase.from('resume').delete().neq('id', 0);
      }
      
      setData(prev => ({ ...prev, resume }));
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  };

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/palakdiwakar/repos');
      const repos = await response.json();
      
      const githubProjects: Project[] = repos.slice(0, 6).map((repo: any) => ({
        id: `github-${repo.id}`,
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: repo.description || 'No description available',
        image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: repo.language ? [repo.language] : ['JavaScript'],
        githubUrl: repo.html_url,
        liveUrl: repo.homepage,
        category: 'web' as const
      }));

      setData(prev => ({
        ...prev,
        projects: [
          ...prev.projects.filter(p => !p.id.startsWith('github-')),
          ...githubProjects
        ]
      }));
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      updatePersonalInfo,
      addProject,
      updateProject,
      deleteProject,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      updateSkills,
      updateResume,
      fetchGitHubProjects,
      loading
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};