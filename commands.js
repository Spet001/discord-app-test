import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

// Comando para o Faceless bot
const FACELESS_COMMAND = {
  name: 'faceless',
  description: 'Envia uma mensagem engraçada e aleatória do Faceless.',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [FACELESS_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
