const notFound = (req,res) => {
    res.status(404).send('404 Bad Request');
   
}

module.exports = notFound;