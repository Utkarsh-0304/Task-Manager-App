import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="text-slate-800">
      <header
        id="header"
        className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-slate-200"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="../../trello-logo.svg" className="h-auto w-[30px]" />
            <h1 className="text-[1.5rem] font-bold text-slate-900">TaskFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div
              onClick={() => navigate("/login")}
              className="sm:block text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Log In
            </div>
            <div
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
            >
              Get Started Free
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-bg pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Your tasks,{" "}
              <span className="gradient-text">supercharged by AI.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10">
              TaskFlow is a powerful, collaborative, and intelligent task
              manager designed to help you and your team achieve more with less
              effort.
            </p>
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => navigate("/signup")}
                className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg"
              >
                Get Started - It's Free
              </div>
            </div>

            <div className="mt-16 max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-4 border border-slate-200">
              <div className="aspect-video bg-slate-100 rounded-lg p-4 flex gap-4 overflow-hidden">
                <div className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white h-fit hover:bg-white/60">
                  <div className="h-[2rem] w-full text-[1.5rem] text-[#343A40] font-semibold flex justify-between relative">
                    To Do
                    <button
                      className={`bg-[9b9eab] p-[0.5rem] border-none text-l rounded-[5px]`}
                    >
                      <BsThreeDotsVertical color="#ADB5BD" />
                    </button>
                  </div>

                  <div>
                    <div className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-[#EFF2F5] flex items-center justify-between gap-[0.5rem]  w-full hover:bg-[#E6F2FF] hover:[&>button]:visible">
                      Sample
                    </div>
                  </div>
                  <div className="rounded-[3px] p-[10px] mt-[10px] border-1 border-[#DFE1E6] bg-[#EFF2F5]">
                    <textarea
                      className="w-full border-none rounded-[3px] p-[5px]  text-[1rem] overflow-x-hidden resize-none whitespace-pre-wrap font-[Verdana] focus:outline-none text-black"
                      placeholder="Enter a title or paste a link"
                    />
                    <div className="flex justify-start items-center gap-[0.5rem] [&>button]:mt-[0.5rem] [&>button]: [&>button]:border-none [&>button]:rounded-[3px] [&>button]:px-[6px] [&>button]:py-[12px] [&>button]:cursor-pointer">
                      <button className="w-[60px] h-[40px] bg-[#427cc2] flex items-center justify-center hover:bg-[#4382cf] disabled:opacity-[0.5] text-white">
                        Add
                      </button>
                      <button className="flex items-center justify-center bg-[#3f3f3f] text-white w-[40px] h-[40px] text-m hover:bg-[#6f717c]">
                        <RxCross2 />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white h-fit hover:bg-white/60">
                  <div className="h-[2rem] w-full text-[1.5rem] text-[#343A40] font-semibold flex justify-between relative">
                    In Progress
                    <button
                      className={`bg-[9b9eab] p-[0.5rem] border-none text-l rounded-[5px]`}
                    >
                      <BsThreeDotsVertical color="#ADB5BD" />
                    </button>
                  </div>

                  <div>
                    <div className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-[#EFF2F5] flex items-center justify-between gap-[0.5rem]  w-full hover:bg-[#E6F2FF] hover:[&>button]:visible">
                      Sample
                    </div>
                  </div>
                  <div className="mt-[1rem] gap-[2px] w-[50%] p-[0.5rem] cursor-pointer flex justify-evenly items-center bg-[#007BFF]/80 rounded-full text-md border-none text-white">
                    <FaPlus color="white" size={13} />
                    Add a card
                  </div>
                </div>
                <div className="p-[1rem] min-w-[300px] shadow-2xl rounded-[5px] bg-white h-fit hover:bg-white/60">
                  <div className="h-[2rem] w-full text-[1.5rem] text-[#343A40] font-semibold flex justify-between relative">
                    Done
                    <button
                      className={`bg-[9b9eab] p-[0.5rem] border-none text-l rounded-[5px]`}
                    >
                      <BsThreeDotsVertical color="#ADB5BD" />
                    </button>
                  </div>

                  <div>
                    <div className="mt-[1rem] p-[0.5rem] rounded-[5px] bg-[#EFF2F5] flex items-center justify-between gap-[0.5rem]  w-full hover:bg-[#E6F2FF] hover:[&>button]:visible">
                      Sample
                    </div>
                  </div>
                  <div className="mt-[1rem] gap-[2px] w-[50%] p-[0.5rem] cursor-pointer flex justify-evenly items-center bg-[#007BFF]/80 rounded-full text-md border-none text-white">
                    <FaPlus color="white" size={13} />
                    Add a card
                  </div>
                </div>
                <div className="bg-blue-900/50 w-[10rem] h-[50px] rounded-[5px] text-lg border-none cursor-pointer flex justify-evenly items-center text-white">
                  <FaPlus color="white" size={15} />
                  Add a list
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Everything you need to get work done
              </h2>
              <p className="max-w-xl mx-auto text-lg text-slate-600 mt-4">
                Focus on the work that matters with features designed for modern
                teams.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all feature-card">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Visual Workflow Management
                </h3>
                <p className="text-slate-600">
                  Transform your projects from cluttered lists into clear,
                  organized boards. Use customizable columns like "To Do," "In
                  Progress," and "Done" to see your entire workflow at a glance.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all feature-card">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Effortless Organization
                </h3>
                <p className="text-slate-600">
                  Bring order to chaos. Create a dedicated board for every
                  project, team, or personal goal. This keeps your work neatly
                  separated and your mind clear, allowing you to focus on one
                  context at a time without distractions
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all feature-card">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Simple & Intuitive Interface
                </h3>
                <p className="text-slate-600">
                  Get started in seconds. There are no complex settings or
                  hidden menus—just a straightforward tool that helps you and
                  your team get work done.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="bg-slate-800 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.2] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Stop juggling tabs. Start synergizing.
                </h2>
                <p className="max-w-xl mx-auto text-lg text-slate-300 mt-4 mb-8">
                  Join thousands of teams who are shipping faster and
                  collaborating better with TaskFlow.
                </p>
                <a
                  href="#"
                  className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all shadow-lg"
                >
                  Sign Up for Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h1 className="text-lg font-bold text-slate-900">TaskFlow</h1>
              </div>
              <p className="text-slate-600">The future of productivity.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-slate-600 hover:text-indigo-600"
                  >
                    Features
                  </a>
                </li>

                <li>
                  <a href="#" className="text-slate-600 hover:text-indigo-600">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-600 hover:text-indigo-600">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-600 hover:text-indigo-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-600 hover:text-indigo-600">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-slate-500">
            <p>&copy; 2025 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
