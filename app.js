import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const posts = [];
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.render('./index.ejs', {posts});
});
app.get('/post', (req, res)=>{
    res.render('./post.ejs');
});
app.get('/edit/:index', (req, res)=>{
    const index = req.params.index;
    const title = posts[index]["title"];
    const content = posts[index]["content"];
    res.render('./edit.ejs', {index, title, content});
});
app.post('/submit', (req, res)=>{
    posts.push({title: req.body.blogTitle, content: req.body.blogContent});
    res.redirect('/');
});
app.post('/update', (req, res)=>{
    const index = req.body.index;
    posts[index]["title"] = req.body.blogTitle;
    posts[index]["content"] = req.body.blogContent;
    res.redirect('/');
});
app.delete('/delete', (req, res)=>{
    const index = req.body.index;
    posts.splice(index, 1);
});
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
});


export default app;

