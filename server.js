const express = require("express");
const { status } = require("minecraft-server-util");
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your server's IP and port
const SERVER_IP = "warriorsunited.aternos.me";  // e.g., "192.168.1.100"
const SERVER_PORT = 61843;  // Default Bedrock port

// Define the API route to query the server status
app.get("/server-status", async (req, res) => {
  try {
    const result = await status(SERVER_IP, SERVER_PORT, { timeout: 5000, enableSRV: true });

    res.json({
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      version: result.version.name,
      motd: result.motd.clean,
      latency: result.latency,
      uptime: result.uptime,  // If your server sends uptime data (not always available)
    });
  } catch (error) {
    res.json({
      online: false,
      error: error.message,
    });
  }
});

// Serve static files (like HTML, CSS)
app.use(express.static("public"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
