const express = require('express')
const connectDB = require('./database/db')
const app = express()
const PORT = 3000;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
connectDB();

const routes = require('./routes/index')

app.use(express.json())


// Middleware to set headers for all routes
app.use((req, res, next) => {
	// Set headers to allow all origins (CORS example)
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// folder where to save photo
		cb(null, './uploads'); 
	},
	filename: (req, file, cb) => {
		// get extenstion
		const fileExtension = path.extname(file.originalname); 
		// give name as timestamp.extenstion
		cb(null, `${Date.now()}${fileExtension}`);
	},
});
const upload = multer({ storage });


app.post('/api/upload', upload.single('image'), (req, res) => {
	const imageUrl = req.file.filename;
	res.json({ imageUrl: imageUrl });
});


app.get('/api/download', (req, res) => {
	const filename = req.query.filename
	console.log(filename)
	if (!filename) {
		return res.send({ error: true, message: 'filename is required' })
	}

	const fileData = fs.readFileSync('./uploads/' + filename);
	res.setHeader('Content-Type', 'image/jpeg');
	res.status(200).send(fileData);
});


app.use('/api', routes)


app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})