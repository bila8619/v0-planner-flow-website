// Dropdown database with 100+ pre-populated options
export const dropdownData = {
  goalCategories: [
    "Career & Professional",
    "Health & Fitness",
    "Financial",
    "Relationships",
    "Personal Development",
    "Education & Learning",
    "Travel & Adventure",
    "Family & Parenting",
    "Spiritual & Mindfulness",
    "Creative & Artistic",
    "Home & Lifestyle",
    "Community & Social",
    "Business & Entrepreneurship",
    "Technology & Skills",
    "Environmental & Sustainability",
  ],

  habitTypes: [
    "Morning Routine",
    "Evening Routine",
    "Exercise",
    "Meditation",
    "Reading",
    "Journaling",
    "Healthy Eating",
    "Water Intake",
    "Sleep Schedule",
    "Learning",
    "Gratitude Practice",
    "Social Connection",
    "Creative Work",
    "Organization",
    "Financial Tracking",
    "Self-Care",
    "Productivity",
    "Communication",
    "Planning",
    "Reflection",
  ],

  priorityLevels: [
    "Low",
    "Medium",
    "High",
    "Urgent",
    "Critical",
    "Nice to Have",
    "Must Have",
    "Important",
    "Someday Maybe",
    "Quick Win",
    "Long Term",
    "Immediate",
  ],

  timeFrames: [
    "Today",
    "This Week",
    "This Month",
    "This Quarter",
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "Next 30 Days",
    "Next 90 Days",
    "6 Months",
    "This Year",
    "Next Year",
    "2-3 Years",
    "5 Years",
    "10 Years",
    "Lifetime",
    "Ongoing",
    "Daily",
    "Weekly",
    "Monthly",
    "Annually",
  ],

  lifeAreas: [
    "Health",
    "Work",
    "Family",
    "Learning",
    "Leisure",
    "Finances",
    "Relationships",
    "Personal Growth",
    "Spirituality",
    "Community",
    "Environment",
    "Creativity",
    "Adventure",
    "Service",
    "Legacy",
    "Fun & Recreation",
    "Home",
    "Travel",
  ],

  demographics: [
    "Student",
    "Parent",
    "Professional",
    "Entrepreneur",
    "Retiree",
    "Freelancer",
    "Manager",
    "Executive",
    "Creative",
    "Teacher",
    "Healthcare Worker",
    "Remote Worker",
    "Small Business Owner",
    "Consultant",
    "Artist",
    "Writer",
    "Developer",
    "Designer",
  ],

  methodologies: [
    "OKR (Objectives & Key Results)",
    "Getting Things Done (GTD)",
    "Pomodoro Technique",
    "Eisenhower Matrix",
    "Kanban",
    "Scrum",
    "Time Blocking",
    "Bullet Journal",
    "SMART Goals",
    "Habit Stacking",
    "The 7 Habits",
    "Deep Work",
    "Atomic Habits",
    "Lean Startup",
    "Design Thinking",
    "Agile",
    "Six Sigma",
    "Kaizen",
  ],

  planningScenarios: [
    "Daily Planning",
    "Weekly Review",
    "Monthly Goals",
    "Quarterly Planning",
    "Annual Review",
    "Project Planning",
    "Event Planning",
    "Travel Planning",
    "Budget Planning",
    "Career Planning",
    "Retirement Planning",
    "Wedding Planning",
    "Moving Planning",
    "Health Planning",
    "Learning Plan",
    "Business Plan",
    "Marketing Plan",
    "Content Plan",
    "Meal Planning",
  ],

  productivityTechniques: [
    "Time Blocking",
    "Batch Processing",
    "The Two-Minute Rule",
    "Eat the Frog",
    "Parkinson's Law",
    "The 80/20 Rule",
    "Deep Work Sessions",
    "Focus Sprints",
    "Energy Management",
    "Context Switching",
    "Single-tasking",
    "Mindful Breaks",
    "Digital Minimalism",
    "Inbox Zero",
    "Weekly Reviews",
    "Daily Standup",
  ],
}

export const templateCategories = {
  demographic: {
    name: "Demographic Templates",
    description: "Tailored for different life stages and roles",
    icon: "users",
    templates: [
      {
        id: "parent-planner",
        name: "Parent Planner",
        emoji: "👨‍👩‍👧‍👦",
        description: "Organize family schedules, activities, and milestones",
        features: ["Family Calendar", "Activity Tracker", "Milestone Tracking", "Budget Planning"],
      },
      {
        id: "wedding-planner",
        name: "Wedding Planner",
        emoji: "💒",
        description: "Plan your perfect wedding day with detailed checklists",
        features: ["Timeline Management", "Vendor Tracking", "Budget Control", "Guest Management"],
      },
      {
        id: "retirement-planning",
        name: "Retirement Planning",
        emoji: "🏖️",
        description: "Prepare for your golden years with comprehensive planning",
        features: ["Financial Goals", "Health Planning", "Activity Planning", "Legacy Planning"],
      },
      {
        id: "student-organizer",
        name: "Student Organizer",
        emoji: "🎓",
        description: "Academic success through organized planning",
        features: ["Course Planning", "Assignment Tracking", "Study Schedule", "Goal Setting"],
      },
      {
        id: "career-transition",
        name: "Career Transition",
        emoji: "🚀",
        description: "Navigate career changes with strategic planning",
        features: ["Skill Assessment", "Network Building", "Job Search", "Interview Prep"],
      },
      {
        id: "entrepreneur-startup",
        name: "Entrepreneur Startup",
        emoji: "💡",
        description: "Launch and grow your business with strategic planning",
        features: ["Business Model", "Market Research", "Financial Projections", "Launch Timeline"],
      },
      {
        id: "freelancer-organizer",
        name: "Freelancer Organizer",
        emoji: "💻",
        description: "Manage clients, projects, and income streams",
        features: ["Client Management", "Project Tracking", "Invoice Planning", "Skill Development"],
      },
      {
        id: "new-manager",
        name: "New Manager",
        emoji: "👔",
        description: "Transition into leadership with confidence",
        features: ["Team Building", "Goal Setting", "Performance Tracking", "Communication Plans"],
      },
      {
        id: "remote-worker",
        name: "Remote Worker",
        emoji: "🏠",
        description: "Optimize productivity while working from home",
        features: ["Home Office Setup", "Schedule Management", "Communication Tools", "Work-Life Balance"],
      },
      {
        id: "creative-professional",
        name: "Creative Professional",
        emoji: "🎨",
        description: "Manage creative projects and artistic goals",
        features: ["Project Portfolio", "Creative Process", "Client Relations", "Inspiration Tracking"],
      },
      {
        id: "healthcare-worker",
        name: "Healthcare Worker",
        emoji: "⚕️",
        description: "Balance demanding schedules with personal wellness",
        features: ["Shift Planning", "Continuing Education", "Self-Care", "Career Development"],
      },
      {
        id: "teacher-educator",
        name: "Teacher Educator",
        emoji: "📚",
        description: "Plan lessons, track student progress, and manage workload",
        features: ["Lesson Planning", "Student Tracking", "Professional Development", "Work-Life Balance"],
      },
      {
        id: "small-business-owner",
        name: "Small Business Owner",
        emoji: "🏪",
        description: "Manage all aspects of your growing business",
        features: ["Operations Planning", "Customer Management", "Financial Tracking", "Growth Strategy"],
      },
      {
        id: "consultant-advisor",
        name: "Consultant Advisor",
        emoji: "🤝",
        description: "Organize client engagements and expertise development",
        features: ["Client Projects", "Knowledge Management", "Network Building", "Service Development"],
      },
      {
        id: "executive-leader",
        name: "Executive Leader",
        emoji: "🎯",
        description: "Strategic planning and leadership development",
        features: ["Strategic Planning", "Team Leadership", "Stakeholder Management", "Vision Setting"],
      },
    ],
  },
  methodology: {
    name: "Methodology Templates",
    description: "Based on proven productivity frameworks",
    icon: "clipboard-check",
    templates: [
      {
        id: "okr-planning",
        name: "OKR Planning",
        emoji: "🎯",
        description: "Set and track Objectives and Key Results",
        features: ["Objective Setting", "Key Result Tracking", "Progress Monitoring", "Quarterly Reviews"],
      },
      {
        id: "getting-things-done",
        name: "Getting Things Done",
        emoji: "✅",
        description: "David Allen's GTD methodology implementation",
        features: ["Inbox Processing", "Next Actions", "Project Lists", "Weekly Reviews"],
      },
      {
        id: "pomodoro-technique",
        name: "Pomodoro Technique",
        emoji: "🍅",
        description: "Time management using focused work intervals",
        features: ["Timer Integration", "Task Breakdown", "Break Scheduling", "Progress Tracking"],
      },
      {
        id: "bullet-journal",
        name: "Bullet Journal",
        emoji: "📝",
        description: "Digital version of the popular planning method",
        features: ["Rapid Logging", "Collections", "Migration", "Monthly/Weekly Spreads"],
      },
      {
        id: "time-blocking",
        name: "Time Blocking",
        emoji: "⏰",
        description: "Schedule your day in focused time blocks",
        features: ["Calendar Integration", "Block Templates", "Energy Mapping", "Review System"],
      },
      {
        id: "eisenhower-matrix",
        name: "Eisenhower Matrix",
        emoji: "📊",
        description: "Prioritize tasks using urgent/important quadrants",
        features: ["Quadrant Classification", "Priority Scoring", "Decision Framework", "Action Planning"],
      },
      {
        id: "kanban-board",
        name: "Kanban Board",
        emoji: "📋",
        description: "Visual workflow management system",
        features: ["Column Customization", "Card Movement", "WIP Limits", "Flow Metrics"],
      },
      {
        id: "scrum-planning",
        name: "Scrum Planning",
        emoji: "🏃‍♂️",
        description: "Agile project management framework",
        features: ["Sprint Planning", "Backlog Management", "Daily Standups", "Retrospectives"],
      },
      {
        id: "smart-goals",
        name: "SMART Goals",
        emoji: "🎯",
        description: "Specific, Measurable, Achievable, Relevant, Time-bound goals",
        features: ["Goal Structuring", "Progress Metrics", "Timeline Tracking", "Achievement Validation"],
      },
      {
        id: "habit-stacking",
        name: "Habit Stacking",
        emoji: "🔗",
        description: "Build new habits by linking them to existing ones",
        features: ["Habit Chains", "Trigger Identification", "Stack Building", "Progress Tracking"],
      },
      {
        id: "deep-work",
        name: "Deep Work",
        emoji: "🧠",
        description: "Cal Newport's focused work methodology",
        features: ["Focus Sessions", "Distraction Blocking", "Depth Metrics", "Skill Development"],
      },
      {
        id: "atomic-habits",
        name: "Atomic Habits",
        emoji: "⚛️",
        description: "James Clear's habit formation system",
        features: ["Habit Loop", "Environment Design", "Identity Building", "Compound Growth"],
      },
      {
        id: "lean-startup",
        name: "Lean Startup",
        emoji: "🚀",
        description: "Build-Measure-Learn methodology for innovation",
        features: ["Hypothesis Testing", "MVP Development", "Pivot Planning", "Learning Metrics"],
      },
      {
        id: "design-thinking",
        name: "Design Thinking",
        emoji: "💭",
        description: "Human-centered problem solving approach",
        features: ["Empathy Mapping", "Problem Definition", "Ideation", "Prototyping"],
      },
      {
        id: "six-sigma",
        name: "Six Sigma",
        emoji: "📈",
        description: "Data-driven process improvement methodology",
        features: ["DMAIC Process", "Statistical Analysis", "Root Cause Analysis", "Control Plans"],
      },
    ],
  },
  premium: {
    name: "Premium Bonus",
    description: "Advanced planning tools for power users",
    icon: "star",
    templates: [
      {
        id: "life-wheel",
        name: "Life Wheel Assessment",
        emoji: "🎡",
        description: "Evaluate and balance all areas of your life",
        features: ["Life Area Scoring", "Balance Visualization", "Goal Alignment", "Action Planning"],
      },
      {
        id: "values-clarification",
        name: "Values Clarification",
        emoji: "💎",
        description: "Discover and align with your core values",
        features: ["Values Assessment", "Priority Ranking", "Decision Framework", "Alignment Check"],
      },
      {
        id: "legacy-planning",
        name: "Legacy Planning",
        emoji: "🏛️",
        description: "Plan the impact you want to leave behind",
        features: ["Vision Creation", "Impact Mapping", "Milestone Planning", "Progress Tracking"],
      },
      {
        id: "vision-board",
        name: "Vision Board",
        emoji: "🖼️",
        description: "Visual representation of your goals and dreams",
        features: ["Image Upload", "Goal Visualization", "Inspiration Quotes", "Progress Photos"],
      },
      {
        id: "quarterly-reviews",
        name: "Quarterly Reviews",
        emoji: "📅",
        description: "Comprehensive quarterly planning and review system",
        features: ["Goal Review", "Achievement Analysis", "Learning Capture", "Next Quarter Planning"],
      },
      {
        id: "energy-management",
        name: "Energy Management",
        emoji: "⚡",
        description: "Optimize your energy levels throughout the day",
        features: ["Energy Tracking", "Peak Performance", "Recovery Planning", "Rhythm Optimization"],
      },
      {
        id: "decision-framework",
        name: "Decision Framework",
        emoji: "🤔",
        description: "Systematic approach to making better decisions",
        features: ["Decision Matrix", "Criteria Weighting", "Option Analysis", "Outcome Tracking"],
      },
      {
        id: "mindfulness-planner",
        name: "Mindfulness Planner",
        emoji: "🧘‍♀️",
        description: "Integrate mindfulness practices into daily life",
        features: ["Meditation Tracking", "Awareness Exercises", "Stress Management", "Present Moment"],
      },
      {
        id: "financial-freedom",
        name: "Financial Freedom",
        emoji: "💰",
        description: "Strategic planning for financial independence",
        features: ["Wealth Building", "Investment Tracking", "Expense Optimization", "Freedom Timeline"],
      },
      {
        id: "relationship-mapping",
        name: "Relationship Mapping",
        emoji: "❤️",
        description: "Nurture and strengthen your personal connections",
        features: ["Network Analysis", "Relationship Goals", "Communication Planning", "Connection Tracking"],
      },
      {
        id: "creativity-catalyst",
        name: "Creativity Catalyst",
        emoji: "✨",
        description: "Unlock and enhance your creative potential",
        features: ["Idea Generation", "Creative Blocks", "Inspiration Sources", "Project Pipeline"],
      },
      {
        id: "leadership-development",
        name: "Leadership Development",
        emoji: "👑",
        description: "Build and refine your leadership capabilities",
        features: ["Leadership Skills", "Team Building", "Influence Strategies", "Growth Tracking"],
      },
      {
        id: "wellness-optimization",
        name: "Wellness Optimization",
        emoji: "🌱",
        description: "Holistic approach to physical and mental health",
        features: ["Health Metrics", "Fitness Planning", "Nutrition Tracking", "Mental Wellness"],
      },
      {
        id: "learning-accelerator",
        name: "Learning Accelerator",
        emoji: "🚀",
        description: "Maximize your learning efficiency and retention",
        features: ["Learning Goals", "Study Techniques", "Knowledge Retention", "Skill Development"],
      },
      {
        id: "impact-amplifier",
        name: "Impact Amplifier",
        emoji: "🌍",
        description: "Maximize your positive impact on the world",
        features: ["Impact Goals", "Community Engagement", "Social Contribution", "Change Tracking"],
      },
    ],
  },
}

export const templateConfigs = {
  "parent-planner": {
    title: "Parent Planner",
    sections: [
      {
        title: "Family Schedule",
        tasks: [
          "Morning routine checklist",
          "School/daycare pickup times",
          "After-school activities",
          "Evening routine",
          "Weekend family time",
        ],
      },
      {
        title: "Child Development",
        tasks: [
          "Milestone tracking",
          "Educational goals",
          "Social development",
          "Health checkups",
          "Special achievements",
        ],
      },
      {
        title: "Family Budget",
        tasks: [
          "Monthly expenses",
          "Childcare costs",
          "Education savings",
          "Family activities budget",
          "Emergency fund",
        ],
      },
    ],
    dropdowns: {
      category: "demographics",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "wedding-planner": {
    title: "Wedding Planner",
    sections: [
      {
        title: "12 Months Before",
        tasks: ["Set wedding date", "Create guest list", "Set budget", "Book venue", "Hire photographer"],
      },
      {
        title: "6 Months Before",
        tasks: ["Send invitations", "Order wedding dress", "Plan menu", "Book entertainment", "Arrange transportation"],
      },
      {
        title: "1 Month Before",
        tasks: [
          "Final headcount",
          "Confirm all vendors",
          "Wedding rehearsal",
          "Prepare ceremony items",
          "Finalize seating chart",
        ],
      },
    ],
    dropdowns: {
      category: "planningScenarios",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "retirement-planning": {
    title: "Retirement Planning",
    sections: [
      {
        title: "Financial Preparation",
        tasks: [
          "Calculate retirement needs",
          "Review investment portfolio",
          "Maximize retirement contributions",
          "Plan healthcare costs",
          "Estate planning review",
        ],
      },
      {
        title: "Lifestyle Planning",
        tasks: [
          "Define retirement goals",
          "Plan living arrangements",
          "Explore hobbies and interests",
          "Consider volunteer opportunities",
          "Plan travel and adventures",
        ],
      },
      {
        title: "Health & Wellness",
        tasks: [
          "Establish healthcare plan",
          "Maintain physical fitness",
          "Mental health support",
          "Nutrition planning",
          "Social connections",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "student-organizer": {
    title: "Student Organizer",
    sections: [
      {
        title: "Academic Planning",
        tasks: ["Course registration", "Assignment calendar", "Study schedule", "Exam preparation", "Grade tracking"],
      },
      {
        title: "Personal Development",
        tasks: [
          "Skill building goals",
          "Extracurricular activities",
          "Networking opportunities",
          "Internship planning",
          "Career exploration",
        ],
      },
      {
        title: "Life Management",
        tasks: ["Budget planning", "Health and wellness", "Social connections", "Time management", "Stress management"],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "career-transition": {
    title: "Career Transition",
    sections: [
      {
        title: "Self Assessment",
        tasks: [
          "Skills inventory",
          "Values clarification",
          "Interest assessment",
          "Strengths analysis",
          "Career goals definition",
        ],
      },
      {
        title: "Job Search Strategy",
        tasks: [
          "Resume optimization",
          "LinkedIn profile update",
          "Network building",
          "Interview preparation",
          "Salary negotiation prep",
        ],
      },
      {
        title: "Transition Planning",
        tasks: [
          "Timeline creation",
          "Financial planning",
          "Skill development",
          "Industry research",
          "Mentor identification",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "entrepreneur-startup": {
    title: "Entrepreneur Startup",
    sections: [
      {
        title: "Business Foundation",
        tasks: [
          "Business idea validation",
          "Market research",
          "Competitive analysis",
          "Business model design",
          "Legal structure setup",
        ],
      },
      {
        title: "Product Development",
        tasks: ["MVP development", "User testing", "Product iteration", "Quality assurance", "Launch preparation"],
      },
      {
        title: "Growth Strategy",
        tasks: ["Marketing plan", "Sales strategy", "Funding strategy", "Team building", "Scaling preparation"],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "freelancer-organizer": {
    title: "Freelancer Organizer",
    sections: [
      {
        title: "Client Management",
        tasks: [
          "Client onboarding process",
          "Project scope definition",
          "Communication schedule",
          "Deliverable tracking",
          "Client feedback collection",
        ],
      },
      {
        title: "Business Operations",
        tasks: ["Invoice management", "Time tracking", "Expense tracking", "Tax preparation", "Contract management"],
      },
      {
        title: "Professional Growth",
        tasks: [
          "Skill development",
          "Portfolio updates",
          "Network expansion",
          "Rate optimization",
          "Service diversification",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "new-manager": {
    title: "New Manager",
    sections: [
      {
        title: "Team Leadership",
        tasks: [
          "Team member one-on-ones",
          "Goal setting with team",
          "Performance feedback",
          "Team building activities",
          "Conflict resolution",
        ],
      },
      {
        title: "Management Skills",
        tasks: [
          "Leadership training",
          "Communication improvement",
          "Decision-making framework",
          "Delegation strategies",
          "Time management",
        ],
      },
      {
        title: "Strategic Planning",
        tasks: [
          "Department goals alignment",
          "Resource planning",
          "Process improvement",
          "Stakeholder management",
          "Performance metrics",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "remote-worker": {
    title: "Remote Worker",
    sections: [
      {
        title: "Workspace Setup",
        tasks: [
          "Home office organization",
          "Technology setup",
          "Ergonomic workspace",
          "Distraction management",
          "Backup systems",
        ],
      },
      {
        title: "Productivity Systems",
        tasks: [
          "Daily routine establishment",
          "Time blocking",
          "Communication protocols",
          "Task prioritization",
          "Progress tracking",
        ],
      },
      {
        title: "Work-Life Balance",
        tasks: [
          "Boundary setting",
          "Break scheduling",
          "Social interaction",
          "Physical activity",
          "Mental health care",
        ],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "creative-professional": {
    title: "Creative Professional",
    sections: [
      {
        title: "Creative Projects",
        tasks: [
          "Project ideation",
          "Creative brief development",
          "Timeline planning",
          "Resource allocation",
          "Quality review",
        ],
      },
      {
        title: "Client Relations",
        tasks: [
          "Client communication",
          "Feedback incorporation",
          "Revision management",
          "Project delivery",
          "Relationship building",
        ],
      },
      {
        title: "Artistic Growth",
        tasks: [
          "Skill development",
          "Inspiration gathering",
          "Portfolio curation",
          "Industry networking",
          "Creative challenges",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "healthcare-worker": {
    title: "Healthcare Worker",
    sections: [
      {
        title: "Professional Duties",
        tasks: [
          "Patient care planning",
          "Shift preparation",
          "Documentation completion",
          "Team coordination",
          "Emergency preparedness",
        ],
      },
      {
        title: "Continuing Education",
        tasks: [
          "Certification maintenance",
          "Training programs",
          "Conference attendance",
          "Research reading",
          "Skill updates",
        ],
      },
      {
        title: "Personal Wellness",
        tasks: ["Stress management", "Physical health", "Mental health support", "Work-life balance", "Recovery time"],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "teacher-educator": {
    title: "Teacher Educator",
    sections: [
      {
        title: "Curriculum Planning",
        tasks: [
          "Lesson plan development",
          "Learning objectives",
          "Assessment design",
          "Resource preparation",
          "Activity planning",
        ],
      },
      {
        title: "Student Support",
        tasks: [
          "Individual student needs",
          "Progress monitoring",
          "Parent communication",
          "Behavioral support",
          "Achievement recognition",
        ],
      },
      {
        title: "Professional Development",
        tasks: [
          "Teaching skill improvement",
          "Educational technology",
          "Classroom management",
          "Peer collaboration",
          "Career advancement",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "small-business-owner": {
    title: "Small Business Owner",
    sections: [
      {
        title: "Operations Management",
        tasks: [
          "Daily operations oversight",
          "Quality control",
          "Inventory management",
          "Staff scheduling",
          "Customer service",
        ],
      },
      {
        title: "Financial Management",
        tasks: [
          "Cash flow monitoring",
          "Expense tracking",
          "Revenue optimization",
          "Tax planning",
          "Investment decisions",
        ],
      },
      {
        title: "Growth Strategy",
        tasks: [
          "Market expansion",
          "Product development",
          "Marketing campaigns",
          "Partnership opportunities",
          "Competitive positioning",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "consultant-advisor": {
    title: "Consultant Advisor",
    sections: [
      {
        title: "Client Engagement",
        tasks: [
          "Client needs assessment",
          "Proposal development",
          "Project scoping",
          "Deliverable planning",
          "Relationship management",
        ],
      },
      {
        title: "Knowledge Management",
        tasks: [
          "Expertise documentation",
          "Best practices capture",
          "Case study development",
          "Research updates",
          "Methodology refinement",
        ],
      },
      {
        title: "Business Development",
        tasks: [
          "Network expansion",
          "Referral generation",
          "Service offerings",
          "Pricing strategy",
          "Market positioning",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "executive-leader": {
    title: "Executive Leader",
    sections: [
      {
        title: "Strategic Leadership",
        tasks: [
          "Vision development",
          "Strategic planning",
          "Goal cascading",
          "Performance monitoring",
          "Course correction",
        ],
      },
      {
        title: "Stakeholder Management",
        tasks: [
          "Board communication",
          "Investor relations",
          "Customer engagement",
          "Partner relationships",
          "Community involvement",
        ],
      },
      {
        title: "Organizational Development",
        tasks: [
          "Culture building",
          "Talent development",
          "Change management",
          "Innovation fostering",
          "Succession planning",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "okr-planning": {
    title: "OKR Planning",
    sections: [
      {
        title: "Objectives Setting",
        tasks: [
          "Define quarterly objectives",
          "Align with company goals",
          "Set inspiring outcomes",
          "Validate objective clarity",
          "Communicate to stakeholders",
        ],
      },
      {
        title: "Key Results Tracking",
        tasks: [
          "Define measurable key results",
          "Set baseline metrics",
          "Track weekly progress",
          "Update confidence levels",
          "Document learnings",
        ],
      },
      {
        title: "Review & Iteration",
        tasks: [
          "Weekly check-ins",
          "Monthly progress review",
          "Quarterly retrospective",
          "Goal adjustment",
          "Next quarter planning",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "getting-things-done": {
    title: "Getting Things Done (GTD)",
    sections: [
      {
        title: "Capture & Clarify",
        tasks: [
          "Inbox collection",
          "Mind sweep exercise",
          "Item clarification",
          "Actionability assessment",
          "Reference filing",
        ],
      },
      {
        title: "Organize & Engage",
        tasks: [
          "Next actions list",
          "Project planning",
          "Context organization",
          "Calendar scheduling",
          "Someday/maybe list",
        ],
      },
      {
        title: "Review & Reflect",
        tasks: ["Daily review", "Weekly review", "Monthly planning", "System maintenance", "Process improvement"],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "pomodoro-technique": {
    title: "Pomodoro Technique",
    sections: [
      {
        title: "Focus Sessions",
        tasks: [
          "25-minute work blocks",
          "Single task focus",
          "Distraction logging",
          "Completion tracking",
          "Quality assessment",
        ],
      },
      {
        title: "Break Management",
        tasks: [
          "5-minute short breaks",
          "15-30 minute long breaks",
          "Break activity planning",
          "Energy restoration",
          "Mental reset",
        ],
      },
      {
        title: "Daily Planning",
        tasks: ["Task estimation", "Pomodoro allocation", "Priority sequencing", "Buffer time", "Review and adjust"],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "bullet-journal": {
    title: "Bullet Journal",
    sections: [
      {
        title: "Rapid Logging",
        tasks: ["Daily task bullets", "Event notation", "Note capturing", "Symbol system", "Migration process"],
      },
      {
        title: "Collections",
        tasks: ["Monthly log setup", "Future log planning", "Custom collections", "Habit tracking", "Goal monitoring"],
      },
      {
        title: "Reflection",
        tasks: ["Daily reflection", "Weekly review", "Monthly assessment", "Goal progress", "System refinement"],
      },
    ],
    dropdowns: {
      category: "habitTypes",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "time-blocking": {
    title: "Time Blocking",
    sections: [
      {
        title: "Block Planning",
        tasks: [
          "Calendar time allocation",
          "Task time estimation",
          "Energy level mapping",
          "Buffer time inclusion",
          "Block type categorization",
        ],
      },
      {
        title: "Execution",
        tasks: [
          "Block adherence",
          "Distraction management",
          "Focus maintenance",
          "Block completion",
          "Transition management",
        ],
      },
      {
        title: "Optimization",
        tasks: [
          "Block effectiveness review",
          "Time estimation accuracy",
          "Schedule adjustment",
          "Pattern identification",
          "System improvement",
        ],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "eisenhower-matrix": {
    title: "Eisenhower Matrix",
    sections: [
      {
        title: "Quadrant Classification",
        tasks: [
          "Urgent & Important (Do)",
          "Important, Not Urgent (Schedule)",
          "Urgent, Not Important (Delegate)",
          "Neither Urgent nor Important (Eliminate)",
          "Regular reclassification",
        ],
      },
      {
        title: "Action Planning",
        tasks: [
          "Immediate action items",
          "Scheduled task planning",
          "Delegation assignments",
          "Elimination decisions",
          "Prevention strategies",
        ],
      },
      {
        title: "System Maintenance",
        tasks: [
          "Daily matrix review",
          "Priority reassessment",
          "Quadrant balance",
          "Effectiveness tracking",
          "Process refinement",
        ],
      },
    ],
    dropdowns: {
      category: "priorityLevels",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "kanban-board": {
    title: "Kanban Board",
    sections: [
      {
        title: "Board Setup",
        tasks: [
          "Column definition",
          "Work-in-progress limits",
          "Card template design",
          "Flow rules establishment",
          "Team alignment",
        ],
      },
      {
        title: "Flow Management",
        tasks: [
          "Card creation and movement",
          "Bottleneck identification",
          "WIP limit enforcement",
          "Cycle time tracking",
          "Throughput measurement",
        ],
      },
      {
        title: "Continuous Improvement",
        tasks: [
          "Flow metrics analysis",
          "Process optimization",
          "Board evolution",
          "Team retrospectives",
          "System refinement",
        ],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "scrum-planning": {
    title: "Scrum Planning",
    sections: [
      {
        title: "Sprint Planning",
        tasks: [
          "Backlog refinement",
          "Sprint goal definition",
          "Story point estimation",
          "Capacity planning",
          "Sprint commitment",
        ],
      },
      {
        title: "Sprint Execution",
        tasks: [
          "Daily standups",
          "Progress tracking",
          "Impediment removal",
          "Sprint goal focus",
          "Collaboration facilitation",
        ],
      },
      {
        title: "Sprint Review",
        tasks: [
          "Sprint retrospective",
          "Demo preparation",
          "Stakeholder feedback",
          "Improvement actions",
          "Next sprint planning",
        ],
      },
    ],
    dropdowns: {
      category: "methodologies",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "smart-goals": {
    title: "SMART Goals",
    sections: [
      {
        title: "Goal Definition",
        tasks: [
          "Specific goal articulation",
          "Measurable criteria setup",
          "Achievability assessment",
          "Relevance validation",
          "Time-bound deadline setting",
        ],
      },
      {
        title: "Progress Tracking",
        tasks: [
          "Milestone identification",
          "Progress measurement",
          "Regular check-ins",
          "Adjustment planning",
          "Success metrics",
        ],
      },
      {
        title: "Achievement & Review",
        tasks: [
          "Goal completion validation",
          "Success celebration",
          "Learning capture",
          "Next goal planning",
          "System improvement",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "habit-stacking": {
    title: "Habit Stacking",
    sections: [
      {
        title: "Stack Design",
        tasks: [
          "Existing habit identification",
          "New habit selection",
          "Stack sequence planning",
          "Trigger point definition",
          "Stack testing",
        ],
      },
      {
        title: "Implementation",
        tasks: [
          "Daily stack execution",
          "Consistency tracking",
          "Obstacle identification",
          "Stack adjustment",
          "Progress monitoring",
        ],
      },
      {
        title: "Optimization",
        tasks: [
          "Stack effectiveness review",
          "Habit strength assessment",
          "Stack expansion",
          "Automation opportunities",
          "Long-term maintenance",
        ],
      },
    ],
    dropdowns: {
      category: "habitTypes",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "deep-work": {
    title: "Deep Work",
    sections: [
      {
        title: "Deep Work Sessions",
        tasks: [
          "Distraction-free environment",
          "Extended focus periods",
          "Cognitively demanding tasks",
          "Flow state cultivation",
          "Session quality tracking",
        ],
      },
      {
        title: "Shallow Work Management",
        tasks: [
          "Email batching",
          "Meeting optimization",
          "Administrative tasks",
          "Communication boundaries",
          "Shallow work minimization",
        ],
      },
      {
        title: "Skill Development",
        tasks: [
          "Deliberate practice",
          "Skill progression tracking",
          "Learning goal setting",
          "Expertise building",
          "Knowledge application",
        ],
      },
    ],
    dropdowns: {
      category: "productivityTechniques",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "atomic-habits": {
    title: "Atomic Habits",
    sections: [
      {
        title: "Habit Loop Design",
        tasks: [
          "Cue identification",
          "Craving creation",
          "Response simplification",
          "Reward optimization",
          "Loop reinforcement",
        ],
      },
      {
        title: "Environment Design",
        tasks: [
          "Cue visibility increase",
          "Friction reduction",
          "Context optimization",
          "Temptation bundling",
          "Social environment",
        ],
      },
      {
        title: "Identity Building",
        tasks: [
          "Identity-based habits",
          "Small wins accumulation",
          "Consistency over perfection",
          "Progress celebration",
          "Identity reinforcement",
        ],
      },
    ],
    dropdowns: {
      category: "habitTypes",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "lean-startup": {
    title: "Lean Startup",
    sections: [
      {
        title: "Build-Measure-Learn",
        tasks: [
          "Hypothesis formation",
          "MVP development",
          "Experiment design",
          "Data collection",
          "Learning validation",
        ],
      },
      {
        title: "Pivot or Persevere",
        tasks: [
          "Metric analysis",
          "Customer feedback",
          "Pivot decision making",
          "Strategy adjustment",
          "Resource reallocation",
        ],
      },
      {
        title: "Innovation Accounting",
        tasks: [
          "Learning milestone tracking",
          "Actionable metrics",
          "Vanity metric avoidance",
          "Progress measurement",
          "Innovation reporting",
        ],
      },
    ],
    dropdowns: {
      category: "methodologies",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "design-thinking": {
    title: "Design Thinking",
    sections: [
      {
        title: "Empathize & Define",
        tasks: [
          "User research",
          "Empathy mapping",
          "Problem definition",
          "Point of view statement",
          "How might we questions",
        ],
      },
      {
        title: "Ideate & Prototype",
        tasks: ["Brainstorming sessions", "Idea selection", "Rapid prototyping", "Concept testing", "Iteration cycles"],
      },
      {
        title: "Test & Implement",
        tasks: [
          "User testing",
          "Feedback collection",
          "Solution refinement",
          "Implementation planning",
          "Impact measurement",
        ],
      },
    ],
    dropdowns: {
      category: "methodologies",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "six-sigma": {
    title: "Six Sigma",
    sections: [
      {
        title: "Define & Measure",
        tasks: [
          "Problem definition",
          "Project charter",
          "Process mapping",
          "Data collection plan",
          "Baseline measurement",
        ],
      },
      {
        title: "Analyze & Improve",
        tasks: [
          "Root cause analysis",
          "Statistical analysis",
          "Solution development",
          "Pilot testing",
          "Implementation planning",
        ],
      },
      {
        title: "Control & Sustain",
        tasks: [
          "Control plan development",
          "Monitoring systems",
          "Process documentation",
          "Training delivery",
          "Continuous improvement",
        ],
      },
    ],
    dropdowns: {
      category: "methodologies",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "life-wheel": {
    title: "Life Wheel Assessment",
    sections: [
      {
        title: "Life Area Evaluation",
        tasks: [
          "Career satisfaction rating",
          "Health and fitness assessment",
          "Relationship quality review",
          "Financial security evaluation",
          "Personal growth progress",
        ],
      },
      {
        title: "Balance Analysis",
        tasks: [
          "Identify overemphasized areas",
          "Spot neglected life areas",
          "Calculate overall balance score",
          "Visualize life wheel chart",
          "Set balance improvement goals",
        ],
      },
      {
        title: "Action Planning",
        tasks: [
          "Priority area selection",
          "Specific improvement actions",
          "Timeline for changes",
          "Progress measurement plan",
          "Regular reassessment schedule",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "values-clarification": {
    title: "Values Clarification",
    sections: [
      {
        title: "Values Discovery",
        tasks: [
          "Core values identification",
          "Values definition exercise",
          "Personal values ranking",
          "Values conflict resolution",
          "Values authenticity check",
        ],
      },
      {
        title: "Alignment Assessment",
        tasks: [
          "Current life vs values gap",
          "Decision alignment review",
          "Relationship values match",
          "Career values alignment",
          "Daily actions consistency",
        ],
      },
      {
        title: "Values Integration",
        tasks: [
          "Values-based goal setting",
          "Decision-making framework",
          "Values communication plan",
          "Boundary establishment",
          "Values living practice",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "legacy-planning": {
    title: "Legacy Planning",
    sections: [
      {
        title: "Vision Creation",
        tasks: [
          "Legacy vision statement",
          "Impact definition",
          "Values-based legacy",
          "Contribution identification",
          "Meaning and purpose",
        ],
      },
      {
        title: "Impact Mapping",
        tasks: [
          "Personal impact areas",
          "Professional contributions",
          "Community involvement",
          "Knowledge sharing",
          "Mentorship opportunities",
        ],
      },
      {
        title: "Legacy Building",
        tasks: [
          "Daily legacy actions",
          "Relationship investments",
          "Skill development for impact",
          "Documentation and sharing",
          "Progress celebration",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "vision-board": {
    title: "Vision Board",
    sections: [
      {
        title: "Vision Development",
        tasks: [
          "Life vision articulation",
          "Goal visualization",
          "Dream identification",
          "Aspiration mapping",
          "Future self imaging",
        ],
      },
      {
        title: "Visual Creation",
        tasks: [
          "Inspiring image collection",
          "Motivational quote selection",
          "Visual arrangement",
          "Color and theme choice",
          "Board finalization",
        ],
      },
      {
        title: "Vision Activation",
        tasks: [
          "Daily vision review",
          "Action step identification",
          "Progress photo updates",
          "Vision refinement",
          "Manifestation tracking",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "quarterly-reviews": {
    title: "Quarterly Reviews",
    sections: [
      {
        title: "Quarter Reflection",
        tasks: [
          "Goal achievement review",
          "Success celebration",
          "Challenge analysis",
          "Learning extraction",
          "Growth measurement",
        ],
      },
      {
        title: "Performance Analysis",
        tasks: [
          "Productivity assessment",
          "Habit effectiveness review",
          "Time allocation analysis",
          "Energy management review",
          "System optimization",
        ],
      },
      {
        title: "Next Quarter Planning",
        tasks: [
          "New goal setting",
          "Priority adjustment",
          "Strategy refinement",
          "Resource allocation",
          "Success metrics definition",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "energy-management": {
    title: "Energy Management",
    sections: [
      {
        title: "Energy Assessment",
        tasks: [
          "Daily energy pattern tracking",
          "Peak performance identification",
          "Energy drain analysis",
          "Recovery need assessment",
          "Natural rhythm discovery",
        ],
      },
      {
        title: "Energy Optimization",
        tasks: [
          "High-energy task scheduling",
          "Energy-giving activity planning",
          "Drain elimination strategies",
          "Recovery time blocking",
          "Nutrition and sleep optimization",
        ],
      },
      {
        title: "Sustainable Practices",
        tasks: [
          "Energy maintenance routines",
          "Burnout prevention strategies",
          "Renewal activity integration",
          "Boundary setting for energy",
          "Long-term sustainability plan",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "decision-framework": {
    title: "Decision Framework",
    sections: [
      {
        title: "Decision Structure",
        tasks: [
          "Decision criteria identification",
          "Option generation",
          "Stakeholder consideration",
          "Risk assessment",
          "Timeline establishment",
        ],
      },
      {
        title: "Analysis Process",
        tasks: [
          "Pros and cons evaluation",
          "Weighted decision matrix",
          "Scenario planning",
          "Intuition integration",
          "Expert consultation",
        ],
      },
      {
        title: "Implementation & Review",
        tasks: [
          "Decision implementation plan",
          "Progress monitoring",
          "Outcome evaluation",
          "Learning capture",
          "Framework refinement",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "mindfulness-planner": {
    title: "Mindfulness Planner",
    sections: [
      {
        title: "Mindfulness Practice",
        tasks: [
          "Daily meditation sessions",
          "Breathing exercises",
          "Body scan practice",
          "Mindful walking",
          "Present moment awareness",
        ],
      },
      {
        title: "Stress Management",
        tasks: [
          "Stress trigger identification",
          "Mindful response strategies",
          "Relaxation techniques",
          "Emotional regulation",
          "Calm restoration practices",
        ],
      },
      {
        title: "Mindful Living",
        tasks: [
          "Mindful eating practices",
          "Conscious communication",
          "Gratitude cultivation",
          "Compassion development",
          "Mindful work integration",
        ],
      },
    ],
    dropdowns: {
      category: "habitTypes",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "financial-freedom": {
    title: "Financial Freedom",
    sections: [
      {
        title: "Financial Assessment",
        tasks: [
          "Net worth calculation",
          "Income stream analysis",
          "Expense categorization",
          "Debt evaluation",
          "Investment portfolio review",
        ],
      },
      {
        title: "Wealth Building Strategy",
        tasks: [
          "Savings rate optimization",
          "Investment diversification",
          "Passive income development",
          "Tax optimization strategies",
          "Emergency fund building",
        ],
      },
      {
        title: "Freedom Timeline",
        tasks: [
          "Financial independence number",
          "Timeline milestone setting",
          "Progress tracking system",
          "Strategy adjustment plan",
          "Freedom lifestyle planning",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "relationship-mapping": {
    title: "Relationship Mapping",
    sections: [
      {
        title: "Network Analysis",
        tasks: [
          "Relationship inventory",
          "Connection strength assessment",
          "Network gap identification",
          "Relationship quality evaluation",
          "Support system mapping",
        ],
      },
      {
        title: "Relationship Goals",
        tasks: [
          "Relationship improvement targets",
          "New connection objectives",
          "Communication enhancement",
          "Conflict resolution planning",
          "Intimacy and trust building",
        ],
      },
      {
        title: "Connection Nurturing",
        tasks: [
          "Regular check-in scheduling",
          "Meaningful interaction planning",
          "Appreciation expression",
          "Shared experience creation",
          "Relationship maintenance system",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "creativity-catalyst": {
    title: "Creativity Catalyst",
    sections: [
      {
        title: "Creative Foundation",
        tasks: [
          "Creative strengths identification",
          "Inspiration source mapping",
          "Creative block analysis",
          "Artistic skill assessment",
          "Creative environment setup",
        ],
      },
      {
        title: "Idea Generation",
        tasks: [
          "Brainstorming sessions",
          "Cross-pollination exercises",
          "Random connection making",
          "Perspective shifting",
          "Idea capture system",
        ],
      },
      {
        title: "Creative Projects",
        tasks: [
          "Project pipeline management",
          "Creative experimentation",
          "Skill development planning",
          "Feedback integration",
          "Creative output tracking",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "leadership-development": {
    title: "Leadership Development",
    sections: [
      {
        title: "Leadership Assessment",
        tasks: [
          "Leadership style identification",
          "Strengths and weaknesses analysis",
          "360-degree feedback review",
          "Leadership competency mapping",
          "Growth area prioritization",
        ],
      },
      {
        title: "Skill Building",
        tasks: [
          "Communication skill enhancement",
          "Emotional intelligence development",
          "Decision-making improvement",
          "Conflict resolution training",
          "Strategic thinking cultivation",
        ],
      },
      {
        title: "Leadership Practice",
        tasks: [
          "Team leadership opportunities",
          "Mentoring and coaching",
          "Influence strategy implementation",
          "Change leadership experience",
          "Leadership impact measurement",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "wellness-optimization": {
    title: "Wellness Optimization",
    sections: [
      {
        title: "Health Assessment",
        tasks: [
          "Physical health evaluation",
          "Mental wellness check",
          "Stress level assessment",
          "Sleep quality analysis",
          "Nutrition habit review",
        ],
      },
      {
        title: "Wellness Planning",
        tasks: [
          "Fitness goal setting",
          "Nutrition plan development",
          "Stress management strategy",
          "Sleep optimization plan",
          "Mental health support system",
        ],
      },
      {
        title: "Holistic Integration",
        tasks: [
          "Mind-body connection practices",
          "Work-life balance optimization",
          "Social wellness cultivation",
          "Environmental health improvement",
          "Spiritual wellness exploration",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "learning-accelerator": {
    title: "Learning Accelerator",
    sections: [
      {
        title: "Learning Strategy",
        tasks: [
          "Learning style identification",
          "Knowledge gap analysis",
          "Learning goal prioritization",
          "Resource identification",
          "Study method optimization",
        ],
      },
      {
        title: "Skill Development",
        tasks: [
          "Deliberate practice planning",
          "Skill progression tracking",
          "Feedback loop creation",
          "Mastery milestone setting",
          "Application opportunity seeking",
        ],
      },
      {
        title: "Knowledge Retention",
        tasks: [
          "Spaced repetition system",
          "Active recall practice",
          "Knowledge connection making",
          "Teaching and sharing",
          "Continuous review process",
        ],
      },
    ],
    dropdowns: {
      category: "goalCategories",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
  "impact-amplifier": {
    title: "Impact Amplifier",
    sections: [
      {
        title: "Impact Vision",
        tasks: [
          "Personal mission definition",
          "Impact area identification",
          "Change theory development",
          "Success metrics establishment",
          "Stakeholder mapping",
        ],
      },
      {
        title: "Action Planning",
        tasks: [
          "High-impact activity identification",
          "Resource mobilization",
          "Partnership development",
          "Skill building for impact",
          "Platform building strategy",
        ],
      },
      {
        title: "Impact Measurement",
        tasks: [
          "Progress tracking system",
          "Outcome evaluation",
          "Story collection",
          "Impact amplification strategies",
          "Continuous improvement process",
        ],
      },
    ],
    dropdowns: {
      category: "lifeAreas",
      priority: "priorityLevels",
      timeframe: "timeFrames",
    },
  },
}
