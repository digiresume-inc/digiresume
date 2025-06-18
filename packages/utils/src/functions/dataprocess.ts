import { countries, skills as importedSkills } from '@dr/utils';

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

export function formatLinkedInProfile(profile: any) {
  const shortBio = profile.summary
    ? profile.summary.split('.').slice(0, 2).join('. ').trim() + '.'
    : '';

  function getCountry(code: string): string {
    return (
      countries.find((country) => {
        const [, countryCode] = country.split('-');
        return (countryCode as string).toLowerCase() === code.toLowerCase();
      }) || ''
    );
  }

  const finalData = {
    full_name: `${profile.firstName} ${profile.lastName}`,
    headline: profile.headline || '',
    shortbio: shortBio,
    skills: (profile.skills || []).map((skill: any) => ({
      logo: '',
      label: skill,
      value: skill.toLowerCase().replace(/\s+/g, '-'),
      category: 'general',
    })),
    avatar_url: profile.pictureUrl,
    country: getCountry(profile.countryCode),
    geo_info: {
      city: profile.geoLocationName?.split(',')[0]?.trim() || '',
      state: profile.geoLocationName?.split(',')[1]?.trim() || '',
    },
    profile_link: {
      url: profile.website || '',
      text: profile.website ? 'Portfolio' : '',
    },
    experience: (profile.positions || []).map((pos: any, i: any) => ({
      a: i,
      company: pos.companyName || '',
      company_link: profile.companyLinkedinUrl || '',
      skills_used: [], // no data available, keep empty
      contribution: '',
      roles: [
        {
          start_date: pos.timePeriod?.startDate
            ? `${String(pos.timePeriod.startDate.month || 1).padStart(2, '0')}/${pos.timePeriod.startDate.year}`
            : '',
          end_date: pos.timePeriod?.endDate
            ? `${String(pos.timePeriod.endDate.month || 1).padStart(2, '0')}/${pos.timePeriod.endDate.year}`
            : '',
          headline: pos.title || '',
          location: profile.geoCountryName?.toLowerCase() || '',
          location_type: 'On-site',
          employment_type: 'Full-time',
          currently_working: pos.timePeriod?.endDate ? false : true,
        },
      ],
    })),
    socials: [],
    company: profile.companyName || '',
    education: (() => {
      const edu = profile.educations?.[0];
      return {
        university: edu?.schoolName || '',
        branch: edu?.degreeName || '',
        start_date: edu?.timePeriod?.startDate
          ? `${String(edu.timePeriod.startDate.month || 1).padStart(2, '0')}/${edu.timePeriod.startDate.year}`
          : '',
        end_date: edu?.timePeriod?.endDate
          ? `${String(edu.timePeriod.endDate.month || 1).padStart(2, '0')}/${edu.timePeriod.endDate.year}`
          : '',
        grade: 'A',
      };
    })(),
  };

  let newData = finalData;

  newData.skills = finalData.skills.map((userSkill: any) => {
    const match = findMatchingSkill(userSkill.label);
    return match ? match : userSkill;
  });

  return newData;
}
