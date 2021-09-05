
import { useRouter } from 'next/router'

import Header from "../../components/header";
import Album from "../../components/album"

function Discography({ members, units, albums }) {
    const router = useRouter();
    const currentMember = router.query.member ? members.find(member => member.slug === router.query.member) : undefined;
    
    return (
        <>
            <Header 
                members={members}
                currentMember={currentMember} />

            <main className="flex-grow container mx-auto mt-6 mb-10">
                {albums.map(album => (
                    album.participating_members.includes(currentMember.name) &&
                    <Album
                        id={album.name}
                        name={album.name}
                        releaseDate={album.release_date}
                        type={album.type}
                        links={album.links}
                        cover={album.cover_url}
                        members={album.participating_members}
                        tracks={album.tracks}
                        units={units}
                        currentMember={currentMember.name}
                        />
                ))}
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const data = await import("/data.json");
    const paths = data.members.map(member => ({ params: { member: member.slug }}));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps() {
    const data = await import("/data.json");

    return {
        props: {
            members: data.members,
            units: data.units,
            albums: data.albums
        },
    }
}

export default Discography;
