
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { useContext } from 'react';
import { FilterNonparticipatingMembersStateContext } from './Filter/FilterNonparticipatingMembers'
import { Info, X } from 'react-feather'
import Information from './Information'
import UnitInformation from './UnitInformation'
import MemberInformation from './MemberInformation'

export default function DiscographyHeader({
  hasMemberQuery,
  hasUnitQuery,
  currentMember,
  currentUnit,
  members,
  units,
  albumCount,
  songCount,
}) {

  const { nonparticipatingMembersFilter, setNonparticipatingMembersFilter } = useContext(FilterNonparticipatingMembersStateContext);

  return (
    <>
      <div className="px-2 py-1
          lg:pt-4 lg:px-10">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row flex-wrap border-b border-gray-200
              px-1 py-2 mb-4 pb-8
              lg:flex-nowrap lg:px-3">
          <div className="w-full mt-2 lg:mt-0 mb-4 lg:w-1/3 lg:px-3 lg:mb-2">
            <h2 className="title text-2xl mb-1"><Info className="" strokeWidth={2} size={16} /> Information</h2>
            {
              (!hasMemberQuery && !hasUnitQuery)
                ? <UnitInformation
                  unit={{
                    name: 'NCT'
                  }}
                  albumCount={albumCount}
                  songCount={songCount} />
                : hasMemberQuery
                  ? <MemberInformation
                    member={currentMember}
                    hasUnit={hasUnitQuery}
                    unit={currentUnit}
                    albumCount={albumCount}
                    songCount={songCount} />
                  : <UnitInformation
                    unit={currentUnit}
                    albumCount={albumCount}
                    songCount={songCount} />
            }
          </div>
          {/* <div className="w-full mt-2 lg:mt-0 mb-4 lg:w-2/3 lg:px-3 lg:mb-2">
            <div className="flex flex-nowrap justify-between items-center border-b mb-3">
              <div className="flex flex-wrap gap-x-2 mb-1">
                <h2 className="title text-2xl">Filter</h2>
                {hasUnitQuery && <Link href={`/discography/${hasMemberQuery ? currentMember.slug : ''}`}><a className="flex items-center text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm">
                  <X strokeWidth={2} size={16} />
                  <span className="text-black">{currentUnit.name}</span>
                </a></Link>}
                {hasMemberQuery && <Link href={`/discography/${hasUnitQuery ? currentUnit.slug : ''}`}><a className="flex items-center text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm">
                  <X strokeWidth={2} size={16} />
                  <span className="text-black">{currentMember.name}</span>
                </a></Link>}
              </div>
              <div className="flex flex-wrap gap-x-1 items-baseline mb-1">
                <Switch.Group>
                  <Switch
                    checked={nonparticipatingMembersFilter}
                    onChange={setNonparticipatingMembersFilter}
                    className={`${nonparticipatingMembersFilter ? 'bg-nctu' : 'bg-gray-200'
                      } relative inline-flex items-center h-5 rounded-full w-10 border`}
                  >
                    <span className="sr-only">Hide non-participating members</span>
                    <span
                      className={`transform transition ease-in-out duration-200 ${nonparticipatingMembersFilter ? 'translate-x-6' : 'translate-x-1'} inline-block w-3 h-3 transform bg-white rounded-full`}
                    />
                  </Switch>
                  <Switch.Label className="cursor-pointer">Hide <span className="hidden md:flex">non-participating members</span></Switch.Label>
                </Switch.Group>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-1 gap-y-1 mb-3">
              {units.map((unit) => (
                <Link key={`unitFilter-${unit.slug}`} href={`/discography/${unit.slug}/${hasMemberQuery ? currentMember.slug : ''}`}>
                  <a className={`cursor-pointer text-sm px-2.5 py-1 rounded-full border border-${unit.primary_color} hover:text-${unit.secondary_color} hover:bg-${unit.primary_color} ${hasUnitQuery
                    ? (currentUnit.id === unit.id ? `text-${unit.secondary_color} bg-${unit.primary_color}` : '') : ''} `}>
                    {unit.name}</a>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-between gap-x-1 gap-y-1">
              {members.map((member) => (
                <Link key={`memberFilter-${member.slug}`} href={`/discography${hasUnitQuery ? ('/' + currentUnit.slug) : ''}/${member.slug}`}>
                  <a className={`cursor-pointer text-sm px-2.5 py-1 rounded-full border border-nctu hover:bg-nctu ${hasMemberQuery
                    ? (currentMember.id === member.id ? 'bg-nctu' : '') : ''} `}>
                    {member.name}</a>
                </Link>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}