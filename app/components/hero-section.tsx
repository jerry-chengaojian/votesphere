'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()

  return (
    <div className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Decentralized Voting for Community Governance</h1>
        <p className="text-blue-100 mb-6">Participate in transparent, secure voting to shape the future of your community</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Explore Votes
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white bg-white/10 hover:bg-white/15" 
            onClick={() => router.push('/create')}
          >
            Create Vote
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="relative w-full max-w-md h-64">
          <Image 
            src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Voting illustration"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
} 