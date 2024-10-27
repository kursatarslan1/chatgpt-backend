// index.js
const express = require('express');
const config = require('./config/config');

const app = express();
app.use(express.json());


// import routes:
const chatRoutes = require('./modules/chat/chat.routes');

// set routes:
app.use('/api/chat', chatRoutes);

app.listen(config.PORT, () => {
    console.log(`Sunucu http://localhost:${config.PORT} adresinde çalışıyor`);
});
