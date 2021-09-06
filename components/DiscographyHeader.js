
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { useContext } from 'react';
import { useRouter } from 'next/router'
import { FilterMembersStateContext } from './FilterMembers'
import { X } from 'react-feather'
import Information from './Information'
import UnitInformation from './UnitInformation'
import MemberInformation from './MemberInformation'

export default function DiscographyHeader({ units, members, currentUnit, currentMember, matchingAlbumCount, matchingTrackCount }) {
  const { filtered, setFiltered } = useContext(FilterMembersStateContext);
  return (
    <>
      <div className="px-2 py-1
          lg:pt-4 lg:px-10">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row flex-wrap border-b border-gray-200
              px-1 py-2 mb-4 pb-8
              lg:flex-nowrap lg:px-3">
          <div className="w-full mt-2 lg:mt-0 mb-4 lg:w-1/3 lg:px-3 lg:mb-2">
            <h1 className="title text-2xl mb-1">Information</h1>
            {
              (!currentMember && !currentUnit)
                ? <Information />
                : currentMember
                  ? <MemberInformation 
                      member={currentMember}
                      unit={currentUnit} 
                      matchingAlbumCount={matchingAlbumCount} 
                      matchingTrackCount={matchingTrackCount}/>
                  : <UnitInformation 
                      unit={currentUnit} 
                      matchingAlbumCount={matchingAlbumCount} 
                      matchingTrackCount={matchingTrackCount}/>
            }
          </div>
          <div className="w-full mt-2 lg:mt-0 mb-4 lg:w-2/3 lg:px-3 lg:mb-2">
            <div className="flex flex-nowrap justify-between items-center border-b mb-3">
              <div className="flex flex-wrap gap-x-2 mb-1">
                <h1 className="title text-2xl">Filter</h1>
                {currentUnit && <Link href={`/discography/${currentMember ? currentMember.slug : ''}`}><a className="flex items-center text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm">
                  <X strokeWidth={2} size={16} />
                  <span className="text-black">{currentUnit.name}</span>
                </a></Link>}
                {currentMember && <Link href={`/discography/${currentUnit ? currentUnit.slug : ''}`}><a className="flex items-center text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5 text-sm">
                <X strokeWidth={2} size={16} />
                  <span className="text-black">{currentMember.name}</span>
                </a></Link>}
              </div>
              <div className="flex flex-wrap gap-x-1 items-baseline mb-1">
                <Switch
                  checked={filtered}
                  onChange={setFiltered}
                  className={`${filtered ? 'bg-nctu' : 'bg-gray-200'
                    } relative inline-flex items-center h-5 rounded-full w-10 border`}
                >
                  <span className="sr-only">Toggle non-participating members</span>
                  <span
                    className={`transform transition ease-in-out duration-200
                  ${filtered ? 'translate-x-6' : 'translate-x-1'}
                  inline-block w-3 h-3 transform bg-white rounded-full`}
                  />
                </Switch>
                <span className="">Hide</span>
                <span className="hidden md:flex">non-participating members</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-1 gap-y-1 mb-3">
              {units.map((unit) => (
                <Link key={`unitFilter-${unit.slug}`} href={`/discography/${unit.slug}/${currentMember ? currentMember.slug : ''}`}>
                  <a className={`cursor-pointer text-sm px-2.5 py-1 rounded-full border border-${unit.color} hover:text-${unit.text} hover:bg-${unit.color}
                      ${currentUnit && (currentUnit.slug === unit.slug ? `text-${unit.text} bg-${unit.color}` : '')}
                      `}>
                    {unit.name}</a>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap justify-between gap-x-1 gap-y-1">
              {members.map((member) => (
                <Link key={`memberFilter-${member.slug}`} href={`/discography${currentUnit ? ('/' + currentUnit.slug) : ''}/${member.slug}`}>
                  <a className={`cursor-pointer text-sm px-2.5 py-1 rounded-full border border-nctu hover:bg-nctu
                      ${currentMember && (currentMember.slug === member.slug ? 'bg-nctu' : '')}
                      `}>
                    {member.name}</a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}