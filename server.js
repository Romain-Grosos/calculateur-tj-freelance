const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/save-config', (req, res) => {
    const id = uuidv4();
    const configData = req.body;
    try {
        if (configData.type === 'amount') {
            // Créer un dossier pour cette configuration de montants
            fs.mkdirSync(`./configs/${id}`);
            fs.writeFileSync(`./configs/${id}/amount.json`, JSON.stringify(configData));
        } else if (configData.type === 'slide') {
            const slideId = uuidv4();
            fs.writeFileSync(`./configs/${configData.amountId}/${slideId}.json`, JSON.stringify(configData));
            return res.json({ success: true, id: configData.amountId, slide: slideId });
        }
    } catch(err) {
        console.error(err);
        return res.status(500).send('Server error');
    }

    res.json({ success: true, id: id });
});

app.get('/load-config/:id/:type', (req, res) => {
    const uniqueId = req.params.id;
    const type = req.params.type;

    fs.readFile(path.join(__dirname, 'configs', uniqueId, `${type}.json`), 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('Configuration not found');
            }
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.json(JSON.parse(data));
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});