import mongoose from "mongoose";
import axios from "axios";
import PostMessage from '../models/posts.js'

const CONNECTION_URL = 'mongodb+srv://admin:passwordADMIN@cluster0.xtzyw.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () => {
    await PostMessage.deleteMany({});
    for(let i = 0; i < 30; i++){
        const id = Math.floor(Math.random() * 1000);
        let baseURL = `https://api.themoviedb.org/3/movie/${id}?api_key=d3bafc36d2c3955435e94ff4707fb202`;
        let info;
        await axios.get(baseURL).then(async (res)=>{

            const {original_title:title, genres, overview:message, poster_path, production_countries} = res.data
            const creator = '112379603585623026205'
            const createdAt = new Date().toISOString();
            const name = "@TMDB"
            const selectedFile = "https://image.tmdb.org/t/p/original" + poster_path;
            let tags = []
            for(let genre of genres){
                tags.push(genre.name)
            }
            for(let ct of production_countries){
                tags.push(ct["iso_3166_1"])
            }
            info = {
                title, message, creator, name, tags, selectedFile, createdAt
            }
            const newPost = new PostMessage(info)
            //console.log(newPost)
            await newPost.save()
        }).catch((error)=>{
        })

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

