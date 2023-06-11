import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAll = () => {

    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        const getJokes = async () => {
            const { data } = await axios.get('/api/joke/getall')
            setJokes(data);
            console.log(data)
        }
        getJokes();
    }, []);

    return (
        <div className="container" style={{ marginTop: 60 }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {jokes.map(j =>
                        <div className="card card-body bg-light mb-3">
                            <h5>{j.setup}</h5>
                            <h5>{j.punchline}</h5>
                            <span>Likes: {j.usersJokes.filter(uj => uj.liked).length} </span>
                            <br />
                            <span>Dislikes: {j.usersJokes.filter(uj => !uj.liked).length}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default ViewAll