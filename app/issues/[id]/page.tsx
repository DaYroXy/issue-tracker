import IssueStatusBadge from "@/app/componenets/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const session = await getServerSession(authOptions)

    // await delay(2000)
    if (isNaN(parseInt(params.id))) notFound()

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{initial: "1", md:"5"}} gap="5" >
            <Box  className='lg:col-span-4'>
                <Heading>{issue.title}</Heading>

                <Flex gap={"3"} my="2">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose w-full">
                    <ReactMarkdown >{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            {session &&
                <Box>
                    <Flex direction="column" gap="4">
                        <Button>
                            <Pencil2Icon />
                            <Link href={`/issues/${issue.id}/edit`}>Edit Issues</Link>
                        </Button>

                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export default IssueDetailPage