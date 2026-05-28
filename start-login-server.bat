@echo off
echo Starting Voyager Login Server on http://localhost:3000
echo.
echo Open your browser to: http://localhost:3000/login-appwrite.html
echo.
cd /d "%~dp0"
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let file=req.url==='/'?'/login-appwrite.html':req.url;let filePath=path.join(__dirname,file);fs.readFile(filePath,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}let ext=path.extname(filePath);let contentType={'html':'text/html','css':'text/css','js':'application/javascript','json':'application/json'}[ext.slice(1)]||'text/plain';res.writeHead(200,{'Content-Type':contentType});res.end(data);});}).listen(3000,()=>console.log('Server ready!'));"
pause
