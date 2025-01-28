'use client';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 text-center">
            <p className="text-sm md:text-base">
                &copy; {new Date().getFullYear()} All rights reserved, Alamin.
            </p>
        </footer>
    );
}
