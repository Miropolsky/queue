const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Список очереди
let obs = [
    {
        createdAt: '2023-02-01T00:30:58.230Z',
        name: 'Karen Grady',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/234.jpg',
        id: '1',
    },
    {
        createdAt: '2023-01-31T23:56:20.414Z',
        name: 'Mrs. Debbie Renner IV',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/154.jpg',
        id: '2',
    },
    {
        createdAt: '2023-01-31T16:44:06.052Z',
        name: 'Cody Grady',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/761.jpg',
        id: '3',
    },
    {
        createdAt: '2023-01-31T10:57:33.721Z',
        name: 'Pauline Schamberger',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/109.jpg',
        id: '4',
    },
    {
        createdAt: '2023-01-31T15:10:23.903Z',
        name: 'Carlos Gutkowski',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/664.jpg',
        id: '5',
    },
    {
        createdAt: '2023-01-31T17:54:53.787Z',
        name: 'Lucy Keebler',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/228.jpg',
        id: '6',
    },
    {
        createdAt: '2023-01-31T20:17:19.536Z',
        name: 'Rebecca Gerlach',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/20.jpg',
        id: '7',
    },
    {
        createdAt: '2023-02-01T05:52:32.869Z',
        name: 'Carroll Tillman',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/258.jpg',
        id: '8',
    },
    {
        createdAt: '2023-02-01T07:29:59.385Z',
        name: 'Don Rohan',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/98.jpg',
        id: '9',
    },
    {
        createdAt: '2023-01-31T10:59:57.624Z',
        name: 'Felipe Stehr',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/347.jpg',
        id: '10',
    },
    {
        createdAt: '2023-02-01T09:49:33.337Z',
        name: 'Whitney Aufderhar',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/354.jpg',
        id: '11',
    },
    {
        createdAt: '2023-01-31T13:40:19.381Z',
        name: 'Michelle Pagac',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/113.jpg',
        id: '12',
    },
    {
        createdAt: '2023-02-01T07:35:40.506Z',
        name: 'Faye Ortiz',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/853.jpg',
        id: '13',
    },
    {
        createdAt: '2023-01-31T20:33:05.103Z',
        name: 'Mr. Judith Rice',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/164.jpg',
        id: '14',
    },
    {
        createdAt: '2023-02-01T05:01:26.301Z',
        name: 'Estelle Emard',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1167.jpg',
        id: '15',
    },
    {
        createdAt: '2023-01-31T12:14:28.654Z',
        name: 'Corey Zemlak',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/254.jpg',
        id: '16',
    },
    {
        createdAt: '2023-02-01T07:11:06.250Z',
        name: 'Traci Windler',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/328.jpg',
        id: '17',
    },
    {
        createdAt: '2023-01-31T22:09:43.277Z',
        name: 'Joyce Kautzer',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/199.jpg',
        id: '18',
    },
    {
        createdAt: '2023-01-31T22:13:13.725Z',
        name: 'Victoria Kutch',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/937.jpg',
        id: '19',
    },
    {
        createdAt: '2023-02-01T08:22:22.187Z',
        name: 'Catherine King DVM',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/122.jpg',
        id: '20',
    },
    {
        createdAt: '2023-02-01T07:33:06.648Z',
        name: 'Kendra Baumbach',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1154.jpg',
        id: '21',
    },
    {
        createdAt: '2023-02-01T04:39:11.891Z',
        name: 'Jaime Nitzsche',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1132.jpg',
        id: '22',
    },
    {
        createdAt: '2023-01-31T19:40:20.500Z',
        name: 'Mildred Goodwin',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/581.jpg',
        id: '23',
    },
    {
        createdAt: '2023-01-31T16:23:35.985Z',
        name: 'Harold Daugherty II',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/290.jpg',
        id: '24',
    },
    {
        createdAt: '2023-02-01T09:16:01.341Z',
        name: 'Ira Quigley',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/669.jpg',
        id: '25',
    },
    {
        createdAt: '2023-02-01T07:07:26.335Z',
        name: 'Whitney Kautzer',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1068.jpg',
        id: '26',
    },
    {
        createdAt: '2023-01-31T20:53:28.323Z',
        name: 'Lillie Ondricka',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/233.jpg',
        id: '27',
    },
    {
        createdAt: '2023-01-31T22:49:34.075Z',
        name: 'Bridget Lebsack',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/46.jpg',
        id: '28',
    },
    {
        createdAt: '2023-02-01T05:25:17.942Z',
        name: 'Becky Simonis',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/35.jpg',
        id: '29',
    },
    {
        createdAt: '2023-01-31T14:08:00.342Z',
        name: 'Herman Murphy',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/142.jpg',
        id: '30',
    },
    {
        createdAt: '2023-02-01T04:07:04.581Z',
        name: 'Ginger Gottlieb',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1011.jpg',
        id: '31',
    },
    {
        createdAt: '2023-02-01T10:47:33.577Z',
        name: 'Juan Witting',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/389.jpg',
        id: '32',
    },
    {
        createdAt: '2023-01-31T18:55:26.232Z',
        name: 'Lucille Kuhlman',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/795.jpg',
        id: '33',
    },
    {
        createdAt: '2023-01-31T13:01:27.426Z',
        name: 'Rosemary Waters',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/451.jpg',
        id: '34',
    },
    {
        createdAt: '2023-01-31T12:54:22.926Z',
        name: 'Suzanne Simonis',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/298.jpg',
        id: '35',
    },
    {
        createdAt: '2023-02-01T10:04:58.256Z',
        name: 'Paula Cronin',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/742.jpg',
        id: '36',
    },
    {
        createdAt: '2023-01-31T21:30:31.164Z',
        name: 'Bill Kutch',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1206.jpg',
        id: '37',
    },
    {
        createdAt: '2023-02-01T10:58:03.217Z',
        name: 'Sabrina Trantow',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1046.jpg',
        id: '38',
    },
    {
        createdAt: '2023-01-31T11:31:11.645Z',
        name: 'Mattie Sawayn',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/16.jpg',
        id: '39',
    },
    {
        createdAt: '2023-02-01T01:06:47.675Z',
        name: 'Santiago Rempel PhD',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/587.jpg',
        id: '40',
    },
    {
        createdAt: '2023-02-01T02:27:29.101Z',
        name: 'Lydia Christiansen PhD',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/407.jpg',
        id: '41',
    },
    {
        createdAt: '2023-01-31T15:03:29.895Z',
        name: 'Ebony Ernser',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1015.jpg',
        id: '42',
    },
    {
        createdAt: '2023-01-31T12:47:49.874Z',
        name: 'Bradley Satterfield',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/33.jpg',
        id: '43',
    },
    {
        createdAt: '2023-01-31T13:46:30.741Z',
        name: 'Allison Kub',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/544.jpg',
        id: '44',
    },
    {
        createdAt: '2023-01-31T22:47:07.344Z',
        name: 'Miss Tyler Schimmel Jr.',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1099.jpg',
        id: '45',
    },
    {
        createdAt: '2023-01-31T21:13:49.682Z',
        name: 'Hugo Hane MD',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/125.jpg',
        id: '46',
    },
    {
        createdAt: '2023-01-31T21:07:09.669Z',
        name: 'Jeffery Yundt',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/819.jpg',
        id: '47',
    },
    {
        createdAt: '2023-01-31T16:31:40.394Z',
        name: 'Wm Rempel',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1027.jpg',
        id: '48',
    },
    {
        createdAt: '2023-01-31T21:23:15.057Z',
        name: 'Daryl Kub',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/210.jpg',
        id: '49',
    },
    {
        createdAt: '2023-01-31T12:03:16.755Z',
        name: 'Dr. Marvin Kuhlman',
        avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/765.jpg',
        id: '50',
    },
];

app.listen(PORT, () => {
    console.log(`server Rest start on ${PORT}`);
});

const wss = new ws.Server({ port: 3002 }, () =>
    console.log('server Websocket started on 3002')
);

wss.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('Новый пользователь');
    wsClient.on('close', function () {
        console.log('Пользователь отключился');
    });
}

function notification() {
    wss.clients.forEach((client) => {
        client.send('1');
    });
}

app.get('/api', (req, res) => {
    res.json({
        users: obs,
    });
});

app.post('/addUser', function (req, res) {
    const { name, createdAt, avatar, id } = req.body;
    const newUser = {
        name: name,
        createdAt: createdAt,
        avatar: avatar,
        id: id,
    };
    const user = obs.find((el) => el.id === id);
    obs = obs.filter((el) => el.id !== id);
    if (user === undefined) {
        obs.unshift(newUser);
    } else {
        obs.unshift(user);
    }
    res.send(req.body);
    notification();
});
