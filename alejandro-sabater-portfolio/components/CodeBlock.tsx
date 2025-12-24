import React, { useEffect, useState } from 'react';

const CodeBlock: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = `const developer = {
  name: "Alejandro Sabater",
  role: "Frontend Developer",
  location: "Buenos Aires, Argentina"
};`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 40); // Typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg bg-slate-900 rounded-lg shadow-2xl border border-slate-700 overflow-hidden transform transition-all hover:scale-[1.02] duration-300 animate-fade-in-up">
      <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs text-slate-400 font-mono">portfolio.js</div>
      </div>
      <div className="p-4 sm:p-6 overflow-x-auto">
        <pre className="font-mono text-sm sm:text-base text-slate-300 leading-relaxed">
          <code>
            <span className="text-slate-500">// This is my portfolio</span>
            <br />
            {text}
            <span className="animate-pulse inline-block w-2 h-4 bg-indigo-500 align-middle ml-1"></span>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;