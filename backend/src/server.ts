import 'dotenv/config';
import { server, connectToDatabase } from './app';
import { PORT, NODE_ENV } from './config';
import cluster from 'cluster';
import os from 'os';

const startServer = async () => {
  // Conectar ao banco de dados
  await connectToDatabase();

  // Iniciar o servidor
  server.listen(PORT, () => {
    console.log(`
      🚀 Server running in ${NODE_ENV} mode
      📡 Listening on port ${PORT}
      ⏰ ${new Date().toLocaleString()}
      🖥️  PID: ${process.pid}
    `);
  });

  // Tratamento de erros não capturados
  process.on('unhandledRejection', (err: Error) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
  });

  process.on('uncaughtException', (err: Error) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
};

// Modo Cluster para produção
if (NODE_ENV === 'production' && cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`🔄 Starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`⚠️ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  startServer().catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });
}
