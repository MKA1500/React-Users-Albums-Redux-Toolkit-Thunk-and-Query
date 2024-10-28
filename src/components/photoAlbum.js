import { useRemoveAlbumMutation } from "../store";

function PhotoAlbum({ album }) {
  const [removeAlbum, { isLoading, error }] = useRemoveAlbumMutation();

  const onRemoveAlbum = () => {
    removeAlbum(album);
  };

  return (
    <div className="d-flex justify-content-between pt-2">
      <div>List of photos in the album</div>
      <button
        className="btn btn-danger"
        onClick={onRemoveAlbum}
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete album"}
      </button>
      {error && (
        <div className="text-danger">Error deleting album: {error.message}</div>
      )}
    </div>
  );
}

export default PhotoAlbum;
