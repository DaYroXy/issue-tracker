import Pagination from "./componenets/Pagination";

export default function Home({ searchParams }: { searchParams: { page: string } }) {

  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </div>
  )
}
