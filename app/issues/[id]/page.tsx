import IssueStatusBadge from "@/app/componenets/IssueStatusBadge";
import prisma from "@/prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { toggleHeading1 } from "easymde";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    if(isNaN(parseInt(params.id))) notFound()

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue) {
        notFound();
    }

    return (
        <div>
            <Heading>{issue.title}</Heading>

            <Flex gap={"3"} my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose">
                <ReactMarkdown >{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage