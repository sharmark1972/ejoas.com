export interface SiteConfig {
  slug: string;
  domain: string;
  name: string;
  shortName: string;
  description: string;
  dbEnvVar: string;
  smtpUserEnvVar: string;
  smtpPassEnvVar: string;
  smtpFromEnvVar: string;
  r2BucketEnvVar: string;
  r2PublicUrlEnvVar: string;
  nextauthSecretEnvVar: string;
}

const sites: Record<string, SiteConfig> = {
  ejoas: {
    slug: 'ejoas',
    domain: 'ejoas.com',
    name: 'European Journal of Agricultural Sciences',
    shortName: 'EJOAS',
    description: 'Agricultural Sciences Research',
    dbEnvVar: 'DATABASE_URL_EJOAS',
    smtpUserEnvVar: 'SMTP_USER_EJOAS',
    smtpPassEnvVar: 'SMTP_PASS_EJOAS',
    smtpFromEnvVar: 'SMTP_FROM_EJOAS',
    r2BucketEnvVar: 'R2_BUCKET_EJOAS',
    r2PublicUrlEnvVar: 'R2_PUBLIC_URL_EJOAS',
    nextauthSecretEnvVar: 'NEXTAUTH_SECRET_EJOAS',
  },
};

const DEV_SITE_SLUG = 'ejoas';

export function getSiteConfig(slug: string): SiteConfig | null {
  return sites[slug] ?? null;
}

export function getSiteConfigByDomain(host: string): SiteConfig | null {
  const domain = host.split(':')[0];

  for (const site of Object.values(sites)) {
    if (site.domain === domain) return site;
  }

  if (domain === 'localhost' || domain === '127.0.0.1') {
    return sites[DEV_SITE_SLUG];
  }

  return null;
}

export function getAllSites(): SiteConfig[] {
  return Object.values(sites);
}
