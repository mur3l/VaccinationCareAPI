const { db } = require("../db");
const bcrypt = require("bcrypt");

exports.newSession = async (req, res) => {
  const { LoginEmail, LoginPassword } = req.body;

  if (!LoginEmail || !LoginPassword) {
    return res.status(400).json({ error: "Missing LoginEmail or LoginPassword" });
  }

  try {
    const client = await db.client.findOne({
      where: { EmailAddress: LoginEmail }
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const ok = await bcrypt.compare(LoginPassword, client.PasswordHASH);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    req.session.ClientID = client.ClientID;

    return res.status(200).json({
      ok: true,
      user: {
        ClientID: client.ClientID,
        EmailAddress: client.EmailAddress,
        FullName: client.FullName
      }
    });

  } catch (error) {
    console.error("Session creation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.reauthenticate = async (req, res) => {
  if (!req.session?.ClientID) {
    return res.status(401).json({ error: "Session expired, please log in again." });
  }

  try {
    const client = await db.client.findByPk(req.session.ClientID); // <-- db.client (mitte db.clients)
    if (!client) {
      return res.status(401).json({ error: "Logged in client not found, please log in again." });
    }

    return res.status(200).json({
      ok: true,
      user: {
        ClientID: client.ClientID,
        EmailAddress: client.EmailAddress,
        FullName: client.FullName
      }
    });

  } catch (error) {
    console.error("Reauthentication error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeSession = async (req, res) => {
  if (!req.session?.ClientID) {
    return res.status(401).json({ error: "User is not logged in" });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).json({ error: "Server error" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ ok: true });
  });
};
