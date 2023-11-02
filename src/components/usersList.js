import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Loader from "./Loader";
import UserCard from "./userCard";
import useThunk from "../hooks/useThunk";

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    });

    const handleUserAdd = () => {
        doCreateUser();
    };

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    // before rendering let's sort the ids ascending:
    let newData = [...data];
    let content;
    if (isLoadingUsers) {
        content = <Loader />
    } else if (loadingUsersError) {
        content = <div>Error fetching data...</div>
    } else {
        content = newData.sort((a, b) => b.id - a.id).map((user) => {
            return <UserCard key={user.id} user={user} />;
        })
    }

    return (
        <div className="container py-5">
            <div className="users-list-header row mb-3">
                <div className="col-8">
                    <h2>List of users</h2> 
                </div>
                <div className="col-4 d-flex justify-content-end position-relative">
                    {isCreatingUser 
                    ? <div className="loader-small-background">
                        <div className="loader"></div>
                    </div>
                    : creatingUserError 
                        ? <h5>Creating user error...</h5>
                        : <button 
                            type="button" 
                            className="btn btn-light"
                            onClick={handleUserAdd}>
                            + Add user
                        </button>}
                </div>
            </div>
            {content}
        </div>
    );
}

export default UsersList;