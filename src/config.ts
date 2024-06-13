const node_env = process.env.NODE_ENV;
const prisma_url = process.env.POSTGRES_PRISMA_URL + (node_env === 'development' ? '' : '?sslmode=require');

export const {
   NODE_ENV,   DISCORD_CLIENT_SECRET,
   DISCORD_CLIENT_ID,
   ALLOWED_CHANEL_ID,
   OPENAI_API_KEY,
   POSTGRES_PRISMA_URL,
}: { [key: string]: string } = { ...process.env, POSTGRES_PRISMA_URL: prisma_url };
