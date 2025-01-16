import Layout from "./index.js";

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-r from-teal-700 to-indigo-900 flex items-stretch">
        {/* Full screen container */}
        <div className="w-full h-screen flex">
          {/* Left Section (Form) */}
          <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-r from-teal-700 to-indigo-900 text-white p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Study Guide with AI
              </h2>
              <p className="text-lg text-gray-200">
                AI-Powered Study Guide Generator simplifies your learning
                journey by automatically creating personalized study materials,
                from summaries to flashcards, so you can focus on mastering the
                content!
              </p>
            </div>

            {/* Form */}
            <form
              hx-post="/research"
              hx-target="#output"
              hx-encoding="multipart/form-data"
              className="space-y-6 flex flex-col w-full"
              id="form"
            >
              <input
                id="query"
                name="query"
                placeholder="Enter your research question"
                className="w-full h-16 px-6 py-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button
                className="py-4 px-8 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xl font-semibold shadow-md hover:bg-gradient-to-l transition ease-in-out duration-300 transform hover:scale-105"
                id="send"
                type="submit"
              >
                Start Research
              </button>
            </form>
          </div>

          {/* Right Section (Research Results) */}
          <div className="w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-r from-teal-700 to-indigo-900 text-white p-8 space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Research Results
              </h2>
              <p className="text-lg text-gray-200">
                generate personalized study guides based on a user's syllabus or
                list of topics.
              </p>
            </div>

            {/* Research Results Area */}
            <div
              id="output"
              className="flex flex-col space-y-6 w-full h-[50vh] overflow-y-auto p-6 rounded-lg bg-gray-700 opacity-75"
            >
              <div className="flex justify-center items-center animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-teal-500"
                  viewBox="0 0 24 24"
                >
                  <circle cx="4" cy="12" r="3" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin="0;svgSpinners3DotsScale1.end-0.25s"
                      dur="0.75s"
                      values="3;.2;3"
                    />
                  </circle>
                  <circle cx="12" cy="12" r="3" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin="svgSpinners3DotsScale0.end-0.6s"
                      dur="0.75s"
                      values="3;.2;3"
                    />
                  </circle>
                  <circle cx="20" cy="12" r="3" fill="currentColor">
                    <animate
                      attributeName="r"
                      begin="svgSpinners3DotsScale0.end-0.45s"
                      dur="0.75s"
                      values="3;.2;3"
                    />
                  </circle>
                </svg>
              </div>
              <div className="text-center text-lg text-gray-300">
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
