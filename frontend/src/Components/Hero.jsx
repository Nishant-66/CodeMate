import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
      
    <div className="space-y-6 text-white">
    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
      Welcome to <span className="text-fuchsia-400">CODEMATE</span>
      </h1>

    <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
    <p>
      <strong>CODEMATE</strong> is a vibrant platform where developers from around the world 
      can <span className="text-indigo-400 font-medium">connect</span>, <span className="text-green-400 font-medium">collaborate</span>, 
      and <span className="text-purple-400 font-medium">grow together</span>.
    </p>
    <p>
      Whether you're building side projects, solving complex problems, or exchanging ideas,
      CodeMate brings like-minded coders into one shared space — to innovate, support, and thrive.
    </p>
    <p>Join our growing community and start pairing up for:</p>
    <ul className="list-disc list-inside pl-2 space-y-1">
      <li>Hackathons</li>
      <li>Open-source contributions</li>
      <li>Coding challenges</li>
      <li>Pair programming sessions</li>
    </ul>
    </div>
    <Link 
      to="/signup"
      className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
      >
      Be a CodeMate
    </Link>
    </div>
    <div className="hidden md:block">
    <img
      src="/heroimage.jpg"
      alt="Two developers collaborating"
      className="w-full rounded-xl shadow-lg object-cover"
       />
    </div>
    </div>
    </div>
    );
}
