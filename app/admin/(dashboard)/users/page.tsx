import React from 'react';
import UserStats from './_components/UserStats';
import UserList from './_components/UserList';
import AnimationWrapper from '@/components/AnimationWrapper';

function Users() {
    return (
        <div className="flex flex-col gap-8">
            {/* Page Header */}
            <AnimationWrapper animationType="fadeDown">
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-[#111827] mb-1">Users</h1>
                    <p className="text-gray-500 text-sm">
                        See all the members who buy lottery for special events
                    </p>
                </div>
            </AnimationWrapper>

            {/* Stats Section */}
            <UserStats />

            {/* User List Table Section */}
            <UserList />
        </div>
    );
}

export default Users;

