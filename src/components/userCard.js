import { removeUser } from "../store";
import useThunk from "../hooks/useThunk";
import ExpandablePanel from "./expoandablePanel";
import AlbumsList from "./albumsList";

function UserCard({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const letterAvanatar = () => {
        let letter = '';
        if (user.name?.length) {
            letter = user.name[0].toUpperCase();
        }
        return (
            <div className="card-avatar-wrap">
                <div className="letter-avatar">
                    {letter}
                </div>
            </div>
        );    
    };

    const onRemoveUser = () => {
        console.log('onRemoveUser');
        doRemoveUser(user);
    };

    const header =
        <div className="d-flex">
            {letterAvanatar()}
            <div className="left-header-info">
                <h3 className="card-title">{user.name}</h3>
            </div>
            <div className="delete-box d-flex align-items-start px-3">
                <button
                    className="btn btn-danger"
                    onClick={onRemoveUser}>
                    Delete
                </button>
                {error && <div className="ml-3">
                    Error deleting user...
                </div>}
            </div>
        </div>;

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UserCard;