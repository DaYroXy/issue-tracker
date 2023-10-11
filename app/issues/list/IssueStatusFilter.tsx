import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]




const IssueStatusFilter = () => {

    const router = useRouter()

    return (
        <Select.Root onValueChange={(status) => {
            const query = status !== "Unfiltered" ? `?status=${status}` : ""
            router.push("/issues" + query)
        }}>
            <Select.Trigger placeholder="Fitler by status..." />
            <Select.Content>
                {statuses.map((status, index) =>
                    (<Select.Item key={index} value={status.value || 'Unfiltered'}>{status.label}</Select.Item>)
                )}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter