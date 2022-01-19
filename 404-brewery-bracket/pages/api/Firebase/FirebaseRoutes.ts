import { getActiveUser, getAllUsers } from "./UserCRUD";
import * as express from 'express'

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));
app.get('/AllUsers', getAllUsers);

app.listen("2000", function(){
    console.log("node listening on port 2000");
});