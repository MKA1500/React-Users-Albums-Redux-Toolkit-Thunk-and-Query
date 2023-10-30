function UserCard({ user }) {
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

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    {letterAvanatar()}
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;