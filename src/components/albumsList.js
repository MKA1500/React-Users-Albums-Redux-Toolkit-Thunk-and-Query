import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import ExpandablePanel from "./expoandablePanel";

function AlbumsList({ user }) {
    // while component rerenders, the request is done only once:
    const { data, error, isLoading } = useFetchAlbumsQuery(user);

    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if (isLoading) {
        content = <div className="loader"></div>;
    } else if (error) {
        content = <div>Error loading albums...</div>;
    } else {
        content = data.map((album) => {
            const header = <h5>{album.title}</h5>;
            return (
                <ExpandablePanel key={album.id} header={header}>
                    List of photos in the album
                </ExpandablePanel>
            );
        })
    }

    return (
        <>
            <div className="albums-list d-flex justify-content-between align-items-center">
                <div className="py-3">
                    Albums list for {user.name}
                </div>
                <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={handleAddAlbum}>
                    + Add album
                </button>
            </div>
            {content}
        </>
    );
}

export default AlbumsList;