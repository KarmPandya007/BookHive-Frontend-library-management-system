import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="bg-teal-600 text-white flex flex-row justify-between items-center px-20 py-4 shadow-lg sticky top-0 z-50">
            <div className="logo text-3xl animate-fadeIn hover:scale-110 transition cursor-pointer">

                <Link href="/" className="nav-link animate-fadeIn">BookHive</Link>
            </div>
            <div className="nav flex flex-row gap-6 text-lg">
                <Link href="/addbook" className="nav-link animate-fadeIn">Add Book</Link>
                <Link href="/allbooks" className="nav-link animate-fadeIn">All Books</Link>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-in-out;
                }
            `}</style>
        </div>
    )
}

export default Navbar
