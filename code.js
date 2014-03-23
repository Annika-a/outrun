function startf(){
   readFileHttp("tree.txt")
  }

var numbs   = [[]];
var seednumber;

function FindTheBestRoute(){
var  routes = [];

//Luodaan ensimmäiset reitit alareunasta:
for(var x = 0; x <numbs.length-1; x++){
routes.push([x]);
}


var kierros = 0;
var leveys = numbs.length-2;


while(kierros<numbs.length-2){
var rlength = routes.length;
for(var y = 0; y < rlength; y++){
   //Reittien seuraavien askelien lisääminen
   if(routes[y][kierros] == 0){
    //Edellinen indeksi 0:lla reunassa
      routes[y].push(routes[y][kierros]);
    }
     else if(routes[y][kierros] == leveys){
      //Edellinen indeksi toisessa ulkoreunassa
    routes[y].push(routes[y][kierros]-1);
     }else{
     //Luodaan uusi reitti keskimmäisiin 
    var tempa = routes[y].slice(0);
    tempa.push(routes[y][kierros]-1);
    routes.push(tempa);  
    
    routes[y].push(routes[y][kierros]);
   }
   }


//Eliminointi, Säilytetään kohtaavista reiteistä isompi:
var deletable = [];//deletoitavien reittien indeksit tähän
for(var x = 0; x <= leveys; x++){
var tempsave =[]; 
for(var v = 0; v <routes.length; v++){
        if(routes[v][kierros+1] == x)tempsave.push(v);      
   }
    if(tempsave.length>1) {
              if(RouteSum(routes[tempsave[0]]) > RouteSum(routes[tempsave[1]])){
                deletable.push(tempsave[1]);
              }else{
                 deletable.push(tempsave[0]);
              }
          }   
 } 

deletable.sort(function(a,b){return a-b});
var numberofdeleted=0;
for(f in deletable){
routes.splice(deletable[f]-numberofdeleted, 1);
numberofdeleted++;
}
leveys--;
kierros++;
}
 
//Näytetään jäljelle jäänyt reitti: 
PrintRoute(routes[0]); 
}



function RouteSum(count){
//Saa reitin indekseinä palauttaa reitin summan
var row = numbs.length-2;
var sum = 0;
      for(var x = 0; x < count.length; x++){
           sum += numbs[row][count[x]];
           row--;
      }
      return sum;
}


function PrintRoute(route){
//Piirtää reittipuuhun valitun reitin punaisella.
document.write("<h2>"+seednumber+"</br>");
document.write("Reitin summa:"+RouteSum(route)+"</h2>");
route.reverse();
document.write(" <br>");
var printable = "<center><span style=\"font-size:10px\">";
      for(var x = 0; x < numbs.length; x++){
          for(var y = 0; y<numbs[x].length; y++) {
            if(route[x] == y){
              printable += "<span style=\"color:red\">"+ numbs[x][y]+"</span> ";
            }
            else{
              printable +=  numbs[x][y]+" ";
            }
          }
      printable += "<br> ";
      }
document.write( printable+"</span></center>");
}


function formatlines(t){
//Hakee numerot arrayhin
var numbers;
var lines;
lines = t.split('\n');
for(var i = 0;i < lines.length;i++){
    numbs[i] = [];
    numbers = lines[i].split(' ');
     if(i==0){
     seednumber = lines[i] ;
    }
 else{
  for(var x = 0; x < numbers.length; x++){
     numbs[i-1][x]=parseInt(numbers[x]);
    }
  }
} 
FindTheBestRoute();
}

function readFileHttp(fname) {
//Lukee filen
    xmlhttp = getXmlHttp();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4) {
        formatlines(xmlhttp.responseText);
      }
    }
    xmlhttp.open("GET", fname, true);
    xmlhttp.send(null);
  }
 function getXmlHttp() {
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp == null) {
      alert("Your browser does not support XMLHTTP.");
    }
    return xmlhttp;
  }