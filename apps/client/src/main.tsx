import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// import { ApiClient } from './api/client';

// async function main() {
//     const client = new ApiClient();
//     await client.connect();
//     console.log('Client connected');

//     const response = await client.sendHello('Maxim');
//     console.log(`Response received after hello: ${JSON.stringify(response)}`);

//     const response2 = await client.createRoom(
//         Math.random().toString().slice(0, 10)
//     );
//     console.log(
//         `Response received after create room: ${JSON.stringify(response2)}`
//     );

//     const response3 = await client.getAllRooms();
//     console.log(
//         `Response received after get all rooms: ${JSON.stringify(response3)}`
//     );
// }

// main();
