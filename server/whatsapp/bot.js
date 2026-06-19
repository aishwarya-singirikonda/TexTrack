const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
} = require("@whiskeysockets/baileys");

const qrcode = require("qrcode-terminal");
const pino = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(
    "./whatsapp/session"
  );

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {
    if (qr) {
      console.log("\nScan this QR with WhatsApp:\n");

      qrcode.generate(qr, {
        small: true,
      });
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Bot Connected!");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        startBot();
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    const msg = messages[0];

    if (!msg.message) return;

    if (msg.key.fromMe) return;

    const sender = msg.key.remoteJid;

    let text = "";

    if (msg.message.conversation) {
      text = msg.message.conversation;
    } else if (msg.message.extendedTextMessage?.text) {
      text = msg.message.extendedTextMessage.text;
    }

    text = text.trim().toLowerCase();

    console.log("Message:", text);

    if (text === "hi" || text === "hello") {
      await sock.sendMessage(sender, {
        text:
          "👋 Welcome to SN Textiles\n\n" +
          "1️⃣ Men Wear\n" +
          "2️⃣ Women Wear\n" +
          "3️⃣ Kids Wear\n\n" +
          "Reply with a number.",
      });

      console.log("Reply sent");
    }
  });
}

module.exports = startBot;