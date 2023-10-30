import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Loader from "./Loader";
import UserCard from "./userCard";

function UsersList() {
    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector((state) => {
        return state.users;
    });

    const handleUserAdd = () => {
        dispatch(addUser());
    };

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error fetching data...</div>
    }

    // before rendering let's sort the ids ascending:
    let newData = [...data];
    const renderedUsers = newData.sort((a, b) => b.id - a.id).map((user) => {
        return <UserCard key={user.id} user={user} />;
    })

    return (
        <div className="container py-5">
            <div className="users-list-header row mb-3">
                <div className="col-8">
                    <h2>List of users</h2> 
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <button 
                        type="button" 
                        className="btn btn-light"
                        onClick={handleUserAdd}>
                        + Add user
                    </button>
                </div>
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;