const net=require('net');
const server=net.createServer(onConnection);
const port=3000;
let count=0;
let users={};
server.listen(port,function onListen(){
    console.log(`now listening on port ${port}`);
})
function onConnection(conn){
    const message=`Welcome to TCP chat room ${count} other people are connected ...\n \\ Please write your Name and press return \n`;
    conn.setEncoding('utf8');
    conn.write(message);
    let name;
    count+=1;
    conn.on('data',function onData(data){
        if(!name){
            if(users[data]){
                conn.write(`Name:${data} alredy exist, Choose anathear name`);

            }
        }else{
            conn.write(`${name}:${data} alredy exist`);
        }
    });
    conn.on('close',function onClose(){
        count-=1;
        delete users[name];
        console.log(`${name} has left!\n`);
    });
}