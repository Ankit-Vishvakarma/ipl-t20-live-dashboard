'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Schedule', href: '/schedule' },
        { label: 'Points Table', href: '/points-table' }
    ];

    return (
        <nav className="bg-blue-500 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="https://documents.iplt20.com//ipl/assets/images/ipl-logo-new-old.png"
                            alt="IPL Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white leading-tight">
                                IPL T20 Dashboard
                            </span>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`p-2 rounded-lg text-sm transition-all ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-white hover:bg-blue-600'
                                        }`}
                                >

                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
