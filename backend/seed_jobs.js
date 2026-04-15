import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const dummyJobs = [
  {
    title: "Frontend Developer",
    description: "Build completely aesthetic web portals with modern web technologies.",
    requirements: ["React", "Tailwind CSS", "JavaScript"],
    salary: 1200000,
    experienceLevel: 2,
    location: "Bangalore",
    jobType: "Full Time",
    position: 4,
  },
  {
    title: "Backend Engineer",
    description: "Develop robust and scalable RESTful APIs.",
    requirements: ["Node.js", "Express", "MongoDB"],
    salary: 1500000,
    experienceLevel: 3,
    location: "Pune",
    jobType: "Full Time",
    position: 2,
  },
  {
    title: "Data Analyst",
    description: "Interpret complex data sets and inform business choices.",
    requirements: ["Python", "SQL", "Tableau"],
    salary: 800000,
    experienceLevel: 1,
    location: "Mumbai",
    jobType: "Contract",
    position: 5,
  },
  {
    title: "UI/UX Designer",
    description: "Create pixel-perfect user experiences for our leading products.",
    requirements: ["Figma", "Adobe XD", "Prototyping"],
    salary: 900000,
    experienceLevel: 2,
    location: "Remote",
    jobType: "Full Time",
    position: 1,
  },
  {
    title: "Full Stack Web Developer",
    description: "End to end implementation of MERN stack applications.",
    requirements: ["React.js", "Node.js", "MongoDB", "Express.js"],
    salary: 1800000,
    experienceLevel: 4,
    location: "Gurgaon",
    jobType: "Full Time",
    position: 3,
  },
  {
    title: "DevOps Engineer",
    description: "Manage pipelines, infrastructure and deployments securely.",
    requirements: ["AWS", "Docker", "Kubernetes"],
    salary: 2200000,
    experienceLevel: 5,
    location: "Hyderabad",
    jobType: "Full Time",
    position: 2,
  },
  {
    title: "Marketing Manager",
    description: "Drive digital marketing campaigns and SEO efforts.",
    requirements: ["SEO", "Google Analytics", "Content Writing"],
    salary: 700000,
    experienceLevel: 2,
    location: "Delhi",
    jobType: "Full Time",
    position: 1,
  },
  {
    title: "Product Manager",
    description: "Lead agile squads to deliver critical product milestones.",
    requirements: ["Agile", "Jira", "Leadership"],
    salary: 2500000,
    experienceLevel: 6,
    location: "Bangalore",
    jobType: "Full Time",
    position: 1,
  },
  {
    title: "Software Tester (QA)",
    description: "Ensure top quality releases using automation frameworks.",
    requirements: ["Selenium", "Jest", "Manual Testing"],
    salary: 600000,
    experienceLevel: 1,
    location: "Chennai",
    jobType: "Full Time",
    position: 4,
  },
  {
    title: "React Native Developer",
    description: "Build cross platform mobile apps that scale.",
    requirements: ["React Native", "Redux", "TypeScript"],
    salary: 1400000,
    experienceLevel: 3,
    location: "Remote",
    jobType: "Full Time",
    position: 2,
  },
  {
    title: "Machine Learning Engineer",
    description: "Develop ML models to enhance user recommendations.",
    requirements: ["Python", "TensorFlow", "Scikit Learn"],
    salary: 2000000,
    experienceLevel: 3,
    location: "Bangalore",
    jobType: "Full Time",
    position: 2,
  },
  {
    title: "Customer Success Executive",
    description: "Help customers onboard and get the most out of our app.",
    requirements: ["Communication", "Troubleshooting"],
    salary: 400000,
    experienceLevel: 0,
    location: "Noida",
    jobType: "Part Time",
    position: 10,
  }
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    let recruiterUser = await User.findOne({ role: "recruiter" });
    if (!recruiterUser) {
        console.log("No recruiter user found, creating a default one...");
        const pwd = await bcrypt.hash("Password123", 10);
        recruiterUser = await User.create({
            fullName: "Default Recruiter",
            email: "recruiter@example.com",
            phoneNumber: 9876543210,
            password: pwd,
            role: "recruiter"
        });
    }

    let company = await Company.findOne({});
    if (!company) {
        console.log("No company found, creating a default company...");
        company = await Company.create({
            name: "Tech Solutions Inc",
            description: "A leading modern tech company",
            website: "https://techsolutions.com",
            location: "Bangalore",
            userId: recruiterUser._id
        });
    }

    console.log("Seeding jobs into DB...");
    const jobsWithRefs = dummyJobs.map(job => ({
        ...job,
        company: company._id,
        created_by: recruiterUser._id
    }));

    await Job.insertMany(jobsWithRefs);
    console.log("✅ Successfully seeded 12 jobs!");

    process.exit(0);
  } catch (error) {
    console.log("Error seeding database:", error);
    process.exit(1);
  }
}

seedJobs();
