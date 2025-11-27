import React, { useState } from 'react';
import { FileText, Home, Droplets, Briefcase, Building, Users, Search, ArrowRight } from 'lucide-react';

const Services = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const services = [
        { id: 1, title: 'Property Tax', icon: <Home className="w-8 h-8 text-blue-500" />, desc: 'Pay your property tax online and get instant receipt.' },
        { id: 2, title: 'Birth Certificate', icon: <Users className="w-8 h-8 text-green-500" />, desc: 'Apply for birth certificate and track application status.' },
        { id: 3, title: 'Water Bill', icon: <Droplets className="w-8 h-8 text-cyan-500" />, desc: 'Pay water utility bills and view payment history.' },
        { id: 4, title: 'Trade License', icon: <Briefcase className="w-8 h-8 text-purple-500" />, desc: 'Apply for new trade license or renew existing one.' },
        { id: 5, title: 'Building Permission', icon: <Building className="w-8 h-8 text-orange-500" />, desc: 'Submit building plans for approval and tracking.' },
        { id: 6, title: 'Caste Certificate', icon: <FileText className="w-8 h-8 text-red-500" />, desc: 'Apply for caste and income certificates digitally.' },
    ];

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-primary text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-90"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-[fade-in_0.5s_ease-out]">Online Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 animate-[fade-in_0.5s_ease-out_0.2s_both]">
                        Access all Gram Panchayat services from the comfort of your home. Fast, Secure, and Transparent.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative animate-[slide-up_0.5s_ease-out_0.4s_both]">
                        <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for a service..."
                            className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-6 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                            <button className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No services found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
