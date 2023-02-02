import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Card } from '../card/Card';
import styles from './CardList.module.scss';

export function CardList() {
    const [userList, setUserList] = useState([]);
    const [idUser, setIdUser] = useState(null);
    const socket = useRef();

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:3002');
        socket.current.onopen = () => {
            loadUsers();
        };
        socket.current.onmessage = () => {
            loadUsers();
        };
    }, []);

    function loadUsers() {
        fetch('/api')
            .then((res) => res.json())
            .then((res) => setUserList(res.users));
    }
    function postUser() {
        fetch('/addUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Vasya Pupkin',
                createdAt: new Date(),
                avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/234.jpg',
                id: idUser,
            }),
        });
    }
    return (
        <div>
            Введите № табельного
            <input
                onChange={(e) => setIdUser(e.target.value)}
                type='text'
                placeholder='id'
            />
            <button onClick={postUser}>Добавить в очередь</button>
            <div className={styles.container}>
                {userList === null ? (
                    <div>Loading...</div>
                ) : (
                    userList.map((user) => {
                        return <Card key={user.id} user={user} />;
                    })
                )}
            </div>
        </div>
    );
}
