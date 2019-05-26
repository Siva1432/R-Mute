// let arr = [];

// for(let i=0; i<100000; i++){
//     arr.push(i);
// };
// console.time('timer');
// for(let i=0; i<100; i++){
//     arr.splice(1000,0,i*990);
// };

// console.timeEnd('timer');

// // let myStr=''

// // for(let i=0; i<100000; i++){
// //     myStr=myStr+`,${'a'+i}`;
// // };

// // console.time('splittimer');
// // let strArr=myStr.split(',');
// // let nextTo=strArr[999];
// // console.log(nextTo);
// // let insertIndex = myStr.indexOf(nextTo);
// // myStr=`${myStr.slice(0,insertIndex+nextTo.length)},alast${myStr.slice(insertIndex+nextTo.length)}`
// // console.timeEnd('splittimer');


// // let myObj={}
// // for(let i=0; i<100000; i++){
// //     myObj[i]={
// //         id:'a'+i,
// //         val:'a'
// //     };
// // };

// // console.time('objtimer');

// // for(let i=100000; i<100100; i++){
// //     myObj[i]={
// //         id:'a'+i,
// //         val:'a'
// //     };
    
// // };

// // console.timeEnd('objtimer');
// // //ai=1001 

// // //ai1=1000

// // //insert h at i- 6

// // //insert k at i- 6


// // let myMap= new Map();

// // myMap.set(0,'a');
// // console.log(myMap);


// var map1 = new Map();

// for (let c=0; c<100000; c++){
// map1.set(c, 'c'+c);
// };

// insert=function(i,val){
//   for(let c=map1.size-1; i<=c;c--){
//   let cval=map1.get(c);
//     map1.set(c+1,cval);
//   };
//   map1.set(i,val);
 
// };

// console.time('map timer');
// for(let c=0; c<100; c++){
//     insert(c,'siva');
    
// }

// console.log('c 106',map1.get(106));

// console.timeEnd('map timer');


// let myObj={}
// for (let c=0; c<100000; c++){
    
// myObj['c'+c]={n:'c'+(c-1),
//               p:'c'+(c+1)};
//             };

// function insert(n1,nextTo){
//     // myObj[nextTo].p=n1;
//     // let prev=myObj[nextTo].p
//     // myObj[prev].n=n1;
//     // myObj[prev].n=n1;
//     // myObj[n1]={
//     //     n:nextTo,
//     //     p:myObj[nextTo].n
//     // };

//     myObj[n1]={
//         n:nextTo,
//         p:myObj[nextTo].p
//     };
//     let prev=myObj[nextTo].p;
//     myObj[nextTo].p=n1;
//     myObj[prev].n=n1;
    
// };
// console.time('myObjTimer');
// for(let c=9; c<109; c++){
//     insert('c'+c,'c5');
// }


// //console.log(myObj);
// console.timeEnd('myObjTimer');


// //c4,c5,c6,c7,c8 ==> c4:{n:c3,p:c:5},c5:{n:c4,p:c6},c6:{n:c5},c7:{n:c6},c8:{n:c7}

// //c4,c10,c5,c6,c7,c8 ==> c10:{n:c4} change:c5:{n:c10}

// //insert('c10','c4');

let myObj={}
let words=['as','jke','koe','ksj','ass','dfe','des','efe','ews','wer','wers','wef']
for (let c=0; c<10; c++){
   let val= words[c];
myObj['c'+c]={n:'c'+(c-1),
              v:val,
              p:'c'+(c+1)};
            };

function insert(n1,val,nextTo){
    // myObj[nextTo].p=n1;
    // let prev=myObj[nextTo].p
    // myObj[prev].n=n1;
    // myObj[prev].n=n1;
    // myObj[n1]={
    //     n:nextTo,
    //     p:myObj[nextTo].n
    // };

    myObj[n1]={
        n:nextTo,
        v:val,
        p:myObj[nextTo].p
    };
    let prev=myObj[nextTo].p;
    myObj[nextTo].p=n1;
    myObj[prev].n=n1;
    
};
console.time('myObjTimer1');
let i=0;
for(let c=9; c<20; c++){
    let val=words[i];
    i++;   
    insert('c'+c,val,'c5');
}


//console.log(myObj);
console.timeEnd('myObjTimer1');
console.time('while');
let n='c0';
let myStr='';
let obj=myObj[n];
while(obj){
    myStr+=obj.val;
    obj=myObj[obj.p];
};
console.timeEnd('while');

console.log('myStr',myStr);
console.log(myObj);



