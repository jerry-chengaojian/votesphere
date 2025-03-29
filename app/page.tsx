'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroSection } from './components/hero-section'
import { useReadVoteSphereGetAllPolls } from '@/app/utils/VoteSphere';
import { useState } from 'react';

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
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
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

  const getFilteredPolls = () => {
    if (!pollsData) return [];
    
    return pollsData.ids.map((id, index) => {
      const now = BigInt(Math.floor(Date.now() / 1000));
      const startTime = pollsData.startTimes[index];
      const endTime = pollsData.endTimes[index];
      const isActive = pollsData.isActives[index];
      
      let status = '';
      if (!isActive) {
        status = 'completed';
      } else if (now < startTime) {
        status = 'coming-soon';
      } else if (now >= startTime && now <= endTime) {
        status = 'in-progress';
      } else {
        status = 'ended';
      }
      
      return {
        id,
        index,
        status
      };
    }).filter(poll => {
      if (activeFilter === 'all') return true;
      return poll.status === activeFilter;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading polls</div>;

  const filteredPolls = getFilteredPolls();
  
  return (
    <div className="px-4 sm:px-8 py-8">
      <main>
        <HeroSection />
        
        {/* Category Tags */}
        <div className="flex overflow-x-auto py-2 mb-8 no-scrollbar">
          <Button 
            className={`mr-3 rounded-full ${activeFilter === 'all' ? 'bg-blue-600 text-white' : ''}`}
            variant={activeFilter === 'all' ? 'default' : 'secondary'}
            onClick={() => setActiveFilter('all')}
          >
            All Votes
          </Button>
          <Button 
            variant={activeFilter === 'in-progress' ? 'default' : 'secondary'} 
            className={`mr-3 rounded-full ${activeFilter === 'in-progress' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button 
            variant={activeFilter === 'coming-soon' ? 'default' : 'secondary'} 
            className={`mr-3 rounded-full ${activeFilter === 'coming-soon' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveFilter('coming-soon')}
          >
            Coming Soon
          </Button>
          <Button 
            variant={activeFilter === 'completed' ? 'default' : 'secondary'} 
            className={`mr-3 rounded-full ${activeFilter === 'completed' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </Button>
        </div>
        
        {/* Active Votes Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">
            {activeFilter === 'all' ? 'All Votes' : 
             activeFilter === 'in-progress' ? 'In Progress Votes' :
             activeFilter === 'coming-soon' ? 'Coming Soon Votes' :
             'Completed Votes'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolls.length > 0 ? filteredPolls.map(poll => {
              const index = poll.index;
              const status = getStatusBadge(
                pollsData!.startTimes[index],
                pollsData!.endTimes[index],
                pollsData!.isActives[index]
              );
              
              return (
                <Link 
                  key={poll.id.toString()}
                  href={`/votes/${poll.id}`} 
                  className="group block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-40 w-full">
                    <img 
                      src={pollsData!.imageUrls[index]}
                      alt="Vote illustration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <div className={`px-3 py-1 ${status.className} text-white rounded-full text-xs font-medium inline-block mb-2`}>
                      {status.text}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {pollsData!.titles[index]}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {pollsData!.descriptions[index]}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                        <span>{pollsData!.totalVotes[index].toString()} votes</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{pollsData!.candidateCounts[index].toString()} proposals</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }) : (
              <div className="col-span-3 text-center py-10 text-gray-500">
                No {activeFilter === 'all' ? '' : 
                   activeFilter === 'in-progress' ? 'In Progress ' :
                   activeFilter === 'coming-soon' ? 'Coming Soon ' :
                   'Completed '}Votes found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}