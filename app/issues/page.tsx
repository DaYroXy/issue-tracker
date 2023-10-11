import prisma from "@/prisma/client"
import { Button, Table } from "@radix-ui/themes"
import Link from "next/link"
import IssueStatusBadge from "../componenets/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../componenets/Pagination";


interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    orderDirection: 'asc' | 'desc',
    page: string
  }
}


const IssuesPage = async ({ searchParams }: Props) => {

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
      { label: 'issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const isValidOrderDirection = ['asc', 'desc'].includes(searchParams.orderDirection) ? searchParams.orderDirection : 'asc';
  const orderBy =
    columns.map(column => column.value)
      .includes(searchParams.orderBy) ? { [searchParams.orderBy]: isValidOrderDirection }
      : undefined
  const where = { status }

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where })

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}><Link href={{
                query: {
                  ...searchParams,
                  orderBy: column.value,
                  orderDirection: searchParams.orderDirection === 'asc' ? 'desc' : 'asc'
                }
              }}>{column.label}</Link> {column.value === searchParams.orderBy && (searchParams.orderDirection === 'asc' ? <ArrowUpIcon className="inline" /> : <ArrowDownIcon className="inline" />)}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden"><IssueStatusBadge status={status} /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
    </div>
  )
}


export const dynamic = 'force-dynamic'

export default IssuesPage