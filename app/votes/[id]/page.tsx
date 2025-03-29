'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

export default function VoteDetail() {
  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Vote Cover Image */}
        <div className="h-64 bg-cover bg-center relative rounded-xl mb-8">
          <img
            src="https://images.unsplash.com/photo-1494172961521-33799ddd43a5"
            alt="Vote cover"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 rounded-xl" />
          <div className="absolute bottom-6 left-8 right-8 text-white">
            <div className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium inline-block mb-2">
              In Progress
            </div>
            <h1 className="text-3xl font-bold">Best Governance Proposal</h1>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">2 days 8 hours remaining</span>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="">
            {/* Vote Information */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Organizer"
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-800 text-lg">Alex Chen</div>
                    <div className="text-sm text-gray-500">Organizer</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Created on June 15, 2023</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">About this Vote</h3>
                <p className="text-gray-600">
                  Vote for the best community governance proposal this month. The winner will receive funding and community resources. 
                  Each proposal has been pre-screened to ensure feasibility and value. Please read each proposal carefully before voting.
                </p>
              </div>
            </div>

            {/* Candidate List */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Proposals</h3>
              <div className="space-y-5">
                {/* Proposals will be mapped here */}
                {[
                  {
                    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
                    title: "Community Education Fund",
                    votes: 8,
                    description: "Establish a community education fund to provide blockchain technology training and scholarships for youth."
                  },
                  {
                    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
                    title: "Ecosystem Expansion Plan",
                    votes: 12,
                    description: "Invest in emerging DApp developers, expand our ecosystem, and attract more users and developers."
                  },
                  {
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                    title: "Security Audit Fund",
                    votes: 4,
                    description: "Establish a dedicated fund for smart contract security audits to improve overall platform security."
                  }
                ].map((proposal, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-start">
                      <img
                        src={proposal.image}
                        alt={proposal.title}
                        className="w-16 h-16 rounded-lg mr-4 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg text-gray-800">{proposal.title}</h4>
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-1">🗳️</span>
                            <span className="text-sm font-medium text-gray-600">{proposal.votes} votes</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{proposal.description}</p>
                        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                          Vote for this
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vote Statistics */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Vote Statistics</h3>
              <div className="space-y-3">
                {[
                  { name: "Community Education Fund", percentage: 33 },
                  { name: "Ecosystem Expansion Plan", percentage: 50 },
                  { name: "Security Audit Fund", percentage: 17 }
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">{stat.name}</span>
                      <span className="text-sm font-medium text-gray-800">{stat.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center text-sm text-gray-500">
                Total votes: 24
              </div>
            </div>

            {/* Submit Button */}
            <Link
              href="/submit-proposal"
              className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl text-center font-medium transition mb-6"
            >
              Submit My Proposal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}