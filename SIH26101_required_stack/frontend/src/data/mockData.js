/**
 * STATS AI - Mock Data & Role Definitions
 * Ministry of Statistics & Programme Implementation (MoSPI)
 */

export const STATS_DATA = {
  // Pre-configured Officer Profiles for Quick Selection
  profiles: [
    {
      id: "EMP-MOSPI-1082",
      name: "Ramesh Kumar",
      designation: "Senior Statistical Officer",
      department: "National Statistical Systems Training Academy (NSSTA)",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "ramesh.kumar@mospi.gov.in",
      experienceYears: 6,
      batch: "ISS Batch 2018",
      zone: "HQ - New Delhi",
      currentCompetencies: {
        "Statistics": 0,
        "Python Basics": 0,
        "Data Handling": 0,
        "Data Visualization": 0
      }
    },
    {
      id: "EMP-MOSPI-2041",
      name: "Dr. Ananya Iyer",
      designation: "Data Analyst / Data Scientist",
      department: "Data Quality & Innovation Division",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "ananya.iyer@mospi.gov.in",
      experienceYears: 4,
      batch: "ISS Batch 2020",
      zone: "Kolkata Hub",
      currentCompetencies: {
        "Python Basics": 0,
        "Data Handling": 0,
        "AI/ML": 0,
        "Data Visualization": 0
      }
    },
    {
      id: "EMP-MOSPI-3199",
      name: "Vikramaditya Rao",
      designation: "Field Survey & Operations Officer",
      department: "Field Operations Division (FOD)",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "vikram.rao@mospi.gov.in",
      experienceYears: 9,
      batch: "ISS Batch 2015",
      zone: "Hyderabad Regional Office",
      currentCompetencies: {
        "Statistics": 0,
        "Statistical Computing": 0,
        "Data Handling": 0,
        "Data Visualization": 0
      }
    },
    {
      id: "EMP-MOSPI-4512",
      name: "Pooja Deshmukh",
      designation: "GIS & Spatial Analytics Specialist",
      department: "Geospatial Statistics & Remote Sensing Unit",
      ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
      email: "pooja.deshmukh@mospi.gov.in",
      experienceYears: 5,
      batch: "ISS Batch 2019",
      zone: "Pune Regional Centre",
      currentCompetencies: {
        "GIS": 0,
        "Data Handling": 0,
        "Statistics": 0,
        "Data Visualization": 0
      }
    }
  ],

  // Role benchmarks used in Skill Gap analysis
  roleRequirements: {
    "Senior Statistical Officer": {
      "Statistics": 85,
      "Python Basics": 80,
      "Data Handling": 85,
      "Data Visualization": 75
    },
    "Data Analyst / Data Scientist": {
      "Python Basics": 90,
      "Data Handling": 90,
      "AI/ML": 85,
      "Data Visualization": 80
    },
    "GIS & Spatial Analytics Specialist": {
      "GIS": 90,
      "Data Handling": 80,
      "Statistics": 75,
      "Data Visualization": 80
    },
    "Field Survey & Operations Officer": {
      "Statistics": 90,
      "Statistical Computing": 85,
      "Data Handling": 80,
      "Data Visualization": 70
    }
  },

  // Pre-Assessment Initial Course Recommendations
  initialRecommendations: [
    {
      id: "REC-INIT-1",
      title: "Foundations of National Statistical Surveys",
      provider: "NSSTA - National Academy",
      duration: "12 Hours",
      level: "Intermediate",
      targetCompetency: "Statistics",
      description: "Core methodologies in stratified sampling, error minimization, and census data collection frameworks for government statistical systems.",
      badge: "Mandatory MoSPI Core",
      progress: 60
    },
    {
      id: "REC-INIT-2",
      title: "Applied Statistical Computing with Python",
      provider: "iGOT Karmayogi",
      duration: "18 Hours",
      level: "Beginner to Intermediate",
      targetCompetency: "Statistical Computing",
      description: "Automating tabular aggregation, standard deviation computations, and index number generation using modern script pipelines.",
      badge: "iGOT Flagship",
      progress: 40
    },
    {
      id: "REC-INIT-3",
      title: "GIS & Spatial Analytics for District-Level Indicators",
      provider: "iGOT Karmayogi / ISRO-MoSPI Joint Wing",
      duration: "15 Hours",
      level: "Intermediate",
      targetCompetency: "GIS",
      description: "Mapping socioeconomic indicators, geocoding enumeration blocks, and thematic choropleth generation.",
      badge: "Digital India Track",
      progress: 25
    }
  ],

  // Assessment History
  initialHistory: [
    {
      id: "ASSESS-001",
      title: "Assessment 1 - Baseline Officer Competency Exam",
      date: "15-Aug-2026, 11:30 AM",
      overallScore: 62,
      totalQuestions: 10,
      correctAnswers: 6,
      strongestTopic: "Statistics",
      strongestScore: 80,
      primarySkillGap: "Data Handling",
      primaryGapScore: 33,
      status: "COMPLETED",
      topicBreakdown: {
        "Statistics": 80,
        "Python Basics": 60,
        "Data Handling": 33,
        "Data Visualization": 50
      }
    }
  ]
};

// Export to window for global access
