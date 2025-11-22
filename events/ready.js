module.exports={
  name:"ready",
  once:true,
  execute(client){
    console.log("Bot listo como " + client.user.tag);
  }
};