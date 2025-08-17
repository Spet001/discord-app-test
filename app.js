import 'dotenv/config';
import express from 'express';
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { DiscordRequest } from './utils.js';
import fs from 'fs';
import path from 'path';

// Criar um aplicativo expresso
const app = express();
// Obter porta ou padrão para 3000
const PORT = process.env.PORT || 3000;

/**
 * Endpoint de interações onde o Discord enviará solicitações HTTP
 * Analise o corpo da solicitação e verifique as solicitações recebidas usando o pacote discord-interactions
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Tipo e dados da interação
  const { type, data } = req.body;

  /**
   * Lidar com solicitações de verificação
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Lidar com solicitações de comando de barra
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // comando "faceless"
    if (name === 'faceless') {
      const messages = [
        'EAE MANO BLZ',
        'GUZAAAAAAAA',
        'JOGOS USADOS BARATOS GUZHADOS SÓ NA FACELESSGAMES.COM.BR',
        'FACELESSGAMES.COM.BR MELHOR PIOR LOJA DA AMAZONIA!!!',
        'UUUUUUURRR PRA CIMA AONDE???',
        'GUZZZZZZEI',
        'UUUUUR MANO BLZ MANO BLZ',
        'BLZ MANO BLZ',
        'DAAAAAL UMA CHUOPADINHAAAAAAA',
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      // Verifica aleatoriamente se deve enviar uma imagem
      if (Math.random() < 0.2) { // 20% de chance de enviar uma imagem
        const assetsDir = path.join(process.cwd(), 'assets');
        const imageFiles = fs.readdirSync(assetsDir).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        if (imageFiles.length > 0) {
          const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
          // A funcionalidade de enviar a imagem ainda precisa ser implementada
          // Por enquanto, apenas enviaremos o nome do arquivo junto com a mensagem
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${randomMessage}\nImagem: ${randomImage}`,
            },
          });
        }
      }

      // Envia uma mensagem aleatória
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: randomMessage,
        },
      });
    }

    console.error(`comando desconhecido: ${name}`);
    return res.status(400).json({ error: 'comando desconhecido' });
  }

  console.error('tipo de interação desconhecido', type);
  return res.status(400).json({ error: 'tipo de interação desconhecido' });
});

app.listen(PORT, () => {
  console.log('Ouvindo na porta', PORT);
});
