<h1>CodeMate</h1>

<h2>Getting Started</h2>
<p>
  CodeMate is a developer networking and collaboration platform that allows developers to connect, collaborate, and manage projects efficiently. It provides secure authentication, dynamic recommendation feeds, automated notifications, and real-time chat.
</p>

<h3>Key Features:</h3>
<p>
  1. Secure signup, login, and logout with JWT-based authentication.<br>
  2. Developer recommendation feed showing one profile at a time with <strong>Interested</strong> / <strong>Ignore</strong> options; feed updates dynamically.<br>
  3. Automated interest notifications using Node.js cron jobs and <strong>Nodemailer</strong> for sending emails, allowing users to accept or reject connection requests.<br>
  4. Real-time one-to-one chat between connected users via <strong>Socket.IO</strong>.<br>
  5. Full profile management including editing details and updating passwords.
</p>

<h2>Tech Stack</h2>
<p>
  <strong>Frontend:</strong><br>
  • React.js (Vite)<br>
  • Tailwind CSS<br>
  • Redux Toolkit<br>
  • Axios<br><br>

  <strong>Backend:</strong><br>
  • Node.js<br>
  • Express.js<br>
  • MongoDB<br>
  • Socket.IO<br>
  • Nodemailer<br>
</p>

<h2>Clone the Repository</h2>
<pre><code>git clone https://github.com/Nishant-66/CodeMate
cd CodeMate</code></pre>

<h2>Backend Configuration (No .env Required)</h2>
<p>Instead of using an <code>.env</code> file, add your configuration directly in <code>config.js</code> or at the top of your server file:</p>

<pre><code>// config.js
const MONGO_URI = "mongodb+srv://kumarnishant26346:Nishant123@cluster0.yf9lwbw.mongodb.net/";
const PORT = 3000;
const TOKEN_SECRET = "bjkdwjbnwdkjbvskjv";
const EMAIL_USER = "kumarnishant26346@gmail.com";
const EMAIL_PASS = "kipl byhg dlqu yxfv";

module.exports = { MONGO_URI, PORT, TOKEN_SECRET, EMAIL_USER, EMAIL_PASS };</code></pre>

<h2>Installation</h2>
<pre><code># Backend setup
cd Backend
npm install

# Frontend setup
cd ../Frontend
npm install</code></pre>

<h2>Running the Application</h2>
<pre><code># Start backend (Port 3000)
cd Backend
npm run dev

# Start frontend (Port 5173)
cd ../Frontend
npm run dev</code></pre>

<p>
  Backend → <a href="http://localhost:3000">http://localhost:3000</a><br>
  Frontend → <a href="http://localhost:5173">http://localhost:5173</a>
</p>

<h2>Screenshots</h2>
<p>Add screenshots of your project below. Replace the src attribute if needed.</p>

<img src="./Screenshot/1.png" alt="Screenshot 1" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/2.png" alt="Screenshot 2" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/3.png" alt="Screenshot 3" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/4.png" alt="Screenshot 4" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/5.png" alt="Screenshot 5" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/6.png" alt="Screenshot 6" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/7.png" alt="Screenshot 7" style="width:100%; border-radius: 8px; margin-bottom: 10px;" />
<img src="./Screenshot/8.png" alt="Screenshot 8" style="width:100%; border-radius: 8px;" />
