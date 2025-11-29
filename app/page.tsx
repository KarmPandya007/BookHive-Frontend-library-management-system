
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
              📖 Your Gateway to Books
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-orange-400">BookHive</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-teal-100">
            Discover, search, and issue books from our vast collection. Your one-stop portal for all your reading needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/allbooks" className="bg-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition duration-300 shadow-lg">
              🔍 Search Books
            </Link>
            <Link href="/addbook" className="border-2 border-orange-400 text-white px-10 py-4 rounded-xl font-semibold hover:bg-orange-400 hover:text-white transition duration-300">
              📋 Issue Books
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ✨ Discover & Access
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Your Next Read</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Search through thousands of books and issue them instantly with our seamless portal
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Search Books</h3>
              <p className="text-gray-600 text-center leading-relaxed">Find your favorite books using our advanced search by title, author, category, or ISBN.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Instant Issue</h3>
              <p className="text-gray-600 text-center leading-relaxed">Issue books instantly with real-time availability checking and automatic return date tracking.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Browse Collection</h3>
              <p className="text-gray-600 text-center leading-relaxed">Explore our vast collection with smart filters, categories, and personalized recommendations.</p>
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
            <p className="text-teal-100 text-lg">Your trusted portal for seamless book discovery and issuing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
              <div className="text-gray-800 font-semibold mb-1">Books</div>
              <div className="text-gray-600 text-sm font-medium">Available Collection</div>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-30 transition duration-300 border border-white border-opacity-20">
              <div className="text-3xl font-bold text-orange-500 mb-2">Instant</div>
              <div className="text-gray-800 font-semibold mb-1">Search</div>
              <div className="text-gray-600 text-sm font-medium">Lightning Fast</div>
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
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Your Reading Journey</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of readers who discover and access amazing books through BookHive
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/allbooks" className="bg-orange-500 text-white px-10 py-4 rounded-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition duration-300 shadow-lg">
                🔍 Search Books Now
              </Link>
              <Link href="/addbook" className="border-2 border-teal-500 text-teal-600 px-10 py-4 rounded-xl font-semibold hover:bg-teal-500 hover:text-white transition duration-300">
                📋 Issue a Book
              </Link>
            </div>
            <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free to browse
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Easy registration
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Quick issue
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
