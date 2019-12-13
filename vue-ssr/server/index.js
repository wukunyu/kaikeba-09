const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
      <html>
        <div>
            <h1>开课吧</h1>
            <p class="demo">开课吧开不错</p>
        </div>
      </html>
    `);
});

app.listen(3000, ()=>{
    console.log('listening on 3000');
    
})