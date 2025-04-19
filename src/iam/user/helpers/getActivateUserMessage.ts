import * as path from 'path';
import * as fs from 'fs';

export const getActivateUserMessage = async (args: {
  email: string;
  activateUrl: string;
  activateUserTokenExpiresIn: number;
  logoUrl?: string;
}) => {
  const { email, activateUrl, activateUserTokenExpiresIn } = args;

  const templatePath = path.join(
    process.cwd(),
    'message-templates',
    'accountActivation.html',
  );

  let emailTemplate = await fs.readFileSync(templatePath, 'utf8');

  const expiresInHours = Math.floor(activateUserTokenExpiresIn / 3600);
  const currentDate = new Date();
  const expiresDate = new Date(
    currentDate.getTime() + activateUserTokenExpiresIn * 1000,
  );
  const formattedExpiresDate = expiresDate.toLocaleString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const currentYear = String(currentDate.getFullYear());

  emailTemplate = emailTemplate
    .replace(/{{email}}/g, email)
    .replace(/{{activateUrl}}/g, activateUrl)
    .replace(/{{expiresInHours}}/g, expiresInHours.toString())
    .replace(/{{formattedExpiresDate}}/g, formattedExpiresDate.toString())
    .replace(/{{currentYear}}/g, currentYear);

  return emailTemplate;
};
