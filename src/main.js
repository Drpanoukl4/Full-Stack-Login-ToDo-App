import  express  from "express";
import session from "express-session";
import localhost from "os"
import {dirname, join}from "path";
import {fileURLToPath}from "url";
import fs from "fs";


const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views",join(__dirname, "views"))
app.set("view engine" , "ejs")
app.use(express.static(join(__dirname,"script")))
app.use(express.static(join(__dirname,"public")))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(session({

secret:"HolaMeLLamoGabrielPerez",
resave:"false",
saveUninitialized:"false", 
    
}));

//DB
let users = JSON.parse(fs.readFileSync("./src/db.json"));

const login = (req, res ,next) =>{

    if(!req.session.userId){

    res.redirect("/login");
        
    }else{

next();

    }

}

app.get(("/"),login,(req, res) => {

    res.render("index.ejs")
    console.log("Conecction from", req.socket.localAddress)
    

});

app.get(("/login"),(req, res) => {

    res.render("login.ejs")

});

app.post(("/login"),(req, res) => {

    const user = users.find(user => user.email === req.body.email)

    if(!req.body.email || !req.body.password){

        return res.status(400).render("fields.ejs")

    }

    if(!user || req.body.password !== user.password){

        return res.status(400).render("invalid.ejs")

    }

    req.session.userId = user.id;

    console.log(req.session)

    res.status(200).redirect("/");
    
});

app.get(("/logout"),login,(req,res)=> {req.session.destroy(); res.redirect("/login")});

app.get(("/sing"),(req, res) => {

    res.render("sing.ejs")  

});

app.post(("/sing"),(req, res) => {

    if(!req.body.email || !req.body.name || !req.body.password){
    
        return res.status(400).render("sings.ejs")
    
    }

    if(users.find(user => user.email === req.body.email)){

        return res.status(400).render("singr.ejs")

    }

    const ids = users.map(user => user.id)
    const maxID = Math.max(...ids)
    
    const sing = {
    
    id: maxID +1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    
    }
    
    users = [...users, sing]

    res.render("log.ejs")


});

app.get(("/users"), (req, res) => {

    res.json(users)

})

app.listen(3000, localhost, () =>{

console.log("Server running on Port: ", 3000)

})