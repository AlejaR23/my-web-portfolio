import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function autoPersistImagesPlugin(): Plugin {
  return {
    name: 'auto-persist-images',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const dataDir = path.resolve(__dirname, 'src/data');
              if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
              const logFile = path.resolve(dataDir, 'contact_messages.json');
              let messages: any[] = [];
              if (fs.existsSync(logFile)) {
                try {
                  messages = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
                } catch {}
              }
              messages.push({
                ...data,
                receivedAt: new Date().toISOString(),
              });
              fs.writeFileSync(logFile, JSON.stringify(messages, null, 2));
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ ok: true, savedLocally: true }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/save-image' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { identifier, dataUrl } = JSON.parse(body);
              if (identifier && dataUrl && typeof dataUrl === 'string' && dataUrl.startsWith('data:image')) {
                const match = dataUrl.match(/^data:image\/([a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
                if (match) {
                  let ext = match[1];
                  if (ext === 'jpeg') ext = 'jpg';
                  if (ext === 'svg+xml') ext = 'svg';
                  const base64Data = match[2];
                  const buffer = Buffer.from(base64Data, 'base64');
                  const cleanName = identifier.replace(/^ar_slot_/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
                  const filename = `${cleanName}.${ext}`;

                  const publicDir = path.resolve(__dirname, 'public/uploads');
                  const srcDir = path.resolve(__dirname, 'src/assets/uploads');
                  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
                  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

                  fs.writeFileSync(path.join(publicDir, filename), buffer);
                  fs.writeFileSync(path.join(srcDir, filename), buffer);

                  const manifestPath = path.resolve(__dirname, 'src/data/uploadedManifest.json');
                  let manifest: Record<string, string> = {};
                  try {
                    if (fs.existsSync(manifestPath)) {
                      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                    }
                  } catch {}
                  manifest[identifier] = `/uploads/${filename}`;
                  manifest[cleanName] = `/uploads/${filename}`;

                  // Sincronización automática de alias conocidos para Tazza y Kiem
                  if (cleanName === 'tazza-cafe' || cleanName === 'SLOT-06' || cleanName === 'tazza-cafe_cover' || cleanName === 'SLOT-06-tazza-cafe') {
                    const tazzaAliases = ['SLOT-06-tazza-cafe.png', 'SLOT-06.png', 'tazza-cafe.png', 'tazza-cafe_cover.png'];
                    for (const alias of tazzaAliases) {
                      fs.writeFileSync(path.join(publicDir, alias), buffer);
                      fs.writeFileSync(path.join(srcDir, alias), buffer);
                      manifest[alias.replace(/\.[^.]+$/, '')] = `/uploads/${alias}`;
                    }
                  } else if (cleanName === 'kiem-university' || cleanName === 'SLOT-07' || cleanName === 'kiem-university_cover' || cleanName === 'SLOT-07-kiem-university') {
                    const kiemAliases = ['SLOT-07-kiem-university.png', 'SLOT-07.png', 'kiem-university.png', 'kiem-university_cover.png'];
                    for (const alias of kiemAliases) {
                      fs.writeFileSync(path.join(publicDir, alias), buffer);
                      fs.writeFileSync(path.join(srcDir, alias), buffer);
                      manifest[alias.replace(/\.[^.]+$/, '')] = `/uploads/${alias}`;
                    }
                  }

                  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, filename, path: `/uploads/${filename}` }));
                  return;
                }
              }
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid payload' }));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), autoPersistImagesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
