
import { useRouter } from 'next/router'

import Header from "../components/header";
import Album from "../components/album"

function Discography({ members, units, albums }) {
    return (
        <>
            <Header 
                members={members} />

            <main className="flex-grow container mx-auto mt-6 mb-10">
                {albums.map(album => (
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
                        />
                ))}
            </main>
        </>
    )
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
