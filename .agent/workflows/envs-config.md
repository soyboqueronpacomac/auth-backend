---
description: Genera una configuración robusta de variables de entorno usando Zod y Dotenv
---

Este workflow crea un archivo `src/config/envs.config.ts` que valida las variables de entorno en tiempo de ejecución.

### Requisitos

Asegúrate de tener instaladas las dependencias:

```bash
bun add zod dotenv
```

### Pasos

1. Crea el archivo `src/config/envs.config.ts`.
2. Copia el siguiente contenido:

```typescript
import 'dotenv/config';
import { z } from 'zod';

const envsSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  ALLOWED_ORIGINS: z.preprocess(
    (val) => (typeof val === 'string' ? val.split(',') : val),
    z.array(z.string()).default(['http://localhost:4200']),
  ),
  // Añade aquí más variables según el proyecto
});

const { success, data, error } = envsSchema.safeParse(process.env);

if (!success) {
  console.error('❌ Invalid environment variables configuration:');
  console.error(JSON.stringify(error.format(), null, 2));
  process.exit(1);
}

export const envs = data;
```

3. Úsalo en tu `main.ts`:

```typescript
import { envs } from './config/envs.config';
// ...
await app.listen(envs.PORT);
```
