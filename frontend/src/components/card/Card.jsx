import styles from './Card.module.scss';

export function Card({ user }) {
    function parseDate(date) {
        date = new Date(date);
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
            date.getMonth() + 1
        }`;
    }
    return (
        <div className={styles.container}>
            <img src={user.avatar} height={120} alt='user'></img>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.informUser}>
                <div className={styles.lineInformUser}>
                    <div>Таб №</div>
                    <div>{user.id}</div>
                </div>
                <div className={styles.lineInformUser}>
                    <div>Светильник</div>
                    <div>{user.id}</div>
                </div>
                <div className={styles.lineInformUser}>
                    <div>Время выдачи</div>
                    <div>{parseDate(user.createdAt)}</div>
                </div>
                <div className={styles.lineInformUser}>Компания</div>
            </div>
        </div>
    );
}
