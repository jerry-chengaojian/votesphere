'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useReadVoteSphereGetPollDetails } from '@/app/utils/VoteSphere'

export default function SubmitProposal() {
  const params = useParams()
  const router = useRouter()
  const pollId = typeof params.id === 'string' && !isNaN(Number(params.id)) ? BigInt(params.id) : BigInt(0)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  // Fetch poll details for the title
  const { data: pollDetails, isLoading } = useReadVoteSphereGetPollDetails({
    args: [pollId],
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add form submission logic here
  }

  if (isLoading) return <div>Loading...</div>

  const [_, title] = pollDetails || [null, "Loading..."]

  return (
    <div className="px-4 sm:px-8 py-8">
      <div className="flex items-center mb-6">
        <Link href={`/votes/${pollId}`} className="flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Vote</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="h-40 bg-cover bg-center relative">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-500" />
          )}
          <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end">
            <h1 className="text-white text-2xl font-bold">Submit Proposal for "{title}"</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">Submit your proposal for this vote. Once submitted, your proposal cannot be edited if the vote has already started or received votes.</p>
            
            <div className="flex items-center p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
              <Info className="h-4 w-4 mr-2" />
              <span>Each wallet address can only submit one proposal per vote.</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Image/Logo</label>
            <div 
              onClick={() => document.getElementById('proposal-image')?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer"
            >
              <input
                type="file"
                id="proposal-image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img src={imagePreview} alt="Preview" className="max-h-48 object-contain mb-2" />
                  <p className="text-sm text-gray-500">Click to change image</p>
                </div>
              ) : (
                <div className="py-4">
                  <span className="text-gray-400 text-4xl">+</span>
                  <p className="text-sm text-gray-500 mt-2">Click to upload image (Required)</p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Name</label>
            <Input required placeholder="Enter your proposal name" />
            <p className="text-xs text-gray-500 mt-1">Name cannot be empty</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Description</label>
            <Textarea 
              required
              rows={6}
              placeholder="Describe your proposal in detail"
            />
            <p className="text-xs text-gray-500 mt-1">This will be visible to voters when they view your proposal</p>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
          >
            Submit Proposal
          </Button>
        </form>
      </div>
    </div>
  )
} 