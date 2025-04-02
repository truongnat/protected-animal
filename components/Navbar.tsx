'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="bg-green-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="flex-shrink-0 flex items-center">
							<span className="text-xl font-bold">Protected Animals</span>
						</Link>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link
								href="/"
								className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
							>
								Home
							</Link>
							<Link
								href="/species"
								className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
							>
								Endangered Species
							</Link>
							<Link
								href="/blog"
								className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
							>
								Blog
							</Link>
							<Link
								href="/about"
								className="px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700"
							>
								About
							</Link>
						</div>
					</div>
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
						>
							<svg
								className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							<svg
								className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<Link
						href="/"
						className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
					>
						Home
					</Link>
					<Link
						href="/species"
						className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
					>
						Endangered Species
					</Link>
					<Link
						href="/blog"
						className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
					>
						Blog
					</Link>
					<Link
						href="/about"
						className="block px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
					>
						About
					</Link>
				</div>
			</div>
		</nav>
	);
}
