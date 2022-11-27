const express = require('express');
const app = express();
const PORT = 3000;
const sequelize = require('./db/connect');
const postsRouter = require('./routes/posts');
const bloggerRouter = require('./routes/blogger');
const loginRouter = require('./routes/login');
const notFound = require('./middleware/not-found');

app.use(express.json());

app.use(bloggerRouter,loginRouter,postsRouter);
app.use(notFound);
const main = async () => {
try{
   
    await sequelize.sync();
    await app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);

});
}
catch(error){
    console.log(error);
}
}
main();