import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  RxGithubLogo,
  RxLinkedinLogo,
  RxEnvelopeClosed,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "Python",
    image: "python.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C",
    image: "c.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C++",
    image: "cplusplus.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java",
    image: "java.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "javascript.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "SQL",
    image: "mysql.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Pandas",
    image: "pandas.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "NumPy",
    image: "numpy.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Scikit-learn",
    image: "scikitlearn.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Kafka",
    image: "apachekafka.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Spark",
    image: "apachespark.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Git",
    image: "git.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker",
    image: "docker.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jupyter",
    image: "jupyter.svg",
    width: 80,
    height: 80,
  },
] as const;

export const SOCIALS = [
  {
    name: "GitHub",
    icon: FaGithub,
    link: "https://github.com/muneeb-x",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/abdul-muneeb-b0074540a",
  },
  {
    name: "Email",
    icon: RxEnvelopeClosed,
    link: "mailto:muneebkhurram69@gmail.com",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "Python",
    image: "python.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "javascript.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C",
    image: "c.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "C++",
    image: "cplusplus.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java",
    image: "java.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "SQL",
    image: "mysql.svg",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Pandas",
    image: "pandas.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "NumPy",
    image: "numpy.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Scikit-learn",
    image: "scikitlearn.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Kafka",
    image: "apachekafka.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Apache Spark",
    image: "apachespark.svg",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Git",
    image: "git.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker",
    image: "docker.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Jupyter",
    image: "jupyter.svg",
    width: 80,
    height: 80,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Python",
    image: "python.svg",
    width: 80,
    height: 80,
  },
] as const;

export const PROJECTS = [
  {
    title: "Custom Shell Implementation",
    description:
      "A fully-featured custom shell implementation for Operating Systems course. Supports command execution, variables, and process management. Built entirely in C with a Makefile build system across 8 version releases.",
    image: "/projects/project-1.png",
    link: "https://github.com/muneeb-x/BSDSF23A036-OS-A03",
  },
  {
    title: "Data Science & ML Notebooks",
    description:
      "Comprehensive collection of Jupyter notebooks covering Python programming, NumPy, Pandas, Matplotlib, Scikit-learn, Natural Language Processing, and Deep Learning. A complete data science learning resource.",
    image: "/projects/project-2.png",
    link: "https://github.com/muneeb-x/data-science",
  },
  {
    title: "Process Scheduler (OS Lab 2)",
    description:
      "Process scheduling algorithms implementation for Operating Systems course. Demonstrates CPU scheduling concepts including FCFS, SJF, and Round Robin. Developed in C with structured build pipeline and releases.",
    image: "/projects/project-3.png",
    link: "https://github.com/muneeb-x/BSDSF23A036-OS-A02",
  },
  {
    title: "GitHub Profile README",
    description:
      "My GitHub profile repository featuring an interactive README with typing effects, tech stack badges, GitHub analytics stats, and a clean About Me section showcasing my Data Science & AI journey.",
    image: "/projects/project-1.png",
    link: "https://github.com/muneeb-x/muneeb-x",
  },
  {
    title: "Global Market Terminal",
    description:
      "A collaborative terminal-based global market analysis tool. Built with Zinx for real-time market data and insights.",
    image: "/projects/project-2.png",
    link: "https://github.com/Zin-7045/global-market-terminal",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/muneeb-x",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/abdul-muneeb-b0074540a",
      },
      {
        name: "Email",
        icon: RxEnvelopeClosed,
        link: "mailto:muneebkhurram69@gmail.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/abdul-muneeb-b0074540a",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/muneeb-x",
      },
      {
        name: "Email",
        icon: RxEnvelopeClosed,
        link: "mailto:muneebkhurram69@gmail.com",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "My Profile",
        icon: null,
        link: "https://github.com/muneeb-x",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:muneebkhurram69@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/muneeb-x",
};
