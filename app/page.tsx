'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from './components/hero-section'
import { useReadVoteSphereGetAllPolls } from '@/app/utils/VoteSphere';

type PollsData = {
  ids: bigint[];
  titles: string[];
  descriptions: string[];
  imageUrls: string[];
  startTimes: bigint[];
  endTimes: bigint[];
  organizers: `0x${string}`[];
  isActives: boolean[];
  candidateCounts: bigint[];
  totalVotes: bigint[];
}

export default function Home() {
  const { data, isLoading, error } = useReadVoteSphereGetAllPolls();
  const pollsData = data ? {
    ids: data[0],
    titles: data[1],
    descriptions: data[2],
    imageUrls: data[3],
    startTimes: data[4],
    endTimes: data[5],
    organizers: data[6],
    isActives: data[7],
    candidateCounts: data[8],
    totalVotes: data[9]
  } as PollsData : undefined;


  const getStatusBadge = (startTime: bigint, endTime: bigint, isActive: boolean) => {
    const now = BigInt(Math.floor(Date.now() / 1000));
    
    if (!isActive) {
      return {
        text: "Completed",
        className: "bg-gray-500"
      };
    } else if (now < startTime) {
      return {
        text: "Coming Soon",
        className: "bg-yellow-500"
      };
    } else if (now >= startTime && now <= endTime) {
      return {
        text: "In Progress",
        className: "bg-green-500"
      };
    } else {
      return {
        text: "Ended",
        className: "bg-blue-500"
      };
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading polls</div>;

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
            {pollsData && pollsData.ids.map((id, index) => {
              const status = getStatusBadge(
                pollsData.startTimes[index],
                pollsData.endTimes[index],
                pollsData.isActives[index]
              );
              
              return (
                <Link 
                  key={id.toString()}
                  href={`/votes/${id}`} 
                  className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-40 w-full">
                    <img 
                      src={pollsData.imageUrls[index]}
                      alt="Vote illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <div className={`px-3 py-1 ${status.className} text-white rounded-full text-xs font-medium inline-block mb-2`}>
                      {status.text}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {pollsData.titles[index]}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {pollsData.descriptions[index]}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                        </svg>
                        <span>{pollsData.totalVotes[index].toString()} votes</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{pollsData.candidateCounts[index].toString()} proposals</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}