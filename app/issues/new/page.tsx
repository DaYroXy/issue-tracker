import dynamic from "next/dynamic"
import IssueFormSkeleton from "./loading"

const IssueForm = dynamic(
  () => import("@/app/issues/_componenets/issueForm"),
  
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage