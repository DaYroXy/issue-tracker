import prisma from "@/prisma/client"
import { Button, Table } from "@radix-ui/themes"
import Link from "next/link"
import IssueStatusBadge from "../componenets/IssueStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";


interface Props {
  searchParams: { status: Status }
}


const IssuesPage = async ({ searchParams }: Props) => {


  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const issues = await prisma.issue.findMany({
    where: { status: status }
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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
    </div>
  )
}


export const dynamic = 'force-dynamic'

export default IssuesPage