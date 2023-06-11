import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './Context';

const Home = () => {

    const [joke, setJoke] = useState({ id: 0, setup: '', punchline: '', usersJokes: [] });
    const { user } = useAuth();

    useEffect(() => {
        getJoke();
    }, []);

    const getJoke = async () => {
        const { data } = await axios.get('/api/joke/getjoke')
        setJoke(data)
    }

    const onLike = async liked => {
        const { data } = await axios.post('/api/joke/like', { jokeId: joke.id, liked })
        setJoke(data)
    }

    return (
        <div className="container" style={{ marginTop: 60 }}>
            <div
                className="row"
                style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
            >
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                    <div>
                        <h4>{joke.setup}</h4>
                        <h4>{joke.punchline}</h4>
                        <div>
                            <div>
                                {!user && <Link to="/login">Login to your account to like/dislike this joke</Link>}
                                {user && <button disabled={joke.usersJokes.filter(uj => uj.liked).some(uj => uj.userId == user.id)} onClick={() => onLike(true)} className="btn btn-primary">Like</button>}
                                {user && <button disabled={joke.usersJokes.filter(uj => !uj.liked).some(uj => uj.userId == user.id)} onClick={() => onLike(false)} className="btn btn-danger">Dislike</button>}
                            </div>

                            <br />
                            <h4>Likes: {joke.usersJokes.filter(uj => uj.liked).length}</h4>
                            <h4>Dislikes: {joke.usersJokes.filter(uj => !uj.liked).length}</h4>
                            <h4>
                                <button onClick={() => window.location.reload()} className="btn btn-link">Refresh</button>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home



