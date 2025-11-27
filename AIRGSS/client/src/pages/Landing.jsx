import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic, FileText, CreditCard, Shield, Activity, Users, Building } from 'lucide-react';

const Landing = () => {
    return (
        <div className="pb-16 overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white pt-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="animate-[fade-in_1s_ease-out]">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-medium mb-6 backdrop-blur-sm">
                            Digital India Initiative
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Smart Governance for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Rural India
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Empowering Gram Panchayats with AI-driven transparency, efficient grievance redressal, and seamless digital services.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[slide-up_1s_ease-out_0.5s_both]">
                            <Link to="/register" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-blue-900/20">
                                Get Started Now
                            </Link>
                            <Link to="/transparency" className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                                View Transparency Data
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="fill-bg-light w-full h-24" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard icon={<Building className="w-8 h-8 text-blue-600" />} number="500+" label="Panchayats Connected" />
                    <StatCard icon={<Users className="w-8 h-8 text-green-600" />} number="10k+" label="Citizens Served" />
                    <StatCard icon={<Activity className="w-8 h-8 text-purple-600" />} number="98%" label="Resolution Rate" />
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why DigiPanchayat?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Bridging the digital divide with cutting-edge technology designed for everyone.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Mic className="w-8 h-8 text-blue-600" />}
                        title="Voice-First Interface"
                        description="Register grievances and access services using your voice in local languages."
                        delay="0"
                    />
                    <FeatureCard
                        icon={<FileText className="w-8 h-8 text-green-600" />}
                        title="Digital Records"
                        description="Secure, digitized land records and certificates available 24/7."
                        delay="100"
                    />
                    <FeatureCard
                        icon={<CreditCard className="w-8 h-8 text-purple-600" />}
                        title="Easy Payments"
                        description="Pay property tax and utility bills online with instant receipts."
                        delay="200"
                    />
                    <FeatureCard
                        icon={<Shield className="w-8 h-8 text-red-600" />}
                        title="Transparent Funds"
                        description="Track every rupee of Panchayat funds and project progress in real-time."
                        delay="300"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-blue-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your Panchayat?</h2>
                        <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
                            Join thousands of citizens and officials building a better future with DigiPanchayat.
                        </p>
                        <Link to="/register" className="inline-flex items-center bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                            Create your account now <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const StatCard = ({ icon, number, label }) => (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6 transform hover:-translate-y-1 transition-transform duration-300">
        <div className="p-4 bg-gray-50 rounded-xl">
            {icon}
        </div>
        <div>
            <div className="text-3xl font-bold text-gray-900">{number}</div>
            <div className="text-gray-600 font-medium">{label}</div>
        </div>
    </div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
    <div
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-white group-hover:shadow-md">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default Landing;
