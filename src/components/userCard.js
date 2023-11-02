import { removeUser } from "../store";
import useThunk from "../hooks/useThunk";

function UserCard({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const letterAvanatar = () => {
        let letter = '';
        if (user.name?.length) {
            letter = user.name[0].toUpperCase();
        }
        return (
            <div className="card-avatar-wrap">
                <div className="letter-avatar" style={{ background: '#1b1925'}}>
                    {letter}
                </div>
            </div>
        );    
    };

    const onRemoveUser = () => {
        console.log('onRemoveUser');
        doRemoveUser(user);
    };

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    {letterAvanatar()}
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                            <small className="text-body-secondary">
                                Last updated 3 mins ago
                            </small>
                        </p>
                        <div className="d-flex justify-content-start">
                            <button
                                className="btn btn-danger"
                                onClick={onRemoveUser}>
                                Delete
                            </button>
                            {error && <div className="ml-3">
                                Error deleting user...
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;