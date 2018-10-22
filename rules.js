var rules = [
  {
    msg: 'SQL use of sleep function in HTTP header - likely SQL injection attempt',
    http_header: true,
    http_uri: false,
    contents: [
      {
        name: 'User-Agent',
        value: 'sleep(',
      },
    ],
    id: '38993',
  },
  {
    msg: 'SERVER-IIS *.idc attempt',
    http_header: false,
    http_uri: true,
    contents: ['/*.idc'],
    id: '973',
  },
  {
    msg: 'SERVER-WEBAPP rwwwshell.pl access',
    http_header: false,
    http_uri: true,
    contents: ['/rwwwshell.pl'],
    id: '834',
  },
  {
    msg: 'SERVER-WEBAPP uploader.exe access',
    http_header: false,
    http_uri: true,
    contents: ['/uploader.exe'],
    id: '837',
  },
  {
    msg: 'SERVER-OTHER Microsoft Frontpage services.cnf access',
    http_header: false,
    http_uri: true,
    contents: ['/_vti_pvt/services.cnf'],
    id: '961',
  },
  {
    msg: 'SERVER-IIS cmd.exe access',
    http_header: false,
    http_uri: true,
    contents: ['cmd.exe'],
    id: '1002',
  },
  {
    msg: 'SERVER-WEBAPP /etc/passwd file access attempt',
    http_header: false,
    http_uri: true,
    contents: ['/etc/passwd'],
    id: '1122',
  },
  {
    msg: 'SERVER-WEBAPP Phorum admin access',
    http_header: false,
    http_uri: true,
    contents: ['/admin.php3'],
    id: '1134',
  },
];

module.exports = rules;

