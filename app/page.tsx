'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { HeroSection } from './components/hero-section'

export default function Home() {
  const router = useRouter();

  return (
    <div className="px-4 sm:px-8 py-8">
      <main>
        <HeroSection />
        
        {/* Category Tags */}
        <div className="flex overflow-x-auto py-2 mb-8 no-scrollbar">
          <Button className="mr-3 rounded-full bg-blue-600 text-white">All Votes</Button>
          <Button variant="secondary" className="mr-3 rounded-full">In Progress</Button>
          <Button variant="secondary" className="mr-3 rounded-full">Coming Soon</Button>
          <Button variant="secondary" className="mr-3 rounded-full">Completed</Button>
        </div>
        
        {/* Active Votes Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Active Votes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vote Card 1 */}
            <Link href="/votes/1" className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-40 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Vote illustration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium inline-block mb-2">In Progress</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Best Governance Proposal</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">Vote for the best community governance proposal this month. The winner will receive funding support.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                    </svg>
                    <span>24 votes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>3 proposals</span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Vote Card 2 */}
            <Link href="/votes/2" className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-40 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Vote illustration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium inline-block mb-2">Ending Soon</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Fund Allocation</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">Decide how to allocate this quarter's community fund to various development projects.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                    </svg>
                    <span>18 votes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>4 proposals</span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Vote Card 3 */}
            <Link href="/votes/3" className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-40 w-full">
                <Image 
                  src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Vote illustration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium inline-block mb-2">Coming Soon</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Roadmap Vote</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">Vote for the future technical direction of the project and prioritize development efforts.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                    </svg>
                    <span>0 votes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>5 proposals</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}