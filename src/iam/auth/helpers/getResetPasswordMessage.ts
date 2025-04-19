import * as path from 'path';
import * as fs from 'fs';

export const getRessetPasswordMessage = async (args: {
  resetUrl: string;
  resetTokenExpiresIn: number;
  logoUrl?: string;
}) => {
  const { resetUrl, resetTokenExpiresIn } = args;

  const templatePath = path.join(
    process.cwd(),
    'message-templates',
    'passwordReset.html',
  );

  let emailTemplate = await fs.readFileSync(templatePath, 'utf8');

  const expirationHours = Math.floor(resetTokenExpiresIn / 60 / 60);
  const currentYear = new Date().getFullYear();

  emailTemplate = emailTemplate
    .replace(/{{logoUrl}}/g, 'LOGO_URL')
    .replace(/{{resetUrl}}/g, resetUrl)
    .replace(/{{expirationHours}}/g, expirationHours.toString())
    .replace(/{{currentYear}}/g, currentYear.toString());

  return emailTemplate;
};
