import { skills as importedSkills } from '@dr/utils';

function findMatchingSkill(label: string) {
  return importedSkills.find((skill) => skill.value.toLowerCase() === label.toLowerCase());
}

export function processLinkedinData(data: any) {
  let newData = data;

  newData.skills = data.skills.map((userSkill: any) => {
    const match = findMatchingSkill(userSkill.label);
    return match ? match : userSkill;
  });

  newData.experience = data.experience.map((exp: any) => {
    exp.roles = exp.roles.map((role: any) => ({
      ...role,
      location_type: role.location_type || 'On-site',
      employment_type: role.employment_type || 'Full-time',
    }));
    return exp;
  });

  return newData;
}
