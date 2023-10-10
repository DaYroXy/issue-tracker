'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    });

    if (isLoading) return <Skeleton />

    if (error) return null;

    return (
        <>
            <Select.Root 
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={(userId) => {
                    axios.patch('/api/issues/' + issue.id, {assignedToUserId: userId})
                    .catch(() => {
                        toast.error('Changes could not be saved.')
                    })
                }}>
                <Select.Trigger placeholder='Asign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="Unassigned">Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Toaster />
        </>
    )
}

export default AssigneeSelect