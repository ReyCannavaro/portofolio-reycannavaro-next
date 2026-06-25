import {
  achievements,
  currentStatus,
  educationHistory,
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
} from "../data";

export function getPortfolioContext() {
  const skills = skillCategories
    .map((category) => `${category.label}: ${category.skills.join(", ")}`)
    .join("\n");

  const projectList = projects
    .map((project) => {
      const live = project.links.live ? `Live: ${project.links.live}` : "Live: belum tersedia";
      const github = project.links.github ? `GitHub: ${project.links.github}` : "GitHub: belum tersedia";

      return [
        `- ${project.name} (${project.category})`,
        `  Tagline: ${project.tagline}`,
        `  Deskripsi: ${project.description}`,
        `  Teknologi: ${project.technologies.join(", ")}`,
        `  Status: ${project.status}`,
        `  Durasi: ${project.duration}`,
        `  ${github}`,
        `  ${live}`,
      ].join("\n");
    })
    .join("\n\n");

  const education = educationHistory
    .map((item) =>
      [
        `- ${item.institution} (${item.startYear}-${item.endYear})`,
        `  Jurusan/Program: ${item.degree}`,
        `  Status: ${item.status}`,
        `  Lokasi: ${item.location}`,
        `  Highlight: ${item.highlights.join(", ")}`,
        `  Deskripsi: ${item.description}`,
      ].join("\n")
    )
    .join("\n\n");

  const achievementList = achievements
    .map((achievement) => {
      const rank = achievement.rank ? ` Rank: ${achievement.rank}.` : "";
      return `- ${achievement.title} (${achievement.year}, ${achievement.category}, ${achievement.level}).${rank} ${achievement.description}`;
    })
    .join("\n");

  return `
Profil utama:
- Nama: ${personalInfo.name}
- Role: ${personalInfo.title}
- Subtitle: ${personalInfo.subtitle}
- Lokasi: ${personalInfo.location}
- Zona waktu: ${personalInfo.timezone}
- Umur: ${personalInfo.age}
- Pengalaman: ${personalInfo.yearsExperience}+ tahun
- Bio: ${personalInfo.bio}
- Email: ${personalInfo.email}
- Telepon: ${personalInfo.phone}
- Status: ${currentStatus.availableForWork}

Sosial:
- GitHub: ${socialLinks.github.url}
- LinkedIn: ${socialLinks.linkedin.url}
- Instagram: ${socialLinks.instagram.url}
- Twitter/X: ${socialLinks.twitter.url}
- Threads: ${socialLinks.threads.url}

Skill:
${skills}

Pendidikan:
${education}

Project:
${projectList}

Prestasi:
${achievementList}
`.trim();
}
