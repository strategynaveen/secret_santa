const express = require('express');
const app = express();
const cors = require('cors');
const inputs_route = require('./Routes/Input_routes');
const output_route = require('./Routes/Output_routes');



app.use(express.json());
app.use(cors({ origin: '*'}));
app.use(express.static('uploads')); // Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
// Middleware to remove caching for all responses
app.use((req,res,next)=>{
  res.setHeader('Cache-Control','no-cache , no-store must-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');

  next();
})

// Routes
app.use('/inputs', inputs_route);
app.use('/outputs', output_route);

app.get('/test',function(req,res){
  console.log("Hello world");
  res.send({message:"welcome"});
});


const PORT =  8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
