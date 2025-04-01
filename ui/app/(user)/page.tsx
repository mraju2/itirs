import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          SkillsConnect
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          One Connect, Many Opportunities.
          <br />
          <span className="text-sm block text-slate-400 mt-1">
            ఒక్క క్లోక్‌తో, అనేక ఉద్యోగ అవకాశాలు
          </span>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium text-sm"
          >
            🔍 View Jobs
          </Link>
          <Link
            href="/user"
            className="border border-white text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-white hover:text-slate-950 transition"
          >
            📝 Register as Candidate
          </Link>
        </div>
      </section>

      {/* What is SkillConnect */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Bridging ITI Talent with Industry
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto">
          SkillConnect is a platform that connects ITI graduates with verified
          recruiters offering real job opportunities.
          <br />
          <span className="text-sm text-slate-500">
            ఐటిఐ విద్యార్థులకు నిజమైన ఉద్యోగ అవకాశాలను కల్పించే ముడిపెడే వేదిక.
          </span>
        </p>
      </section>

      {/* Features */}
      <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow border p-6 text-center">
          <h3 className="text-blue-600 font-semibold text-lg mb-2">
            Job Matching
          </h3>
          <p className="text-slate-600 text-sm">
            Find jobs that match your ITI trade, location, and skill level.
            <br />
            <span className="text-xs text-slate-400">
              మీ ట్రేడ్ మరియు స్థాయికి అనుగుణంగా ఉద్యోగాలు
            </span>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow border p-6 text-center">
          <h3 className="text-blue-600 font-semibold text-lg mb-2">
            Apply in Telugu
          </h3>
          <p className="text-slate-600 text-sm">
            Interface built for ease — Telugu translations included everywhere.
            <br />
            <span className="text-xs text-slate-400">
              తెలుగులో సరళమైన దరఖాస్తు ప్రక్రియ
            </span>
          </p>
        </div>
        <div className="bg-white rounded-lg shadow border p-6 text-center">
          <h3 className="text-blue-600 font-semibold text-lg mb-2">
            Trusted Recruiters
          </h3>
          <p className="text-slate-600 text-sm">
            Jobs posted only by verified employers.
            <br />
            <span className="text-xs text-slate-400">
              నమ్మదగిన కంపెనీలు మాత్రమే
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
