// Serve different static HTML pages for different paths (/service, /contact, /about) using a common folder and sendFile()
const express = require('express');
const app = express();
const path  =  require('path');
app.get('/services',(req,res)=>{
    res.sendFile(path.join(__dirname,'./services.html'));
})
app.get('/contact',(req,res)=>{
 res.sendFile(path.join(__dirname,'./contact.html'));
})
app.get('/about',(req,res)=>{
 res.sendFile(path.join(__dirname,'./about.html'));
})
app.use((req,res)=>{
    res.send('not valid');
})
app.listen(3000,(error)=>{
 console.log('server started at 3000' );
})


// Serve a fully functional static website (HTML + CSS + image + JS)
const express = require('express');
const path = require('path');
const app = express();
 
app.get('/index',(req,res)=>{
 res.sendFile(path.join(__dirname,'./index.html'));
})
app.get('/style',(req,res)=>{
 res.sendFile(path.join(__dirname,'./style.css'));
})
app.get('/main',(req,res)=>{
 res.sendFile(path.join(__dirname,'./main.js'));
})
app.use((req,res)=>{
  res.end('not valid');
})

app.listen(3000,()=>{
    console.log('Server2 Started at 3000');
})


// Serve a static HTML page using Express from a public directory.
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.status(404).send('not valid');
});

app.listen(3000, () => {
  console.log('server started at http://localhost:3000');
});


// Create a static route /greet that responds differently based on the value of the lang query parameter.
const express = require('express');
const app = express();

const greetings = {
  en: 'Hello',
  fr: 'Bonjour',
  hi: 'Namaste'
};

app.get('/greet', (req, res) => {
  const lang = req.query.lang;
  const message = greetings[lang] || 'Hello (Default)';
  res.send(message);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});


// Use dynamic route parameters to simulate viewing blog posts.
const express = require('express');

const app = express();

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

app.get('/user/:id',(req,res)=>{
  const userid = req.params.id;
  const user = users.find(u=> u.id=== userid);
   if(user){
    res.json(user);
   }
   else{
    res.status(404).json({message: "not found"});
   }
});

app.listen(3000,()=>{
 console.log('server started at 3000')
});


// Express - Create a dynamic route to display a users profile based on their user ID.
const express = require('express');
const app = express();
const port = 3000;

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Build a modular Express.js application with separate route files for handling user-related requests.
const express = require('express');
const router = express.Router();

const users = [
  { id: '101', name: 'Alice', age: 25 },
  { id: '102', name: 'Bob', age: 30 },
  { id: '103', name: 'Charlie', age: 22 }
];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

module.exports = router;


// Build a modular route structure for a small blog system.
const express = require('express');
const router = express.Router();

const comments = [
  { id: '1', postId: '1', text: 'Great post!' },
  { id: '2', postId: '1', text: 'Thanks for sharing!' },
  { id: '3', postId: '2', text: 'Very informative.' }
];

router.get('/', (req, res) => {
  res.json(comments);
});

router.get('/:commentId', (req, res) => {
  const comment = comments.find(c => c.id === req.params.commentId);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(comment);
});

module.exports = router;


// Use dynamic routing and route parameters to fetch product information.
const express = require('express');
const router = express.Router();

const comments = [
  { id: '1', postId: '1', text: 'Great post!' },
  { id: '2', postId: '1', text: 'Thanks for sharing!' },
  { id: '3', postId: '2', text: 'Very informative.' }
];

router.get('/', (req, res) => {
  res.json(comments);
});

router.get('/:commentId', (req, res) => {
  const comment = comments.find(c => c.id === req.params.commentId);
  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  res.json(comment);
});

module.exports = router;


// Serve files such as images, CSS, or JS from a folder without Express.
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!');
  } 
  else if (req.url.startsWith('/public/')) {
    const filePath = path.join(__dirname, req.url);
    const ext = path.extname(filePath);

    let contentType = 'text/plain';
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'text/javascript';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.html') contentType = 'text/html';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 File Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});


// Simulate a basic API with in-memory storage.
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let notes = [];

app.post('/notes', (req, res) => {
  if (!req.body || typeof req.body.note !== 'string') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  notes.push(req.body.note);
  res.status(201).json({ message: 'Note added' });
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Manage different request methods for the same path.  GET and POST Handling
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
  res.send(`
    <form method="POST" action="/form">
      <label>Name: <input type="text" name="name" required></label><br>
      <label>Email: <input type="email" name="email" required></label><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/form', (req, res) => {
  const { name, email } = req.body;
  res.send(`Thank you, ${name}. Your email is ${email}.`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Handle dynamic values using query strings in the URL.
const express = require('express');
const app = express();
const port = 3000;

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Redirect Based on Time Demonstrate conditional logic in routing.
const express = require('express');
const app = express();
const port = 3000;

app.get('/time-check', (req, res) => {
  const hour = new Date().getHours();
  if (hour < 12) {
    res.writeHead(302, { Location: '/morning' });
  } else {
    res.writeHead(302, { Location: '/evening' });
  }
  res.end();
});

app.get('/morning', (req, res) => {
  res.send('Good Morning!');
});

app.get('/evening', (req, res) => {
  res.send('Good Evening!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Respond with Different Content Types. Practice sending data in multiple formats based on request path.
const express = require('express');
const app = express();
const port = 3000;

app.get('/data.html', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1>Hello in HTML</h1><p>This is HTML format.</p>');
});

app.get('/data.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello in plain text format.');
});

app.get('/data.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Hello in JSON format' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Create an HTTP server using Node.js (with and without Express) that: 1.    Reads data from movie.json.
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

const movies = JSON.parse(fs.readFileSync('movie.json', 'utf-8'));

app.get('/movies', (req, res) => {
  const { genre, year } = req.query;

  if (!genre || !year) {
    return res.json({ message: 'Both genre and year parameters are required', data: [] });
  }

  const yearsArray = year.split(',').map(y => parseInt(y.trim(), 10));
  const filtered = movies.filter(movie =>
    movie.genre.toLowerCase() === genre.toLowerCase() &&
    yearsArray.includes(movie.year)
  );

  res.json(filtered);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Create an Express.js application that allows users to upload a single profile picture using Multer.
const { fileLoader } = require('ejs');
const express = require('express');
const path  = require('path');
const multer = ('multer');
const app = express();

const upload = multer({
   dest:"uploads",
   fileFilter: (req,file,cb)=>{
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext === ".jpg" || ext === ".png" || ext ===".png"){
        cb(null,true);

    }
    else{
        cb(new Error('only .png and .jpg file are allowed'));
    }
}
});
app.post("/upload",upload.single("profilePic"),(req,res)=>{
    if(!req.file){
        return res.status(404).send('no file  upload or file tyoe');
    }
    res.send({
        message: " file uplaod successfully",
        fileName:req.file.filename,
        filepath: "/uploads/" + req.file.filename
    });
});
app.listen(3000,()=>{
  console.log('Server started at 3000');
});


// Build an Express.js route that allows a user to upload up to 5 images at once using Multer.
const express  =require('express');
const path  = require('path');
const multer =  require('multer');
const app = express();
 
const upload = multer({
  dest:'upload/gallery',
  fileFilter: (req,file,cb)=>{
  const ext = path.extname(file.originalname).toLowerCase();
  if(ext === ".jpg" || ext === ".png" || ext === ".jpeg"){
  cb(null,true)
}
else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
}
  },
  limits:{files: 5}
});
app.post("/upload-gallery",upload.array("images",5),(req,res)=>{
    if(!req.files || req.files.length === 0){
        return res.status(404).send("no file uploads or wrong fle type!");

    }
    const fileNames = req.files.map(file=>file.filename);
    res.send({
         message: "Files uploaded successfully!",
    uploadedFiles: fileNames
    });
});

app.use((err,req,res,next)=>{
 if(err){
    return res.status(404).json({err:err.message});
 }
 next();
})

app.listen(3000,()=>{
 console.log('Server Started at 3000');
});


// Create an Express.js API where a user can submit:  File Upload with Form Data 
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const uploadDir = path.join(__dirname, "uploads", "resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

app.post("/submit", upload.single("resume"), (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone || !req.file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const submission = {
      name,
      email,
      phone,
      resumePath: req.file.path,
      submittedAt: new Date().toISOString(),
    };

    const filePath = path.join(__dirname, "submissions.json");
    let submissions = [];

    if (fs.existsSync(filePath)) {
      submissions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    submissions.push(submission);

    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

    res.status(200).json({
      message: "âœ… Submission successful",
      data: submission,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`ðŸš€ Server running on http://localhost:${PORT}`);
});


// Develop an API for uploading product images with the following rules: File Size & Type Validation
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

const uploadDir = path.join(__dirname, "uploads", "products");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single("productImage");

app.post("/upload-product", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File size cannot exceed 2 MB." });
      }
      return res.status(400).json({ error: err.message });
    }

    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    res.status(200).json({
      message: "Upload successful",
      filePath: req.file.path,
      fileSize: req.file.size + " bytes"
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// You are required to build a complete File Upload and Management REST API using Node.js, Express, and Multer that allows users to upload, validate, view, and delete their files.
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 3000;

const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);
const readdir = util.promisify(fs.readdir);
const mkdir = util.promisify(fs.mkdir);
const access = util.promisify(fs.access);

const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.pdf', '.docx'];
const FIELD_FOLDER_MAP = {
  profilePic: 'profile_pics',
  docs: 'documents',
  others: 'others'
};
const PER_FIELD_LIMITS = {
  profilePic: 2 * 1024 * 1024,
  docs: 5 * 1024 * 1024,
  others: 10 * 1024 * 1024
};
const UPLOADS_ROOT = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_ROOT)) fs.mkdirSync(UPLOADS_ROOT, { recursive: true });

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.params.userId;
      const field = file.fieldname;
      const folderName = FIELD_FOLDER_MAP[field] || 'others';
      const dest = path.join(UPLOADS_ROOT, folderName, String(userId));
      await mkdir(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const userId = req.params.userId || 'unknown';
    const original = path.basename(file.originalname).replace(/\s+/g, '_');
    const filename = `${file.fieldname}-${userId}-${Date.now()}-${original}`;
    cb(null, filename);
  }
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTS.includes(ext)) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Invalid file type'));
  }
  const allowedMimes = [
    'image/jpeg', 'image/png',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: PER_FIELD_LIMITS.others }
});

async function cleanupFiles(paths) {
  for (const p of paths) {
    try { await unlink(p); } catch (_) {}
  }
}

app.post('/upload/:userId', function (req, res) {
  const uploader = upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'docs', maxCount: 10 },
    { name: 'others', maxCount: 20 }
  ]);

  uploader(req, res, async function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE' && err.field === 'Invalid file type')
          return res.status(400).json({ message: 'Invalid file type' });
        if (err.code === 'LIMIT_FILE_SIZE')
          return res.status(400).json({ message: 'File too large (limit exceeded)' });
        if (err.code === 'LIMIT_UNEXPECTED_FILE')
          return res.status(400).json({ message: 'Unexpected field or invalid file type' });
        return res.status(400).json({ message: `Multer error: ${err.code}` });
      }
      return res.status(500).json({ message: 'Upload error', error: err.message });
    }

    const uploaded = { profilePic: null, docs: [], others: [] };
    const savedFilesFullPaths = [];
    try {
      const files = req.files || {};
      function registerFile(file) {
        const relative = path.relative(__dirname, file.path).split(path.sep).join('/');
        const publicPath = relative.startsWith('uploads/') ? relative : path.join('uploads', relative).split(path.sep).join('/');
        savedFilesFullPaths.push(file.path);
        return publicPath;
      }

      if (files.profilePic && files.profilePic.length > 0) {
        const f = files.profilePic[0];
        if (f.size > PER_FIELD_LIMITS.profilePic) {
          await cleanupFiles(savedFilesFullPaths);
          return res.status(400).json({ message: 'profilePic exceeds 2 MB limit' });
        }
        uploaded.profilePic = registerFile(f);
      }

      if (files.docs && files.docs.length > 0) {
        for (const f of files.docs) {
          if (f.size > PER_FIELD_LIMITS.docs) {
            await cleanupFiles(savedFilesFullPaths);
            return res.status(400).json({ message: `One of the docs exceeds ${PER_FIELD_LIMITS.docs / (1024 * 1024)} MB limit` });
          }
          uploaded.docs.push(registerFile(f));
        }
      }

      if (files.others && files.others.length > 0) {
        for (const f of files.others) {
          if (f.size > PER_FIELD_LIMITS.others) {
            await cleanupFiles(savedFilesFullPaths);
            return res.status(400).json({ message: `One of the others exceeds ${PER_FIELD_LIMITS.others / (1024 * 1024)} MB limit` });
          }
          uploaded.others.push(registerFile(f));
        }
      }

      return res.json({ message: 'Files uploaded successfully!', uploaded });
    } catch (e) {
      await cleanupFiles(savedFilesFullPaths);
      return res.status(500).json({ message: 'Server error during upload', error: e.message });
    }
  });
});

app.get('/files/:userId', async (req, res) => {
  const userId = String(req.params.userId);
  const folders = Object.values(FIELD_FOLDER_MAP);
  const resultFiles = [];

  try {
    for (const folder of folders) {
      const userFolder = path.join(UPLOADS_ROOT, folder, userId);
      try { await access(userFolder, fs.constants.R_OK); } catch (_) { continue; }
      const items = await readdir(userFolder);
      for (const item of items) {
        const full = path.join(userFolder, item);
        const s = await stat(full);
        if (s.isFile()) {
          const rel = path.relative(__dirname, full).split(path.sep).join('/');
          resultFiles.push(rel.startsWith('uploads/') ? rel : path.join('uploads', rel).split(path.sep).join('/'));
        }
      }
    }
    return res.json({ userId, files: resultFiles });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
});

app.delete('/delete/:userId/:filename', async (req, res) => {
  const { userId, filename } = req.params;
  const folders = Object.values(FIELD_FOLDER_MAP);
  try {
    for (const folder of folders) {
      const candidate = path.join(UPLOADS_ROOT, folder, String(userId), filename);
      try {
        await access(candidate, fs.constants.F_OK);
        await unlink(candidate);
        return res.json({ message: 'File deleted successfully!' });
      } catch (_) {}
    }
    return res.status(404).json({ message: 'File not found' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE')
      return res.status(400).json({ message: 'File too large (global limit)' });
    if (err.code === 'LIMIT_UNEXPECTED_FILE')
      return res.status(400).json({ message: 'Invalid file type or unexpected field' });
    return res.status(400).json({ message: `Multer error: ${err.code}` });
  }
  console.error(err);
  return res.status(500).json({ message: 'Server error', error: err.message });
});

app.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const folders = await readdir(UPLOADS_ROOT);
    for (const folder of folders) {
      const subfolders = await readdir(path.join(UPLOADS_ROOT, folder));
      for (const sub of subfolders) {
        const candidate = path.join(UPLOADS_ROOT, folder, sub, filename);
        try {
          await access(candidate, fs.constants.R_OK);
          return res.download(candidate);
        } catch (_) {}
      }
    }
    return res.status(404).json({ message: 'File not found' });
  } catch (err) {
    return res.status(500).json({ message: 'Error while searching for file', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`FileManager server running on http://localhost:${PORT}`);
  console.log(`Uploaded files served at http://localhost:${PORT}/uploads/...`);
});


// Express Session - Basic Authentication and Role-based Redirection - User Story 1    As a user of the web application, user want to log in with a username and password so that user can be authenticated and redirected to user's respective role page (adminhome or userhome).
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 } // 30 min session
  })
);

const usersFile = path.join(__dirname, "user.json");

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = {
      username: user.username,
      loginTime: new Date().toISOString(),
      role: user.role
    };

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res.status(401).send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", (req, res) => {
  if (req.session.user && req.session.user.role === "admin") {
    res.send(`<h2>Welcome Admin: ${req.session.user.username}</h2>
              <p>Login Time: ${req.session.user.loginTime}</p>
              <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/userhome", (req, res) => {
  if (req.session.user && req.session.user.role === "user") {
    res.send(`<h2>Welcome User: ${req.session.user.username}</h2>
              <p>Login Time: ${req.session.user.loginTime}</p>
              <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("You have been logged out. <a href='/'>Login again</a>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Express Session - Session Persistence and Profile Access - User Story 2    As a logged-in user, user now want to access a protected profile route so that user can view his own session information.
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 } // 30 minutes
  })
);

const usersFile = path.join(__dirname, "user.json");

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// Middleware for protecting routes
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = {
      username: user.username,
      loginTime: Date.now(),
      role: user.role
    };

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res.status(401).send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "admin") {
    res.send(`<h2>Welcome Admin: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/profile">Go to Profile</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/userhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "user") {
    res.send(`<h2>Welcome User: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/profile">Go to Profile</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

// âœ… Protected Profile Route
app.get("/profile", authMiddleware, (req, res) => {
  const user = req.session.user;
  const timeSinceLogin = Math.floor((Date.now() - user.loginTime) / 1000); // seconds

  res.send(`
    <h2>Profile Page</h2>
    <p><b>Username:</b> ${user.username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>Session ID:</b> ${req.sessionID}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Express Session - Session Expiration and Cleanup - User Story 3    As a system, system want to automatically handle session expiration so that users are logged out after a period of time.
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SESSION_TIMEOUT = 1000 * 60 * 30; // 30 minutes

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: SESSION_TIMEOUT }
  })
);

const usersFile = path.join(__dirname, "user.json");

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// âœ… Middleware to check session + expiration
function authMiddleware(req, res, next) {
  if (req.session.user) {
    const now = Date.now();
    if (now - req.session.user.loginTime > SESSION_TIMEOUT) {
      req.session.destroy(() => {
        res.send("âš ï¸ Session expired. <a href='/'>Login again</a>");
      });
    } else {
      next();
    }
  } else {
    res.redirect("/");
  }
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = {
      username: user.username,
      loginTime: Date.now(),
      role: user.role
    };

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res.status(401).send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "admin") {
    res.send(`<h2>Welcome Admin: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/profile">Go to Profile</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/userhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "user") {
    res.send(`<h2>Welcome User: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/profile">Go to Profile</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/profile", authMiddleware, (req, res) => {
  const user = req.session.user;
  const timeSinceLogin = Math.floor((Date.now() - user.loginTime) / 1000);

  res.send(`
    <h2>Profile Page</h2>
    <p><b>Username:</b> ${user.username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>Session ID:</b> ${req.sessionID}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("âœ… You have been logged out. <a href='/'>Login again</a>");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Express Session - Role-Based Concurrent Session Management with Admin Panel - User Story 4   As an admin, admin want to view and monitor all active user sessions so that admin can manage multiple concurrent user sessions securely.
const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const SESSION_TIMEOUT = 1000 * 60 * 30; // 30 minutes

// âœ… MemoryStore to keep track of active sessions
const sessionStore = new session.MemoryStore();

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: SESSION_TIMEOUT }
  })
);

const usersFile = path.join(__dirname, "user.json");

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// Middleware to check session + expiration
function authMiddleware(req, res, next) {
  if (req.session.user) {
    const now = Date.now();
    if (now - req.session.user.loginTime > SESSION_TIMEOUT) {
      req.session.destroy(() => {
        res.send("âš ï¸ Session expired. <a href='/'>Login again</a>");
      });
    } else {
      next();
    }
  } else {
    res.redirect("/");
  }
}

// Middleware to check admin role
function adminMiddleware(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.status(403).send("âŒ Access denied. Admins only.");
  }
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = {
      username: user.username,
      loginTime: Date.now(),
      role: user.role
    };

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res.status(401).send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "admin") {
    res.send(`<h2>Welcome Admin: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/adminpanel">Go to Admin Panel</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/userhome", authMiddleware, (req, res) => {
  if (req.session.user.role === "user") {
    res.send(`<h2>Welcome User: ${req.session.user.username}</h2>
              <p>Login Time: ${new Date(req.session.user.loginTime).toLocaleString()}</p>
              <a href="/profile">Go to Profile</a> | <a href="/logout">Logout</a>`);
  } else {
    res.status(403).send("Access denied.");
  }
});

app.get("/profile", authMiddleware, (req, res) => {
  const user = req.session.user;
  const timeSinceLogin = Math.floor((Date.now() - user.loginTime) / 1000);

  res.send(`
    <h2>Profile Page</h2>
    <p><b>Username:</b> ${user.username}</p>
    <p><b>Time since login:</b> ${timeSinceLogin} seconds</p>
    <p><b>Session ID:</b> ${req.sessionID}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/adminpanel", authMiddleware, adminMiddleware, (req, res) => {
  sessionStore.all((err, sessions) => {
    if (err) return res.status(500).send("Error fetching sessions");

    let tableRows = "";
    for (const [sid, sess] of Object.entries(sessions)) {
      if (sess.user) {
        const loginTime = new Date(sess.user.loginTime).toLocaleString();
        const expiresAt = new Date(sess.user.loginTime + SESSION_TIMEOUT).toLocaleString();

        tableRows += `
          <tr>
            <td>${sess.user.username}</td>
            <td>${loginTime}</td>
            <td>${expiresAt}</td>
            <td>${sid}</td>
          </tr>`;
      }
    }

    res.send(`
      <h2>Admin Panel - Active Sessions</h2>
      <table border="1" cellpadding="5">
        <tr><th>Username</th><th>Login Time</th><th>Session Expiration</th><th>Session ID</th></tr>
        ${tableRows || "<tr><td colspan='4'>No active sessions</td></tr>"}
      </table>
      <br><a href="/adminhome">Back to Home</a>
    `);
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("âœ… You have been logged out. <a href='/'>Login again</a>");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// JWT - Token-based Authentication and Role-based Redirection User Story 1    As a user of the web application, user want to log in with his username and password so that user can receive a JWT token that authenticates him and allows access to his role-specific page (adminhome or userhome).
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mySecretJWTKey"; // should be stored securely

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const usersFile = path.join(__dirname, "user.json");

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// Middleware to check JWT
function authMiddleware(role) {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/");

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      if (role && decoded.role !== role) {
        return res.status(403).send("âŒ Access denied.");
      }
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send("âš ï¸ Invalid or expired token. <a href='/'>Login again</a>");
    }
  };
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const payload = {
      username: user.username,
      role: user.role,
      loginTime: Date.now()
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30 // 30 minutes
    });

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res.status(401).send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", authMiddleware("admin"), (req, res) => {
  res.send(`<h2>Welcome Admin: ${req.user.username}</h2>
            <p>Login Time: ${new Date(req.user.loginTime).toLocaleString()}</p>
            <a href="/logout">Logout</a>`);
});

app.get("/userhome", authMiddleware("user"), (req, res) => {
  res.send(`<h2>Welcome User: ${req.user.username}</h2>
            <p>Login Time: ${new Date(req.user.loginTime).toLocaleString()}</p>
            <a href="/logout">Logout</a>`);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("âœ… You have been logged out. <a href='/'>Login again</a>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// JWT - Admin Panel for Monitoring Active User Tokens User Story 4    As an admin, the admin wants to view and monitor all active user tokens so that the admin can manage multiple concurrent user sessions securely.
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "mySecretJWTKey"; // should be stored securely

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const usersFile = path.join(__dirname, "user.json");

// ðŸ—‚ï¸ In-memory active tokens store
let activeTokens = [];

function getUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// ðŸ” Middleware to check JWT + expiration
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.clearCookie("token");
      return res
        .status(401)
        .send("â° Your session has expired. <a href='/'>Login again</a>");
    }
    return res
      .status(401)
      .send("âš ï¸ Invalid token. <a href='/'>Login again</a>");
  }
}

app.get("/", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="Username" required /><br/>
      <input type="password" name="password" placeholder="Password" required /><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const payload = {
      username: user.username,
      role: user.role,
      loginTime: Date.now(),
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 30, // 30 minutes
    });

    // store active token with expiry
    const decoded = jwt.decode(token);
    activeTokens.push({
      username: user.username,
      token,
      iat: decoded.iat * 1000, // convert to ms
      exp: decoded.exp * 1000,
    });

    if (user.role === "admin") {
      return res.redirect("/adminhome");
    } else {
      return res.redirect("/userhome");
    }
  } else {
    return res
      .status(401)
      .send("âŒ Invalid username or password. <a href='/'>Try again</a>");
  }
});

app.get("/adminhome", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("âŒ Access denied.");
  res.send(`<h2>Welcome Admin: ${req.user.username}</h2>
            <a href="/adminpanel">Admin Panel</a><br/>
            <a href="/profile">My Profile</a><br/>
            <a href="/logout">Logout</a>`);
});

app.get("/userhome", authMiddleware, (req, res) => {
  if (req.user.role !== "user") return res.status(403).send("âŒ Access denied.");
  res.send(`<h2>Welcome User: ${req.user.username}</h2>
            <a href="/profile">My Profile</a><br/>
            <a href="/logout">Logout</a>`);
});

// ðŸ” Protected Profile Route
app.get("/profile", authMiddleware, (req, res) => {
  const loginTime = new Date(req.user.loginTime);
  const timeSinceLogin = Math.floor((Date.now() - req.user.loginTime) / 1000);

  res.send(`
    <h2>Profile Information</h2>
    <p><b>Username:</b> ${req.user.username}</p>
    <p><b>Role:</b> ${req.user.role}</p>
    <p><b>Login Time:</b> ${loginTime.toLocaleString()}</p>
    <p><b>Time Since Login:</b> ${timeSinceLogin} seconds</p>
    <p><b>JWT Token (demo):</b> ${req.token}</p>
    <a href="/logout">Logout</a>
  `);
});

// ðŸ› ï¸ Admin Panel - View all active tokens
app.get("/adminpanel", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("âŒ Access denied.");

  // filter out expired tokens automatically
  const now = Date.now();
  activeTokens = activeTokens.filter((t) => t.exp > now);

  let table = `
    <h2>Active User Tokens</h2>
    <table border="1" cellpadding="5">
      <tr>
        <th>Username</th>
        <th>Issued At</th>
        <th>Expires At</th>
      </tr>
  `;

  activeTokens.forEach((t) => {
    table += `
      <tr>
        <td>${t.username}</td>
        <td>${new Date(t.iat).toLocaleString()}</td>
        <td>${new Date(t.exp).toLocaleString()}</td>
      </tr>
    `;
  });

  table += `</table><br/><a href="/adminhome">â¬… Back</a>`;
  res.send(table);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("âœ… You have been logged out. <a href='/'>Login again</a>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// You are given an array of student objects, where each student has a name and marks in different subjects. Write an EJS template named student-report.ejs that:
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Student Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f6fa;
      padding: 20px;
    }
    table {
      border-collapse: collapse;
      width: 60%;
      margin: 0 auto;
      background-color: white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #4CAF50;
      color: white;
    }
    .low-mark {
      color: red;
      font-weight: bold;
    }
    h1 {
      text-align: center;
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Student Marks Report</h1>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Math</th>
        <th>Science</th>
        <th>English</th>
      </tr>
    </thead>
    <tbody>
      <% students.forEach(function(student) { %>
        <tr>
          <td><%= student.name %></td>
          <td class="<%= student.marks.math < 70 ? 'low-mark' : '' %>"><%= student.marks.math %></td>
          <td class="<%= student.marks.science < 70 ? 'low-mark' : '' %>"><%= student.marks.science %></td>
          <td class="<%= student.marks.english < 70 ? 'low-mark' : '' %>"><%= student.marks.english %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</body>
</html>


{/* EJS - Student Dashboard */}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= student.name %> - Dashboard</title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    header {
      background-color: #1976d2;
      color: white;
      padding: 20px 0;
    }
    .badge {
      display: inline-block;
      background-color: #ffc107;
      color: #000;
      font-weight: bold;
      padding: 4px 10px;
      border-radius: 8px;
      margin-left: 10px;
    }
    section {
      margin: 30px auto;
      width: 80%;
      max-width: 600px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      text-align: left;
    }
    h2 {
      color: #333;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .grade-A {
      color: green;
      font-weight: bold;
    }
    .grade-B, .grade-C {
      color: blue;
      font-weight: bold;
    }
    .grade-OTHER {
      color: red;
      font-weight: bold;
    }
    footer {
      margin-top: 40px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Welcome, <%= student.name %>!</h1>
    <p><%= student.email %></p>

    <% if (student.role === 'admin') { %>
      <span class="badge">â˜… Admin Access</span>
    <% } %>
  </header>

  <section>
    <h2>Enrolled Courses</h2>

    <% if (courses.length > 0) { %>
      <ul>
        <% courses.forEach(course => { %>
          <% 
            let gradeClass;
            if (course.grade === 'A') gradeClass = 'grade-A';
            else if (course.grade === 'B' || course.grade === 'C') gradeClass = 'grade-B';
            else gradeClass = 'grade-OTHER';
          %>
          <li>
            <strong><%= course.title %></strong> â€” 
            <span class="<%= gradeClass %>"><%= course.grade %></span>
          </li>
        <% }); %>
      </ul>
    <% } else { %>
      <p><em>No courses enrolled yet</em></p>
    <% } %>
  </section>

  <section>
    <h2>Notice Board</h2>
    <p><strong>Escaped:</strong> <%= notice %></p>
    <p><strong>Unescaped:</strong> <%- notice %></p>
  </section>

  <!-- Footer Include -->
  <%- include('footer') %>
</body>
</html>


{/* EJS - Pagination System */}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Catalog - Page <%= currentPage %></title>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background-color: #f8fafc;
      text-align: center;
      padding: 30px;
    }
    h1 {
      color: #1976d2;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: #fff;
      margin: 8px auto;
      padding: 12px;
      border-radius: 8px;
      width: 300px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .pagination {
      margin-top: 20px;
    }
    .pagination a, .pagination span {
      margin: 0 6px;
      padding: 8px 12px;
      text-decoration: none;
      border-radius: 4px;
      border: 1px solid #ccc;
      color: #333;
    }
    .pagination a:hover {
      background-color: #1976d2;
      color: white;
    }
    .disabled {
      color: #999;
      border-color: #eee;
      pointer-events: none;
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>
  <h1>Product Catalog</h1>

  <ul>
    <% products.forEach(product => { %>
      <li><strong><%= product.name %></strong> (ID: <%= product.id %>)</li>
    <% }) %>
  </ul>

  <div class="pagination">
    <% if (currentPage > 1) { %>
      <a href="/?page=<%= currentPage - 1 %>">Previous</a>
    <% } else { %>
      <span class="disabled">Previous</span>
    <% } %>

    <span>Page <%= currentPage %> of <%= totalPages %></span>

    <% if (currentPage < totalPages) { %>
      <a href="/?page=<%= currentPage + 1 %>">Next</a>
    <% } else { %>
      <span class="disabled">Next</span>
    <% } %>
  </div>
</body>
</html>


{/* MongoDB + EJS  */}
const express = require("express")
const ejs = require("ejs")
const {ObjectId} = require("mongodb")
const {connectMongo} = require("./utils/connectDb")

const app = express()

app.use(express.urlencoded())

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

let db ;

connectMongo()
.then(data => db = data)

app.get("/", async (req, res)=>{
    try {
        let data = await db.collection("students").find().toArray()
        res.render("dashboard", {students: data})
    } catch (error) {
        
    }
})

app.post("/add-student", async (req, res)=>{
    try {
       await db.collection("students").insertOne(req.body)
       res.redirect("/")
    } catch (error) {
        res.send(error)
    }
})

app.post("/filter", async(req, res)=>{
    try {
       
        let data = await db.collection("students").find(
            {marks: {$gt : req.body.minMarks}}).toArray()
        res.render("dashboard", {students: data})
    } catch (error) {
        res.send(error)
    }
})

app.delete("/delete/:id", async (req, res)=>{
    console.log(req.params.id)
    await db.collection("students").deleteOne({_id : new ObjectId(req.params.id)})
    res.redirect("/")
})


app.listen(3000, ()=>{
    console.log('server started..')
})


const {MongoClient} = require("mongodb")

module.exports.connectMongo = async ()=>{
    try {
        const client = new MongoClient("mongodb://localhost:27017")
        await client.connect()
        let db = client.db("sectione-project")
        console.log('Database connected..')
        return db;
    } catch (error) {
        console.log(error)
    }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/add-student" method="post">
        <input type="text" name="name" placeholder="Enter name">
        <input type="text" name="section" placeholder="Enter section">
        <input type="text" name="marks" placeholder="Enter marks">
        <button>Add Student</button>
    </form>

    <form action="/filter" method="post">
       Greater than : <input type="text" name="minMarks" placeholder="Marks">
       <button>filter</button>
    </form>

    <table border="1" cellspacing="0" cellpadding="10">
        <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Marks</th>
            <th>Action</th>
        </tr>

       <% students.forEach(student=>{ %>
            <tr>
                <td><%= student.name %></td>
                <td><%= student.section %></td>
                <td><%= student.marks %></td>
                <td><button id="<%= student._id %>" onclick="delStudent(event)">delete</button></td>
            </tr>
       <% }) %>
    </table>
    <script>
        function delStudent(event){
            fetch(`/delete/${event.target.id}`, {
                method: "DELETE",
                redirect: "follow"
            }).then(resp => window.location.href = resp.url)
        }
    </script>
</body>
</html>


{/* Mongoose - Employee Payroll System bookmark_border   Create a system to manage employee records including departments, salary, and joining date. */}
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    departments: {
      type: [String],
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 10000,
      validate: {
        validator: function (v) {
          return v % 1000 === 0;
        },
        message: "Salary must be a multiple of 1000",
      },
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* 🔹 Pre-save Hook: Capitalize name */
employeeSchema.pre("save", function (next) {
  this.name = this.name
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);

const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

/* 1️⃣ Add Employee */
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* 2️⃣ View All Employees */
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

/* 3️⃣ Get Employee by ID */
router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
});

/* 4️⃣ Update Salary or Departments */
router.put("/:id", async (req, res) => {
  const { salary, departments } = req.body;

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    { salary, departments },
    { new: true, runValidators: true }
  );

  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
});

/* 5️⃣ Delete Employee */
router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json({ message: "Employee deleted successfully" });
});

/* ⭐ BONUS: Average Salary by Department */
router.get("/average/:department", async (req, res) => {
  const dept = req.params.department;

  const result = await Employee.aggregate([
    { $match: { departments: dept } },
    {
      $group: {
        _id: null,
        avgSalary: { $avg: "$salary" },
      },
    },
  ]);

  if (result.length === 0)
    return res.json({ message: "No employees in this department" });

  res.json({ department: dept, averageSalary: result[0].avgSalary });
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/payroll");

app.use("/employees", employeeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));


{/* Aggregate - E-commerce Order Analytics */}

{/*  ---------------------------------------------------------
   TASK 1: Top 3 Cities by Revenue (ignore cancelled)
--------------------------------------------------------- */ }
db.orders.aggregate([
  { $match: { status: { $ne: "cancelled" } } },
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$city",
      totalRevenue: { $sum: "$orderValue" },
      avgOrderValue: { $avg: "$orderValue" }
    }
  },
  { $sort: { totalRevenue: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, city: "$_id", totalRevenue: 1, avgOrderValue: 1 } }
]);


/* ---------------------------------------------------------
   {/* TASK 2: Category Performance Summary (delivered only) */}
--------------------------------------------------------- */
db.orders.aggregate([
  { $match: { status: "delivered" } },
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$category",
      totalOrders: { $sum: 1 },
      totalQuantity: { $sum: "$quantity" },
      avgOrderValue: { $avg: "$orderValue" },
      maxOrderValue: { $max: "$orderValue" }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalOrders: 1,
      totalQuantity: 1,
      avgOrderValue: 1,
      maxOrderValue: 1
    }
  }
]);


/* ---------------------------------------------------------
   {/* TASK 3: Users Spending > ₹20,000 (after discount) */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$orderValue" },
      avgOrderValue: { $avg: "$orderValue" }
    }
  },
  { $match: { totalSpent: { $gt: 20000 } } },
  { $sort: { totalSpent: -1 } },
  { $project: { _id: 0, userId: "$_id", totalSpent: 1, avgOrderValue: 1 } }
]);


/* ---------------------------------------------------------
   {/* TASK 4: Monthly Revenue Trend (current year) */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date(new Date().getFullYear(), 0, 1),
        $lt: new Date(new Date().getFullYear() + 1, 0, 1)
      }
    }
  },
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      },
      month: { $month: "$orderDate" }
    }
  },
  {
    $group: {
      _id: "$month",
      totalRevenue: { $sum: "$orderValue" },
      avgOrderValue: { $avg: "$orderValue" },
      totalOrders: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      month: {
        $arrayElemAt: [
          ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          { $subtract: ["$_id", 1] }
        ]
      },
      totalRevenue: 1,
      avgOrderValue: 1,
      totalOrders: 1
    }
  }
]);


/* ---------------------------------------------------------
   {/* TASK 5: Outliers – Top 5 Expensive Orders */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: null,
      avgValue: { $avg: "$orderValue" },
      orders: { $push: "$$ROOT" }
    }
  },
  { $unwind: "$orders" },
  { $match: { $expr: { $gt: ["$orders.orderValue", "$avgValue"] } } },
  { $sort: { "orders.orderValue": -1 } },
  { $limit: 5 },
  { $replaceRoot: { newRoot: "$orders" } }
]);


/* ---------------------------------------------------------
   {/* TASK 6: Daily Order Summary (Bonus) */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $addFields: {
      orderValue: {
        $subtract: [
          { $multiply: ["$price", "$quantity"] },
          {
            $multiply: [
              { $multiply: ["$price", "$quantity"] },
              { $divide: ["$discount", 100] }
            ]
          }
        ]
      },
      date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }
    }
  },
  {
    $group: {
      _id: "$date",
      totalOrders: { $sum: 1 },
      totalQuantity: { $sum: "$quantity" },
      totalRevenue: { $sum: "$orderValue" },
      minOrderValue: { $min: "$orderValue" },
      maxOrderValue: { $max: "$orderValue" }
    }
  },
  {
    $project: {
      _id: 0,
      date: "$_id",
      totalOrders: 1,
      totalQuantity: 1,
      totalRevenue: 1,
      minOrderValue: 1,
      maxOrderValue: 1
    }
  }
]);


/* ---------------------------------------------------------
   {/* TASK 7: City-wise Order Distribution (>10 orders) */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $group: {
      _id: "$city",
      totalOrders: { $sum: 1 }
    }
  },
  { $match: { totalOrders: { $gt: 10 } } },
  { $project: { _id: 0, city: "$_id", totalOrders: 1 } }
]);


/* ---------------------------------------------------------
   {/* TASK 8: Category Popularity Index (Top 5)
   popularityScore = totalQuantity * avgPrice */}
--------------------------------------------------------- */
db.orders.aggregate([
  {
    $group: {
      _id: "$category",
      totalQuantity: { $sum: "$quantity" },
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $addFields: {
      popularityScore: { $multiply: ["$totalQuantity", "$avgPrice"] }
    }
  },
  { $sort: { popularityScore: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, category: "$_id", popularityScore: 1 } }
]);



{/* mongoose - Event Management System */}
/* =========================================================
   MONGOOSE – EVENT MANAGEMENT SYSTEM
========================================================= */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
mongoose.connect("mongodb://127.0.0.1:27017/eventDB");

/* =======================
   EVENT SCHEMA
======================= */
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    eventDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > new Date();
        },
        message: "Event date must be in the future",
      },
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    participants: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one participant is required",
      },
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 1,
      max: 10000,
    },
  },
  { timestamps: true }
);

/* =======================
   PRE-SAVE HOOK
======================= */
eventSchema.pre("save", function (next) {
  this.eventName = this.eventName
    .split(" ")
    .map(
      w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join(" ");
  next();
});

/* =======================
   POST-SAVE HOOK
======================= */
eventSchema.post("save", function () {
  console.log("Event added successfully.");
});

const Event = mongoose.model("Event", eventSchema);

/* =======================
   CRUD ROUTES
======================= */

/* ADD EVENT */
app.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* VIEW ALL EVENTS */
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

/* GET EVENT BY ID */
app.get("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
});

/* UPDATE EVENT */
app.put("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* DELETE EVENT */
app.delete("/events/:id", async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ message: "Event deleted successfully" });
});

/* =======================
   BONUS: EVENTS BY VENUE
======================= */
app.get("/events/venue/:venue", async (req, res) => {
  const events = await Event.find({ venue: req.params.venue });
  res.json(events);
});

/* =======================
   SERVER START
======================= */
app.listen(5000, () => console.log("Server running on port 5000"));

/* =======================
   END OF FILE
======================= */






/* =========================================================
   BACKEND ENGINEERING – COMPLETE SYNTAX REVISION FILE
   Covers ALMOST EVERYTHING FROM SYLLABUS
========================================================= */


/* =======================
   NODE CORE MODULES
======================= */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

/* =======================
   HTTP MODULE (BASIC SERVER)
======================= */
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World");
  }
});
// server.listen(3000);

/* =======================
   FILE SYSTEM (fs)
======================= */
fs.writeFileSync("a.txt", "Hello");
fs.readFile("a.txt", "utf8", (err, data) => {});
fs.appendFile("a.txt", " More", () => {});
fs.unlink("a.txt", () => {});

/* =======================
   PATH MODULE
======================= */
path.join(__dirname, "uploads", "file.txt");
path.extname("test.js");
path.basename("/user/test/file.txt");

/* =======================
   OS MODULE
======================= */
os.platform();
os.freemem();
os.totalmem();

/* =======================
   EXPRESS SETUP
======================= */
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* =======================
   CUSTOM MIDDLEWARE
======================= */
const middleware = (req, res, next) => {
  console.log("Middleware executed");
  next();
};
app.use(middleware);

/* =======================
   ROUTES (ALL TYPES)
======================= */
app.get("/", (req, res) => res.send("GET"));
app.post("/", (req, res) => res.send(req.body));
app.put("/:id", (req, res) => res.send(req.params.id));
app.delete("/:id", (req, res) => res.send("Deleted"));

/* =======================
   QUERY + PARAMS
======================= */
app.get("/search", (req, res) => {
  console.log(req.query); // ?name=abc
});

/* =======================
   ERROR HANDLING
======================= */
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

/* =======================
   SESSION (express-session)
======================= */
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

/* =======================
   AUTH CHECK MIDDLEWARE
======================= */
const isAuth = (req, res, next) => {
  if (req.session.user) next();
  else res.status(401).send("Unauthorized");
};

/* =======================
   JWT AUTH
======================= */
const jwt = require("jsonwebtoken");

const token = jwt.sign({ id: 1 }, "secret", { expiresIn: "1h" });
jwt.verify(token, "secret", (err, decoded) => {});

/* =======================
   MULTER (FILE UPLOAD)
======================= */
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
});

const upload = multer({ storage });
app.post("/upload", upload.single("image"), (req, res) => res.send("Uploaded"));

/* =======================
   MONGOOSE CONNECTION
======================= */
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/db");

/* =======================
   SCHEMA + VALIDATION
======================= */
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: 18 },
    role: { type: String, enum: ["admin", "user"] },
  },
  { timestamps: true }
);

/* =======================
   HOOKS
======================= */
schema.pre("save", function (next) {
  this.name = this.name.toUpperCase();
  next();
});

schema.post("save", function () {
  console.log("Saved");
});

const Model = mongoose.model("User", schema);

/* =======================
   MONGOOSE CRUD
======================= */
Model.create({});
Model.find();
Model.findById("id");
Model.findByIdAndUpdate("id", {}, { new: true });
Model.findByIdAndDelete("id");

/* =======================
   AGGREGATION
======================= */
Model.aggregate([
  { $match: { age: { $gt: 18 } } },
  { $group: { _id: "$role", count: { $sum: 1 } } },
]);

/* =======================
   EJS (TEMPLATE ENGINE)
======================= */
app.set("view engine", "ejs");
app.get("/page", (req, res) => {
  res.render("index", { name: "Yash" });
});

/* =======================
   SOCKET.IO (BASIC)
======================= */
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", socket => {
  socket.on("msg", data => socket.emit("reply", data));
});

/* =======================
   SERVER START
======================= */
app.listen(5000, () => console.log("Server running"));

/* =======================
   END – SYNTAX MASTER FILE
======================= */
