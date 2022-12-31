import { app } from "app";


const port = 3000;

// start the express server

app.listen(port,() => {
    console.log('server started at http://localhost:${port}');
});