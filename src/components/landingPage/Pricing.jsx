'use client';

import { CheckCircle } from 'lucide-react';

export default function Pricing() {
    const plans = [
        {
            icon: '/free-icon.png',
            title: 'Free Plan',
            price: '$0',
            features: ['Basic Messaging', 'Group Chats', 'Limited File Sharing'],
        },
        {
            icon: '/pro-icon.png',
            title: 'Pro Plan',
            price: '$20',
            features: ['Unlimited Messaging', 'Priority Support', 'Large File Sharing'],
        },
        {
            icon: '/enterprise-icon.png',
            title: 'Enterprise',
            price: '$50',
            features: [
                'All Pro Features',
                'Custom Integrations',
                'Dedicated Support',
                'Analytics Dashboard',
            ],
        },
    ];

    return (
        <section className="py-12 relative bg-gradient-to-t from-rose-900 to-sky-700 h-full md:h-[90vh] flex flex-col justify-center items-center text-center ">
            <h2 className="text-3xl font-bold text-white mb-8 z-30">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto md:px-0 px-4 z-30">
                {plans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        icon={plan.icon}
                        title={plan.title}
                        price={plan.price}
                        features={plan.features}
                    />
                ))}
            </div>

            {/* Animated Gradient Balls */}
            <div className="absolute -top-10 left-[30%] bg-gradient-to-t from-cyan-500 to-slate-600 w-[250px] h-[250px] rounded-full animate-floating delay-300 " />
            <div className="absolute top-[10%] right-[20%] bg-gradient-to-br from-pink-500 to-purple-700 w-[150px] h-[150px] rounded-full animate-floating delay-500 " />
            <div className="absolute top-[50%] left-[60%] bg-gradient-to-t from-green-500 to-teal-700 w-[200px] h-[200px] rounded-full animate-floating delay-200 " />
            <div className="absolute bottom-10 right-5 bg-gradient-to-t from-yellow-500 to-orange-600 w-[300px] h-[300px] rounded-full animate-floating " />
        </section>
    );
}

function PricingCard({ icon, title, price, features }) {
    return (
        <div className="bg-black/35 backdrop-blur-lg w-full p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border border-white/20">
            <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-4xl font-bold text-cyan-300 mb-4">{price}</p>
            <ul className="text-left space-y-2 mb-6">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                        <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
                        <span className="text-gray-200">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="bg-cyan-500 text-white py-2 px-6 rounded-lg hover:bg-cyan-600 transition">
                {title === 'Free Plan' ? 'Get Started' : 'Choose Plan'}
            </button>
        </div>
    );
}
