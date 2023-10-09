
import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"


const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {

    CLOSED: { label: "Closed", color: "red"},
    IN_PROGRESS: {label: "In Progress", color: "violet"},
    OPEN: {label: "Open", color: "green"},

}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge