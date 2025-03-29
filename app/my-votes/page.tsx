import { Metadata } from "next"
import { MyVotesHeader } from "./components/my-votes-header"
import { MyVotesContent } from "./components/my-votes-content"

export const metadata: Metadata = {
  title: "My Votes | VoteChain",
  description: "Manage your votes and proposals on VoteChain",
}

export default function MyVotesPage() {
  return (
    <main className="px-4 sm:px-8 py-8">
      <MyVotesHeader />
      <MyVotesContent />
    </main>
  )
} 