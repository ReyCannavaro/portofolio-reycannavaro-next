import {
  achievements,
  currentStatus,
  educationHistory,
  experienceHistory,
  personalInfo,
  projects,
  skillCategories,
  socialLinks,
  type ExperienceSubRole,
  type ExperienceHistoryItem,
} from "../data";

export function getPortfolioContext() {
  const skills = skillCategories
    .map((category) => `${category.label}: ${category.skills.join(", ")}`)
    .join("\n");

  const projectList = projects
    .map((project) => {
      const live = project.links.live ? `Live: ${project.links.live}` : "Live: belum tersedia";
      const github = project.links.github ? `GitHub: ${project.links.github}` : "GitHub: belum tersedia";
      const caseStudy =
        project.id === "urbangrow" || project.id === "skomda-gateway"
          ? `  Studi Kasus Rekayasa Arsitektur: Tersedia lengkap di https://reycannavaro.dev/projects/${project.id}`
          : "";

      return [
        `- ${project.name} (${project.category})`,
        `  Tagline: ${project.tagline}`,
        `  Deskripsi: ${project.description}`,
        `  Teknologi: ${project.technologies.join(", ")}`,
        `  Status: ${project.status}`,
        `  Durasi: ${project.duration}`,
        `  ${github}`,
        `  ${live}`,
        caseStudy,
      ]
        .filter(Boolean)
        .join("\n");
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

  const experience = experienceHistory
    .map((item: ExperienceHistoryItem) => {
      const rolesInfo =
        item.roles && item.roles.length > 0
          ? item.roles
              .map(
                (r: ExperienceSubRole) =>
                  `    * Fase: ${r.role} (${r.period}) [${r.badge} - ${r.type}]\n      Scope: ${r.scope}\n      Ringkasan: ${r.summary}\n      Tanggung jawab: ${r.responsibilities.join("; ")}`
              )
              .join("\n")
          : "";

      return [
        `- ${item.company} (${item.period})`,
        `  Role Utama: ${item.role}`,
        `  Tipe Kontrak: ${item.type}`,
        `  Status: ${item.status}`,
        `  Industri: ${item.industry}`,
        `  Scope: ${item.scope}`,
        `  Lokasi: ${item.location}`,
        `  Ringkasan: ${item.summary}`,
        rolesInfo ? `  Tahapan Peran (Progresi Karir ala LinkedIn):\n${rolesInfo}` : "",
        `  Deskripsi: ${item.description}`,
        `  Tanggung jawab umum: ${item.responsibilities.join(", ")}`,
        `  Teknologi: ${item.technologies.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
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

Pengalaman:
${experience}

Pendidikan:
${education}

Project:
${projectList}

Prestasi:
${achievementList}
`.trim();
}
