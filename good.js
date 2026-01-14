server.js

// express server
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// form ka data read karne ke liye
app.use(express.urlencoded({ extended: true }));

// session setup (login state yaad rakhne ke liye)
app.use(
  session({
    secret: "secretkey", // security key
    resave: false,
    saveUninitialized: false,
  })
);

// EJS as view engine
app.set("view engine", "ejs");

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// models import
const User = require("./models/User");
const Product = require("./models/Product");


// ---------------- SIGNUP ----------------

// signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// signup logic
app.post("/signup", async (req, res) => {
  const user = new User(req.body); // user create
  await user.save();               // database me save
  res.redirect("/login");
});


// ---------------- LOGIN ----------------

// login page
app.get("/login", (req, res) => {
  res.render("login");
});

// login logic
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (user) {
    req.session.userId = user._id; // session set
    res.redirect("/dashboard");
  } else {
    res.send("Invalid credentials");
  }
});


// ---------------- DASHBOARD (READ) ----------------

app.get("/dashboard", async (req, res) => {
  // bina login access nahi
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const products = await Product.find(); // READ
  res.render("dashboard", { products });
});


// ---------------- CREATE ----------------

app.post("/add-product", async (req, res) => {
  const product = new Product(req.body); // product create
  await product.save();                  // database me save
  res.redirect("/dashboard");
});


// ---------------- DELETE ----------------

app.get("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});


// ---------------- UPDATE ----------------

// edit page
app.get("/edit/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("edit", { product });
});

// update logic
app.post("/edit/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/dashboard");
});


// ---------------- LOGOUT ----------------

app.get("/logout", (req, res) => {
  req.session.destroy(); // session end
  res.redirect("/login");
});


// server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});


models
user.js
const mongoose = require("mongoose");

// user ka structure
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);


models
product.js
const mongoose = require("mongoose");

// product ka structure
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);


dashboard.ejs
<h1>Dashboard</h1>

<a href="/logout">Logout</a>

<!-- CREATE -->
<form action="/add-product" method="post">
  <input name="name" placeholder="Product Name" />
  <input name="price" placeholder="Price" />
  <button>Add</button>
</form>

<!-- READ + DELETE + UPDATE -->
<ul>
  <% products.forEach(p => { %>
    <li>
      <%= p.name %> - <%= p.price %>
      <a href="/edit/<%= p._id %>">Edit</a>
      <a href="/delete/<%= p._id %>">Delete</a>
    </li>
  <% }) %>
</ul>


edit.ejs
<h2>Edit Product</h2>

<form action="/edit/<%= product._id %>" method="post">
  <input name="name" value="<%= product.name %>" />
  <input name="price" value="<%= product.price %>" />
  <button>Update</button>
</form>


jwttt 

user.js
const mongoose = require("mongoose");

// user ka structure
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);

blog.js
const mongoose = require("mongoose");

// blog ka structure
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String, // kis user ne likha
});

module.exports = mongoose.model("Blog", blogSchema);





middleware.js
const jwt = require("jsonwebtoken");

// token check karne ke liye
function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("Token missing");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id; // user id save
    next();
  } catch {
    res.send("Invalid token");
  }
}

module.exports = auth;



server.js
const jwt = require("jsonwebtoken");

// token check karne ke liye
function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("Token missing");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id; // user id save
    next();
  } catch {
    res.send("Invalid token");
  }
}

module.exports = auth;


dashboard.html
const jwt = require("jsonwebtoken");

// token check karne ke liye
function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.send("Token missing");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id; // user id save
    next();
  } catch {
    res.send("Invalid token");
  }
}

module.exports = auth;



routing simple
const express = require("express");
const app = express();

// home route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// about route
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(3000);


// CREATE
app.post("/product", (req, res) => {
  res.send("Product added");
});

// READ
app.get("/product", (req, res) => {
  res.send("All products");
});

// UPDATE
app.put("/product/:id", (req, res) => {
  res.send("Product updated");
});

// DELETE
app.delete("/product/:id", (req, res) => {
  res.send("Product deleted");
});

advanced

const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Login page");
});

module.exports = router;

using crud


http

const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home Page");
  } 
  else if (req.url === "/html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>HTML Page</h1>");
  } 
  else if (req.url === "/json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ msg: "JSON Response" }));
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }

});

server.listen(3000);



const fs = require("fs");

// 1️⃣ WRITE (Create file)
fs.writeFile("demo.txt", "Hello Node.js", (err) => {
  if (err) throw err;
  console.log("File created");

  // 2️⃣ READ
  fs.readFile("demo.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("File content:", data);

    // 3️⃣ APPEND
    fs.appendFile("demo.txt", "\nThis is appended text", (err) => {
      if (err) throw err;
      console.log("Data appended");

      // 4️⃣ UPDATE (overwrite)
      fs.writeFile("demo.txt", "Updated content", (err) => {
        if (err) throw err;
        console.log("File updated");

        // 5️⃣ DELETE
        fs.unlink("demo.txt", (err) => {
          if (err) throw err;
          console.log("File deleted");
        });
      });
    });
  });
});


// MULTER FILE UPLOAD

const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, and PNG files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 } 
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});

app.post("/uploads", (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send("❌ File too large! Max size allowed is 1MB.");
      }
    } else if (err) {
      return res.status(400).send(err.message);
    }

    const pname = req.body.pname;
    const pprice = req.body.pprice;
    const Image = req.file.path;
    const files = req.file.filename;

    const product = { pname, pprice, Image, files };

    fs.readFile(__dirname + '/product.json', 'utf-8', (err, data) => {
      let products = [];
      if (!err && data) {
        try {
          products = JSON.parse(data);
        } catch {
          products = [];
        }
      }

      products.push(product);

      fs.writeFile('product.json', JSON.stringify(products), (err) => {
        if (err) {
          return res.status(500).send('Error saving product.');
        }
        res.sendFile(__dirname + "/dashboard.html");
      });
    });
  });
});

app.post("/multiples", (req, res) => {
  upload.array("files", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send("❌ One of the files is larger than 1MB!");
      }
    } else if (err) {
      return res.status(400).send(err.message);
    }

    const pname = req.body.pname;
    const pprice = req.body.pprice;

    if (!req.files || req.files.length === 0) {
      return res.status(400).send("❌ No files uploaded.");
    }

    const files = req.files.map((file) => file.filename);

    fs.readFile("product.json", "utf-8", (err, data) => {
      let existingProducts = [];
      if (!err && data) {
        try {
          existingProducts = JSON.parse(data);
        } catch (parseErr) {
          console.error("Error parsing product.json:", parseErr);
        }
      }

      existingProducts.push({ pname, pprice, files });

      fs.writeFile("product.json",
        JSON.stringify(existingProducts),
        (err) => {
          if (err) {
            console.error("Error saving products:", err);
            return res.status(500).send("Error saving products.");
          }
          res.sendFile(__dirname + "/dashboard.html");
        }
      );
    });
  });
});

app.get("/products", (req, res) => {
  fs.readFile(__dirname + '/product.json', 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading products:", err);
      return res.status(500).send("Error reading products.");
    }
    res.send(JSON.parse(data));
  });
});

app.listen(3000, () => {
  console.log("✅ Server is running on port 3000");
});