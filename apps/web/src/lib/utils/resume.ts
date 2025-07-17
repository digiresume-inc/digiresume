import {
  Document,
  Paragraph,
  TextRun,
  BorderStyle,
  AlignmentType,
  TabStopType,
  ExternalHyperlink,
} from 'docx'; // <- make sure you export profileData from this file

// Divider

export function generateResumeDoc(profileData: any) {
  const divider = new Paragraph({
    border: {
      bottom: {
        color: 'bfbfbf',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 200, after: 200 },
  });

  // Section Header
  const sectionHeader = (text: string) =>
    new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text,
          bold: true,
          allCaps: true,
          size: 23,
          font: 'Garamond',
          color: '000000',
        }),
      ],
    });

  // Tag run
  const tag = (text: string) =>
    new TextRun({
      text: text + '  ',
      size: 24,
      font: 'Garamond',
      color: '000000',
    });

  // Name & Contact
  const name = new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: profileData.full_name,
        bold: true,
        size: 32,
        font: 'Garamond',
        color: '404040',
      }),
    ],
  });

  const contact = new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `${profileData.geo_info.city}, ${profileData.geo_info.state} | `,
        font: 'Garamond',
        size: 22,
      }),
      ...[
        { link: `mailto:${profileData.email}`, text: 'Mail' },
        ...profileData.socials.map((s: any) => ({
          link: s.url,
          text: s.url.includes('linkedin')
            ? 'LinkedIn'
            : s.url.includes('github')
              ? 'GitHub'
              : 'Social',
        })),
      ].flatMap((item, i, arr) => [
        new ExternalHyperlink({
          link: item.link,
          children: [
            new TextRun({
              text: item.text,
              style: 'Hyperlink',
              font: 'Garamond',
              size: 22,
            }),
          ],
        }),
        ...(i < arr.length - 1 ? [new TextRun({ text: ' | ', size: 22 })] : []),
      ]),
    ],
  });

  // Work Experience
  const experienceEntry = (exp: any) => {
    const paragraphs = [
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: exp.company,
            bold: true,
            size: 22,
            font: 'Garamond',
          }),
        ],
      }),
      ...exp.roles.map(
        (role: any) =>
          new Paragraph({
            spacing: { after: 50 },
            tabStops: [{ type: TabStopType.RIGHT, position: 11600 }],
            children: [
              new TextRun({
                text: role.headline,
                size: 20,
                font: 'Garamond',
              }),
              new TextRun({
                text: `\t${role.location}, ${role.start_date} - ${
                  role.currently_working ? 'Present' : role.end_date
                }`,
                size: 20,
                font: 'Garamond',
              }),
            ],
          })
      ),
      new Paragraph({
        spacing: { after: 100 },
        indent: { left: 200, hanging: 200 },
        children: [
          new TextRun({
            text: '• ',
            bold: true,
            size: 22,
            color: '404040',
          }),
          new TextRun({
            text: exp.contribution,
            size: 20,
            font: 'Garamond',
          }),
        ],
      }),
    ];
    return paragraphs;
  };
  const experienceSections = profileData.experience.flatMap(experienceEntry);

  // Skills
  const skillsParagraph = new Paragraph({
    spacing: { after: 200 },
    children: profileData.skills.map((s: any) => tag(s.label)),
  });

  // Projects
  const projectsParagraphs = profileData.projects.flatMap((proj: any) => [
    new Paragraph({
      spacing: { after: 50 },
      children: [
        new TextRun({
          text: proj.name,
          bold: true,
          size: 22,
          font: 'Garamond',
        }),
        new TextRun({ text: '  ' }),
        new ExternalHyperlink({
          link: proj.url,
          children: [
            new TextRun({
              text: 'Link↗',
              style: 'Hyperlink',
              font: 'Garamond',
              size: 22,
            }),
          ],
        }),
        new TextRun({
          text:
            '\t' +
            new Date(proj.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            }),
          size: 22,
          font: 'Garamond',
        }),
      ],
    }),
    new Paragraph({
      indent: { left: 200, hanging: 200 },
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: '• ',
          bold: true,
          size: 22,
          color: '404040',
        }),
        new TextRun({ text: proj.description, size: 20, font: 'Garamond' }),
      ],
    }),
  ]);

  // Education
  const eduSection = [
    new Paragraph({
      spacing: { after: 50 },
      children: [
        new TextRun({
          text: profileData.education.university,
          bold: true,
          size: 22,
          font: 'Garamond',
        }),
        new TextRun({
          text: `\t${profileData.geo_info.city}, ${profileData.geo_info.state}, ${profileData.education.end_date}`,
          size: 20,
          font: 'Garamond',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: `${profileData.education.branch}, Grade: ${profileData.education.grade}`,
          size: 20,
          font: 'Garamond',
        }),
      ],
    }),
  ];

  // Certifications
  const certSection = profileData.certifications.map(
    (cert: any) =>
      new Paragraph({
        children: [
          new TextRun({ text: '• ', bold: true, size: 22 }),
          new ExternalHyperlink({
            link: cert.url,
            children: [
              new TextRun({
                text: cert.name,
                style: 'Hyperlink',
                font: 'Garamond',
                size: 20,
              }),
            ],
          }),
          new TextRun({
            text: ` — ${cert.description}`,
            size: 20,
          }),
        ],
      })
  );
  // Build final doc
  const doc = new Document({
    sections: [
      {
        children: [
          name,
          contact,
          divider,
          sectionHeader('Work Experience'),
          ...experienceSections,
          divider,
          sectionHeader('Skills'),
          skillsParagraph,
          divider,
          sectionHeader('Projects'),
          ...projectsParagraphs,
          divider,
          sectionHeader('Education'),
          ...eduSection,
          divider,
          sectionHeader('Certifications'),
          ...certSection,
        ],
      },
    ],
  });

  return doc;
}

// Save
// Packer.toBuffer(doc).then((buffer) => {
//   fs.writeFileSync('resume_dynamic.docx', buffer);
//   console.log('✅ Dynamic resume generated: resume_dynamic.docx');
// });
