const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SECRET);

async function googleVerify(token) {

    console.log("GOOGLE VERIFY - Token recibido:", token);

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_ID
        });

        const payload = ticket.getPayload();

        console.log("GOOGLE VERIFY - Payload recibido:", payload);

        const { name, email, picture } = payload;

        return { name, email, picture };

    } catch (error) {
        console.log("GOOGLE VERIFY - ERROR al verificar token:", error);
        throw new Error("Token no válido");
    }
}

module.exports = {
    googleVerify
};
