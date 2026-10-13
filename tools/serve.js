const http=require("http"),fs=require("fs"),path=require("path");
const root=process.argv[2],port=+process.argv[3]||5055;
const types={".html":"text/html",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".txt":"text/plain",".ico":"image/x-icon",".woff2":"font/woff2"};
http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split("?")[0]);let f=path.join(root,p);
if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,"index.html");
if(!fs.existsSync(f)&&fs.existsSync(f+".html"))f+=".html";
if(!fs.existsSync(f)){s.writeHead(404);return s.end("404");}
s.writeHead(200,{"Content-Type":types[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(s);}).listen(port,()=>console.log("listening",port));
