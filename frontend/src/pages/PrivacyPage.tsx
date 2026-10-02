import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
    <div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Privacy Policy & Local Processing Guarantee
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Effective Date: October 2026 | Last Updated: October 2026
      </p>
    </div>

    {/* Key Principles Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="p-5 flex items-start space-x-3 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10">
        <ServerOff className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">No Server File Uploads</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            All PDFs, images, spreadsheets, and confidential pricing documents are processed locally inside your web browser. They are never transmitted to our servers or third parties.
          </p>
        </div>
      </Card>

      <Card className="p-5 flex items-start space-x-3 border-cyan-200 dark:border-cyan-900/50 bg-cyan-50/20 dark:bg-cyan-950/10">
        <Lock className="w-6 h-6 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Local Storage Only</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Your preferences, favorite tools, custom invoice templates, and product catalogs are stored exclusively on your device using localStorage and IndexedDB.
          </p>
        </div>
      </Card>

      <Card className="p-5 flex items-start space-x-3 border-blue-200 dark:border-blue-900/50 bg-blue-50/20 dark:bg-blue-950/10">
        <EyeOff className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Zero Hidden Tracking</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            We do not sell user data, track keystrokes, or embed deceptive ad trackers. Your business strategy remains completely confidential.
          </p>
        </div>
      </Card>

      <Card className="p-5 flex items-start space-x-3 border-purple-200 dark:border-purple-900/50 bg-purple-50/20 dark:bg-purple-950/10">
        <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Chrome Extension Safety</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            The MONTY GENIUS SELLER ASSISTANT extension operates strictly on user initiation. It does not tamper with credentials, bypass security, or collect restricted marketplace data.
          </p>
        </div>
      </Card>
    </div>

    <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Core Philosophy</h2>
      <p>
        MONTY GENIUS ECOM TOOLS was built by Mr. Monty Genius with a fundamental principle: e-commerce seller confidentiality is paramount. Online merchants handle sensitive supplier invoices, profit margins, cost structures, and customer delivery slips that must never be exposed to cloud third-party services without strict necessity.
      </p>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Technical Implementation</h2>
      <p>
        - <strong>PDF Utilities:</strong> Executed client-side using WebAssembly and pure JavaScript via <code>pdf-lib</code> and <code>PDF.js</code>.<br />
        - <strong>Image Operations:</strong> Executed using the browser's native HTML5 Canvas API.<br />
        - <strong>Spreadsheets:</strong> Parsed, filtered, and cleaned entirely in client memory.<br />
        - <strong>Barcodes & QR Codes:</strong> Generated using in-memory vector algorithms and downloaded directly via client Object URLs.
      </p>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Optional AI Features</h2>
      <p>
        If you choose to use our optional AI content generation features, API requests are made directly from your browser to your chosen provider (such as OpenAI, Google Gemini, OpenRouter, or your local Ollama instance) using the API key you supply. Keys are stored locally in browser session/local storage and are never logged or stored on our servers.
      </p>

      <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. User Rights and Data Deletion</h2>
      <p>
        You have total control over your local data. You can clear your stored favorites, recent tools, and invoice templates at any time by clicking the "Clear Local Data" button on the dashboard or by clearing your browser's site data.
      </p>
    </Card>
  </div>
);

export default PrivacyPage;
