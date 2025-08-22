// Project data configuration
// This could be moved to a database or CMS in the future
export const projectsData = {
  'p0-cheap-ros-mobile-robot': {
    title: 'P0 Cheap ROS Mobile Robot',
    description: 'A low-cost mobile robot platform using ROS for educational and research purposes.',
    fullDescription: `
      This project focuses on creating an affordable mobile robot platform that utilizes the Robot Operating System (ROS) 
      for educational and research applications. The robot is designed to be cost-effective while maintaining functionality 
      for learning robotics concepts and conducting basic research.

      Key features include:
      - ROS integration for modular programming
      - Basic navigation capabilities
      - Sensor integration support
      - Educational documentation and tutorials
    `,
    tags: ["ROS", "Software", "Education"],
    image: "/projectImages/p0-cheap-ros-mobile-robot.jpg",
    status: "Completed",
    year: "2024",
    team: ["Software", "Mechanical", "Electrical"],
    technologies: ["ROS", "Python", "Ubuntu", "Arduino"],
    github: "https://github.com/oc-robotics/p0-cheap-ros-mobile-robot",
    documentation: "/documentation/p0-cheap-ros-mobile-robot"
  },
  'p0-sonar-viz-robot': {
    title: 'P0 Sonar Viz Robot',
    description: 'A small cart-based robot equipped with sensors for education and research purposes.',
    fullDescription: `
      The Sonar Visualization Robot is an educational platform designed to demonstrate sensor data visualization 
      and basic autonomous navigation. This cart-based robot uses ultrasonic sensors to map its environment 
      and provide real-time visualization of sensor data.

      This project serves as an excellent introduction to:
      - Sensor data processing and visualization
      - Basic autonomous navigation
      - Real-time data streaming
      - Educational robotics concepts
    `,
    tags: ["ROS", "Sensors", "Software", "Education"],
    image: "/projectImages/p0-sonar-viz-robot.jpg",
    status: "Completed",
    year: "2024",
    team: ["Software", "Mechanical", "Electrical"],
    technologies: ["ROS", "Python", "Ultrasonic Sensors", "Data Visualization"],
    github: "https://github.com/oc-robotics/p0-sonar-viz-robot",
    documentation: "/documentation/sonar_viz_bot_user_manual"
  },
  'p1-mars-rover': {
    title: 'P1 Mars Rover',
    description: 'A robotic rover designed for Mars exploration, including the rocker bogie suspension system.',
    fullDescription: `
      Our Mars Rover project represents a significant step into space exploration robotics. This rover features 
      the iconic rocker-bogie suspension system used by NASA's Mars rovers, providing excellent mobility over 
      rough terrain while maintaining stability.

      The rover incorporates:
      - Advanced suspension system for rough terrain navigation
      - Multiple sensors for environmental monitoring
      - Autonomous navigation capabilities
      - Communication systems for remote operation
      - Sample collection mechanisms
    `,
    tags: ["Mechanical", "Symposium", "URC", "Exploration"],
    image: "/projectImages/p1-mars-rover.jpg",
    status: "In Progress",
    year: "2024-2025",
    team: ["Mechanical", "Electrical", "Software", "Systems"],
    technologies: ["CAD Design", "ROS", "Computer Vision", "Embedded Systems"],
    github: "https://github.com/oc-robotics/p1-mars-rover",
    documentation: "/documentation/p1-mars-rover"
  },
  'p2-kibo-rpc': {
    title: 'P2 KIBO RPC',
    description: 'A robotic system designed for the KIBO module of the International Space Station, focusing on remote operation, computer vision, and control.',
    fullDescription: `
      The KIBO RPC (Robot Programming Challenge) project is our venture into space robotics, specifically designed 
      for operations aboard the International Space Station's Japanese Experiment Module (KIBO). This project 
      emphasizes remote operation capabilities, advanced computer vision, and precise control systems (Quaternions).

      Key aspects include:
      - Zero-gravity operation considerations
      - Advanced computer vision algorithms
      - Remote procedure call implementations
      - Real-time control systems
      - Space-grade reliability requirements
    `,
    tags: ["Software", "Computer Vision", "Remote Control", "Education"],
    image: "/projectImages/p2-kibo-rpc.jpg",
    status: "Completed",
    year: "2024-2025",
    team: ["Software"],
    technologies: ["Computer Vision", "Remote Control", "Real-time Systems", "Space Robotics"],
    github: "https://github.com/oc-robotics/p2-kibo-rpc",
    documentation: "/documentation/p2-kibo-rpc"
  }
};

// Helper function to get all projects
export function getAllProjects() {
  return Object.entries(projectsData).map(([slug, data]) => ({
    slug,
    ...data
  }));
}

// Helper function to get a single project
export function getProject(slug) {
  return projectsData[slug] || null;
}

// Helper function to get project slugs
export function getProjectSlugs() {
  return Object.keys(projectsData);
}
