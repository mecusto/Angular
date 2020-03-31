"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://angular-login-project.firebaseio.com"
});
const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// compilar automáticamente typescript: tsc --watch
// firebase/deploy en el directorio raiz (backend)
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.json("Hello from Firebase!!!!");
});
exports.getGOTY = functions.https.onRequest(async (request, response) => {
    // const nombre = request.query.nombre || 'Sin nombre';
    const gotyRef = db.collection('goty');
    // referencia a como se encuentra la base de datos en este momento
    const docsSnap = await gotyRef.get();
    // la información de los registros está en: docSnap.docs[i].data()
    const juegos = docsSnap.docs.map(doc => doc.data());
    response.json(juegos);
});
// servidor express:
// npm install express cors (dentro de functions)
const app = express();
app.use(cors({ origin: true }));
app.get('/goty', async (req, res) => {
    const gotyRef = db.collection('goty');
    // referencia a como se encuentra la base de datos en este momento
    const docsSnap = await gotyRef.get();
    // la información de los registros está en: docSnap.docs[i].data()
    const juegos = docsSnap.docs.map(doc => doc.data());
    res.json(juegos);
});
// postear un voto a un juego
app.post('/goty/:id', async (req, res) => {
    const { id } = req.params;
    const gameRef = db.collection('goty').doc(id);
    const gameSnap = await gameRef.get();
    if (!gameSnap.exists) {
        res.status(404).json({
            ok: false,
            mensaje: 'No existe un juego con ese Id ' + id
        });
    }
    else {
        const antes = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: antes.votos + 1
        });
        res.json({
            ok: true,
            mensaje: `Gracias por tu voto a ${antes.name}!`
        });
    }
});
// es lo mismo: 
// exports.api = functions.https.onRequest(app);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map