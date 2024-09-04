import express from 'express';
import userRoutes from './routes/userRoutes.js';
import multer from 'multer';
import categoriesRoutes from './routes/categoriesRoutes.js';
import cakesRoutes from './routes/cakesRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware untuk parsing JSON
const storage = multer.diskStorage({
  destination: function(req, file, cb)  {
    return cb(null, '../frontend/public/images');
  },
  filename: function (req, file, cb)  {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());


// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', 
}));

// Menggunakan routes untuk user
app.use("/api/", userRoutes);

// Menggunakan routes untuk kategori
app.use('/api/categories', categoriesRoutes);

// Menggunakan routes untuk kue
app.use('/api/cakes', cakesRoutes);

app.post('/api/upload',upload.single('file'),(req, res) => {
  console.log(req.file);
  res.json({ message: 'File uploaded successfully', file: req.file });
})

// Menggunakan routes untuk orser
app.use('/api/orders', orderRoutes);

//Menjalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
