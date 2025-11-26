
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-teal-600 via-teal-700 to-teal-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              📚 Library Management Made Simple
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-orange-400">BookHive</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-teal-100">
            Transform your library experience with our comprehensive management system. Organize, track, and discover books like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/addbook" className="bg-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition duration-300 shadow-lg">
              🚀 Start Adding Books
            </Link>
            <Link href="/allbooks" className="border-2 border-orange-400 text-orange-400 px-10 py-4 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition duration-300">
              📖 Browse Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ✨ Powerful Features
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your library operations with our comprehensive suite of tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Add Books</h3>
              <p className="text-gray-600 text-center leading-relaxed">Easily add new books with comprehensive details including title, author, ISBN, and inventory tracking.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Smart Inventory</h3>
              <p className="text-gray-600 text-center leading-relaxed">Track total copies, available stock, and issued books with real-time updates and intelligent alerts.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Browse & Search</h3>
              <p className="text-gray-600 text-center leading-relaxed">Explore your entire collection with advanced search, filtering, and organized table views.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-teal-600 py-20 relative">
        <div className="absolute inset-0 bg-teal-700 opacity-50"></div>
        <div className="max-w-5xl mx-auto px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose BookHive?</h2>
            <p className="text-teal-100 text-lg">Built for modern libraries with cutting-edge features</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-800 font-semibold mb-1">Uptime</div>
              <div className="text-gray-600 text-sm font-medium">Reliable Service</div>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">Fast</div>
              <div className="text-gray-800 font-semibold mb-1">Performance</div>
              <div className="text-gray-600 text-sm font-medium">Lightning Quick</div>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-800 font-semibold mb-1">Support</div>
              <div className="text-gray-600 text-sm font-medium">Always Here</div>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">Secure</div>
              <div className="text-gray-800 font-semibold mb-1">Data</div>
              <div className="text-gray-600 text-sm font-medium">Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-3xl p-12 text-center border border-gray-200">
            <div className="mb-8">
              <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🎆 Get Started Today
              </span>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Transform Your Library</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of librarians who have revolutionized their book management with BookHive
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/addbook" className="bg-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition duration-300 shadow-lg">
                🚀 Add Your First Book
              </Link>
              <Link href="/allbooks" className="border-2 border-teal-500 text-teal-600 px-10 py-4 rounded-xl font-semibold hover:bg-teal-500 hover:text-white transition duration-300">
                📊 View Demo Collection
              </Link>
            </div>
            <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to start
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No setup required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant access
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
