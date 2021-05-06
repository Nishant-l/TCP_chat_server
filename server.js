const net=require('net');
const server=net.createServer(onConnection);
const port=3000;
let count=0;
let users={};
server.listen(port,function onListen(){
    console.log(`now listening on port ${port}`);
})
function onConnection(conn){
    const message=`Welcome to TCP chat room ${count} other people are connected...\\n
                   Please write your Name and press return\n`;
    conn.setEncoding('utf8');
    conn.write(message);
    let name=undefined;
    count+=1;
    conn.on('data',function onData(data){
        if(!name){
            if(users[name]){
                conn.write(`Name:${data} alredy exist, Choose anathear name\n`);

            }
            else{
                name=data;
                users[name]=conn;
                Object.keys(users)
                      .forEach(user=>{
                          users[user].write(`${name}has joined the chat room\n`);
                      });
            }
        }else{
            Object.keys(users)
                  .forEach(user => {
                    users[user].write(`${name}:${data}`);
                  })
            
        }
    });
    conn.on('close',function onClose(){
        count-=1;
        delete users[name];
        Object.keys(users)
              .forEach(user => {
                  users[user].write(`${name} Has left the chat\n`);
              });
    });
}