const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const app=express();
const myGraphQLSchema=require('./schema');
//graphqlHTTP içine nesneler alıcak bu 
app.use('/graphql',graphqlHTTP({
    schema:myGraphQLSchema,
    graphiql:true,// graphiql arayüzünü kullanabilmek için true yapıyoruz
}))

app.listen(4000,()=>{
    console.log("server 4000 portunda çalışıyor.");
})
