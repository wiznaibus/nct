
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { useContext } from 'react';
import { FilterMembersStateContext } from './FilterMembers';

export default function Header({ members, currentMember = { name: "All Members", slug: "" } }) {
  const memberFilter = [{ name: "All Members", slug: "" }];
  memberFilter.push(...members);

  const { filtered, setFiltered } = useContext(FilterMembersStateContext);

  return (
    <div className="container mx-auto flex flex-wrap border-b border-gray-200
              px-1 py-2 mb-4 pb-8
              lg:flex-nowrap lg:px-3">
      <div className="w-full mb-4
              lg:w-1/3 lg:px-3 lg:mb-2">
        <h1 className="text-2xl mb-1">NCT Discography</h1>
        <p className="">This is an ongoing discography project designed to quickly and conveniently display which members participated in specific songs.</p>
      </div>

      <div className="w-full px-3 lg:w-2/3">
        <div className="flex flex-nowrap justify-between mb-3">
          <h1 className="text-2xl">Filter</h1>
          <p>
            <Switch
              checked={filtered}
              onChange={setFiltered}
              className={`
                ${filtered ? 'bg-nctu' : 'bg-gray-200'} 
                relative inline-flex items-center h-5 rounded-full w-10 border
              `}>
              <span className="sr-only">Toggle non-participating members</span>
              <span
                className={`transform transition ease-in-out duration-200
                  ${filtered ? 'translate-x-6' : 'translate-x-1'}
                  inline-block w-3 h-3 transform bg-white rounded-full`}
              />
            </Switch> Hide non-participating members
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-x-1 gap-y-1">
          {memberFilter.map((member) => (
            <Link key={member.slug} href={`/discography/${member.slug}`}>
              <a className={`cursor-pointer text-sm px-2.5 py-1 rounded-full border border-nctu hover:bg-nctu
                ${currentMember.slug === member.slug ? 'bg-nctu' : ''}
              `}>
                {member.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}