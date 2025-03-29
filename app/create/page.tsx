'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { ImagePlus } from 'lucide-react'
import { useNotification } from '@/components/ui/notification-provider'

export default function CreateVotePage() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { showNotification } = useNotification()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    coverImage: null as File | null,
    coverImageUrl: ''
  })
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    coverImage: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

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
          coverImage: file,
          coverImageUrl: data.url
        }))
        setErrors(prev => ({ ...prev, coverImage: '' }))
        
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

  const validateForm = () => {
    const newErrors = {
      title: !formData.title ? 'Title cannot be empty' : '',
      description: !formData.description ? 'Description cannot be empty' : '',
      startDate: !formData.startDate ? 'Start date is required' : 
                 new Date(formData.startDate) <= new Date() ? 'Start date must be in the future' : '',
      endDate: !formData.endDate ? 'End date is required' : 
               new Date(formData.endDate) <= new Date(formData.startDate) ? 'End date must be after start date' : '',
      coverImage: !formData.coverImage ? 'Cover image is required' : ''
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      showNotification({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a vote",
        variant: "error"
      })
      return
    }
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Here you would implement the actual blockchain transaction
      // For now, we'll just simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      showNotification({
        title: "Vote created successfully",
        description: "Your vote has been created and is now live",
        variant: "success"
      })
      
      router.push('/')
    } catch (error) {
      console.error('Error creating vote:', error)
      showNotification({
        title: "Failed to create vote",
        description: "There was an error creating your vote. Please try again.",
        variant: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Create New Vote</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <div 
              className={`border-2 border-dashed ${errors.coverImage ? 'border-red-300' : 'border-gray-300'} 
                         rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer`}
              onClick={() => document.getElementById('poll-image')?.click()}
            >
              {formData.coverImage ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={formData.coverImageUrl || URL.createObjectURL(formData.coverImage)} 
                    alt="Preview" 
                    className="max-h-48 object-contain mb-2" 
                  />
                  <p className="text-sm text-gray-500">Click to change image</p>
                </div>
              ) : (
                <div className="py-4">
                  <ImagePlus className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Click to upload image (Required)</p>
                </div>
              )}
              <input 
                type="file" 
                className="hidden" 
                id="poll-image" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {errors.coverImage && <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>}
          </div>
          
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="Enter vote title"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? 'border-red-300' : ''}
            />
            {errors.title ? 
              <p className="text-xs text-red-500 mt-1">{errors.title}</p> : 
              <p className="text-xs text-gray-500 mt-1">Title cannot be empty</p>
            }
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe what this vote is about"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'border-red-300' : ''}
            />
            {errors.description ? 
              <p className="text-xs text-red-500 mt-1">{errors.description}</p> : 
              <p className="text-xs text-gray-500 mt-1">Description cannot be empty</p>
            }
          </div>
          
          {/* Start and End Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <Input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={errors.startDate ? 'border-red-300' : ''}
              />
              {errors.startDate ? 
                <p className="text-xs text-red-500 mt-1">{errors.startDate}</p> : 
                <p className="text-xs text-gray-500 mt-1">Start date must be in the future</p>
              }
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <Input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={errors.endDate ? 'border-red-300' : ''}
              />
              {errors.endDate ? 
                <p className="text-xs text-red-500 mt-1">{errors.endDate}</p> : 
                <p className="text-xs text-gray-500 mt-1">End date must be after start date</p>
              }
            </div>
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Vote...' : 'Create Vote'}
          </Button>
        </form>
      </div>
    </div>
  )
} 