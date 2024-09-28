 //schema içinde graphql e özgü queryler mutationlar ve baska graphql elemanlarını nesnelerini oluşturacağım ve graphql sorgularını ve kodlarını burda yazacağım.
/* 
query ile sorgulama yapıcam 
mutation ile ise veri kaynağını değiştirme işlemini graphql ile gerceklestiricem 
GraphQLObjectType ile graphql tiplerini tanımladım
*/
const axios =require('axios');

const{ GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList,GraphQLNonNull,GraphQLID}=require('graphql');

/* let personeller=[
    {id:'1',isim:'Ali',yas:30,email:'ali@gmail.com'},
    {id:'2',isim:'Veli',yas:20,email:'veli@gmail.com'},
    {id:'3',isim:'Ayşe',yas:10,email:'ayse@gmail.com'},
    {id:'4',isim:'Fatma',yas:3,email:'fatma@gmail.com'},
] */

const PersonelType =new GraphQLObjectType({
    name:'Personel',
    fields:()=>({
        id:{type:GraphQLString},
        isim:{type:GraphQLString},
        email:{type:GraphQLString},
        yas:{type:GraphQLInt},
    })
})
// burası creae update falan yapıcak
const RootQuery = new GraphQLObjectType({
    name:'RootQuery',
    //nesne seklınde olcak
    fields:{
        personel:{
            type:PersonelType,
            //args: bu personel calısırken içine alıcagı metot oluyo 
            args:{id: {type:GraphQLString}},
            //PERSONEL QUERY KISMI CALISINCA RESOLVE KSIMI CALISICAK ASAGIDAKİ KODLAARIM CALISICAK
            resolve(parent,args){
                //istedigimiz personele VERİYE ERİŞİM 
               /*  for(let i=0; i<personeller.length; i++){
                    if(personeller[i].id===args.id){
                        return personeller[i];
                    }
                } */
               return axios.get('http://localhost:3000/personeller'+args.id).then(res=>res.data);
            }
        },
        personeller:{
            type: new GraphQLList(PersonelType),
            resolve(){
             /*    return personeller; */
             return axios.get('http://localhost:3000/personeller').then(res=>res.data);
            }
        }
    }
})
// Mutation: veri ekleme, güncelleme ve silme işlemleri
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        personelEkle:{
            type:PersonelType,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                yas:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                return axios.post('http://localhost:3000/personeller',{
                    isim:args.isim,
                    email:args.email,
                    yas:args.yas
                }
                ).then(res=>res.data)
            }
        },
        personelSil:{
            type:PersonelType,
            args:{
                id: { type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return axios.delete('http://localhost:3000/personeller' + args.id).then(res=>res.data);
            }
        },
        personelGuncelle:{
            type:PersonelType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                isim:{type:GraphQLString},
                email:{type:GraphQLString},
                yas:{type:GraphQLInt},
            },
            resolve(_,args){
                return axios.patch('http//localhost:3000/personeller/'+args.id,args).then(res=>res.data)

            }
        }
    }
})
//burda query ve mutation lazım 
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})