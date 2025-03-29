'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useReadVoteSphereGetPollDetails } from '@/app/utils/VoteSphere'
import { useAccount, usePublicClient } from 'wagmi'
import { useNotification } from '@/components/ui/notification-provider'
import { useWriteVoteSphereAddCandidate } from '@/app/utils/VoteSphere'

export default function SubmitProposal() {
  const params = useParams()
  const router = useRouter()
  const pollId = typeof params.id === 'string' && !isNaN(Number(params.id)) ? BigInt(params.id) : BigInt(0)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const { isConnected } = useAccount()
  const { showNotification } = useNotification()
  const { writeContractAsync } = useWriteVoteSphereAddCandidate()
  const publicClient = usePublicClient()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    imageUrl: ''
  })

  // Fetch poll details for the title
  const { data: pollDetails, isLoading } = useReadVoteSphereGetPollDetails({
    args: [pollId],
  })

  // Update the combined loading state
  const isLoadingCombined = isSubmitting || isConfirming || isLoading

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        setFormData(prev => ({ 
          ...prev, 
          image: file,
          imageUrl: data.url
        }))
        setImagePreview(URL.createObjectURL(file))
        
      } catch (error) {
        console.error('Error uploading image:', error)
        showNotification({
          title: "Upload Failed",
          description: "Failed to upload image. Please try again.",
          variant: "error"
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!isConnected) {
      showNotification({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a proposal",
        variant: "error"
      })
      return
    }

    if (!formData.image) {
      showNotification({
        title: "Image Required",
        description: "Please upload an image for your proposal",
        variant: "error"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      if (!publicClient) throw new Error("Public client not initialized")

      // Send transaction with pre-uploaded image URL
      const hash = await writeContractAsync({
        args: [
          pollId,
          formData.name,
          formData.description,
          formData.imageUrl // Use the pre-uploaded image URL
        ]
      })

      // 3. Show waiting notification and set confirming state
      setIsConfirming(true)
      showNotification({
        title: "Transaction Submitted",
        description: "Please wait while your proposal is being submitted...",
        variant: "info"
      })

      // 4. Wait for confirmation
      await publicClient.waitForTransactionReceipt({ hash })
      
      showNotification({
        title: "Proposal Submitted Successfully",
        description: "Your proposal has been added to the vote!",
        variant: "success"
      })

      // 5. Redirect back to vote page
      router.push(`/votes/${pollId}`)
      
    } catch (error: any) {
      console.error('Error submitting proposal:', error)
      
      let errorTitle = "Failed to submit proposal"
      let errorDescription = "There was an error submitting your proposal. Please try again."
      
      if (error?.message?.includes('rejected')) {
        errorTitle = "Transaction Rejected"
        errorDescription = "You rejected the transaction in your wallet."
      } else if (error?.message?.includes('insufficient funds')) {
        errorTitle = "Insufficient Funds"
        errorDescription = "You don't have enough funds to complete this transaction."
      } else if (error?.message?.includes('network')) {
        errorTitle = "Network Error"
        errorDescription = "There was a problem connecting to the blockchain. Please check your connection."
      }
      
      showNotification({
        title: errorTitle,
        description: errorDescription,
        variant: "error"
      })
    } finally {
      setIsSubmitting(false)
      setIsConfirming(false)
    }
  }

  if (isLoadingCombined) return <div>Loading...</div>

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
            <Input 
              required
              name="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your proposal name" 
            />
            <p className="text-xs text-gray-500 mt-1">Name cannot be empty</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Description</label>
            <Textarea 
              required
              name="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={6}
              placeholder="Describe your proposal in detail"
            />
            <p className="text-xs text-gray-500 mt-1">This will be visible to voters when they view your proposal</p>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
            disabled={isLoadingCombined}
          >
            {isLoadingCombined && (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isConfirming ? 'Confirming Transaction...' : 'Processing...'}
              </span>
            )}
            {!isLoadingCombined && 'Submit Proposal'}
          </Button>
        </form>
      </div>
    </div>
  )
} 