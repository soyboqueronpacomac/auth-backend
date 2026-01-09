import 'dotenv/config';
import { z } from 'zod';

/**
 * Esquema de validación para las variables de entorno.
 * Utiliza Zod para asegurar que todas las variables necesarias estén presentes
 * y tengan el formato correcto antes de que la aplicación inicie.
 */
const envsSchema = z.object({
  // Servidor
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Base de Datos
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),

  // Seguridad y JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('2h'),

  // Frontend URL para CORS
  FRONTEND_URL: z.string().url().default('http://localhost:4200'),

  ALLOWED_ORIGINS: z.preprocess(
    (val) => (typeof val === 'string' ? val.split(',') : val),
    z.array(z.string()).default(['http://localhost:4200']),
  ),
});

// Validamos las variables de entorno
const { success, data, error } = envsSchema.safeParse(process.env);

if (!success) {
  console.error('❌ Invalid environment variables configuration:');
  console.error(JSON.stringify(error.format(), null, 2));
  process.exit(1);
}

// Al exportar el 'data' de un safeParse exitoso, TypeScript ya sabe el tipo exacto
export const envs = data;
