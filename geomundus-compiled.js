var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};prgAll=document.getElementById("radio1");ongAll=document.getElementById("radio5");prgAll.checked=!0;ongAll.checked=!0;
$(document).ready(function(){$("#about-linked").on("click",function(){$("#about").css("display");$("#about").attr("style","display:block")});$("#about-close").on("click",function(){$("#about").attr("style","display:none")});$("#about-map-button").on("click",function(){$("#about").attr("style","display:none")});$("#banner").show();$.fn.center=function(){this.css("position","absolute");this.css("top",Math.max(0,($(window).height()-$(this).outerHeight())/2+$(window).scrollTop())+"px");this.css("left",
Math.max(0,($(window).width()-$(this).outerWidth())/2+$(window).scrollLeft())+"px");return this};setTimeout(function(){$("#banner").fadeOut()},1500);setTimeout(function(){$("#ema_title").fadeIn()},1500)});var framesPerSecond=15,initialOpacity=.5,opacity=initialOpacity,initialRadius=3,radius=initialRadius,maxRadius=18;
function animateMarker(){setTimeout(function(){requestAnimationFrame(animateMarker);radius+=(maxRadius-radius)/framesPerSecond;opacity-=.9/framesPerSecond;0>=opacity&&(radius=initialRadius,opacity=initialOpacity);map.setPaintProperty("point_animation","circle-radius",radius);map.setPaintProperty("point_animation","circle-opacity",opacity)},1E3/framesPerSecond)}function deprecated(a){return 1===a?"":"Discontinued"}function hideNulls(a){return"null"===a||""===a?"":a}
function colored(a){return"NEW"===a?"#FFFF00":"#fa8072"}function selYear(a,b){for(var c=[],g=$jscomp.makeIterator(json.features),k=g.next();!k.done;k=g.next())year=k.value,year.properties.code===a&&c.push("&nbsp;"+(null===year.properties[b]?"Not yet":year.properties[b]));return c.filter(function(a,b){return c.indexOf(a)==b}).sort(function(a,b){return a-b})}function normalize(a){return a.trim().toLowerCase()}
function getUniqueFeatures(a,b){var c={};return a.filter(function(a){return c[a.properties[b]]?!1:c[a.properties[b]]=!0})}mapboxgl.accessToken="pk.eyJ1IjoiZ2VvbXVuZHVzIiwiYSI6ImNqM3BoMDVlYjAwam8zMnBmNm1ndWs3bnYifQ.McVUJig2reapiExh7EPOpw";var map=new mapboxgl.Map({container:"map",style:"mapbox://styles/geomundus/cj4b2b6pk43hm2rmpu7q9kil3",center:[15.2551,50.526],zoom:3,maxZoom:9,minZoom:1});
function addDataLayer(){map.addSource("states",{type:"geojson",data:"https://geomundus.github.io/countryNEW.geojson"});map.addLayer({id:"state-fills",type:"fill",source:"states",layout:{visibility:"visible"},paint:{"fill-color":"#627BC1","fill-opacity":0}});map.addLayer({id:"state-border-hover",type:"line",source:"states",layout:{},paint:{"line-color":"#627BC1","line-opacity":.5,"line-width":3}});map.addSource("uni",{type:"geojson",data:"https://geomundus.github.io/bycourses.geojson"});map.addLayer({id:"uni",
type:"symbol",source:"uni",layout:{visibility:"visible","icon-image":"marker-15_blackwhite","icon-offset":[0,-7.5],"icon-allow-overlap":!0,"icon-size":.8},filter:["all",["==","ongoing2015_2017",1],["==","cat","EMJMD"]]});map.addLayer({id:"uni_select",type:"symbol",source:"uni",layout:{visibility:"none","icon-image":"marker_red","icon-offset":[0,-7.5],"icon-allow-overlap":!0}});map.addLayer({id:"point_animation",type:"circle",source:"uni",layout:{visibility:"none"},paint:{"circle-radius":initialRadius,
"circle-radius-transition":{duration:0},"circle-opacity-transition":{duration:0},"circle-color":"#283048"}});map.addLayer({id:"uni_icon",type:"symbol",source:"uni",layout:{visibility:"none","icon-image":"marker_red","icon-offset":[0,-7.5],"icon-allow-overlap":!0,"icon-size":1.4,"text-size":15,"text-anchor":"bottom","text-offset":[0,-2],"text-allow-overlap":!0},paint:{"text-color":"red","text-halo-color":"white","text-halo-width":1}})}map.on("style.load",function(a){addDataLayer()});
var json=function(){var a=null;$.ajax({async:!1,global:!1,url:"https://geomundus.github.io/bycourses.geojson",dataType:"json",success:function(b){a=b}});return a}(),acro_title=json.features.reduce(function(a,b){a[b.properties.code]=b.properties.title;return a},{});
function countProgramsPerCity(a,b,c){var g=0,k=[];b=$jscomp.makeIterator(b);for(var h=b.next();!h.done;h=b.next()){i=h.value;h=$jscomp.makeIterator(c);for(var e=h.next();!e.done;e=h.next())j=e.value,json.features.forEach(function(b){b=b.properties;var c=null===b.ongoing2015_2017?0:1;b.cat===i&&b.city===a&&j===c&&-1===k.indexOf(b.code)&&(k.push(b.code),g+=1)})}return g}
var popup=new mapboxgl.Popup({offset:[0,-10],closeButton:!1,closeOnClick:!0,anchor:"top-left"}),filterEl=document.getElementById("feature-filter"),listingEl=document.getElementById("feature-listing");
function renderListings(a){listingEl.innerHTML="";var b=document.getElementById("city"),c=document.getElementById("program");a.length&&"mode-selected"===c.className?(a.forEach(function(a){var b=a.properties,g=b.xmin-1,c=b.ymin-1,l=b.xmax+1,m=b.ymax+1,d=document.createElement("a"),f=b.status.trim(),n=b.ongoing2015_2017;d.target="_blank";d.innerHTML='<div style ="display:inline;">   '+b.code+' </div>  <div style ="display:inline; margin-left: 5px; opacity: 0.6; color:'+colored(f)+';"><i>'+hideNulls(f)+
'</i></div><div style ="display:inline; margin-left: 5px; opacity: 0.6; color: #ff6666"><i>'+deprecated(n)+"</i></div>";d.addEventListener("click",function(){$("#ema_title").hide();map.fitBounds([[g,c],[l,m]]);var a=b.code;map.setFilter("uni_icon",["==","code",a]);map.setFilter("point_animation",["==","code",a]);map.setLayoutProperty("point_animation","visibility","visible");map.setLayoutProperty("uni_icon","visibility","visible");map.setLayoutProperty("uni_icon","text-field","{role}");map.setLayoutProperty("uni",
"visibility","none");interest=document.getElementById("interest");document.getElementById("myspan").textContent=b.code;document.getElementById("program_title").style.display="inline-block";$("#interest").fadeIn("slow");$("#interest").children().not("#interest-close").remove();$("#interest-close").appendTo("#interest");$('<div style ="font-size:25px;  margin-left:10px; margin-right: 10px; margin-top: 25px">'+b.title+'</div><div style ="font-size:20px; margin-left:10px; margin-top: 25px;"><a href="'+
b.website+'" target="_blank">Program details</a></div><table style ="font-size:20px; margin-left:10px; margin-top: 50px;"><tr><td>Program approved:&nbsp; </td><td>'+selYear(b.code,"sel_year")+"</td></tr><tr><td>Student`s intake:&nbsp; </td><td>"+selYear(b.code,"year_of_i_intake")+"</td></tr></table></div>").appendTo("#interest")});d.addEventListener("mouseover",function(){map.setFilter("uni_select",["==","code",b.code]);map.setLayoutProperty("uni_select","visibility","visible");setTimeout(function(){d.style.color=
"rgba(250, 250, 250, 0.8)";d.textContent=b.title;d.style.fontWeight=600;d.style.borderRadius="5px"},10)});d.addEventListener("mouseout",function(){map.setLayoutProperty("uni_select","visibility","none");setTimeout(function(){d.innerHTML='<div style ="display:inline;">'+b.code+'</div><div style ="display:inline; margin-left: 5px; opacity: 0.6; color:'+colored(f)+';"><i>'+hideNulls(f)+'</i></div><div style ="display:inline; margin-left: 5px; opacity: 0.6; color:#ff6666"><i>'+deprecated(n)+"</i></div>";
d.style.fontWeight=400;d.style.color="rgba(255, 255, 255, 0.9)";d.style.borderRadius="0px"},50)});listingEl.appendChild(d)}),filterEl.parentNode.style.display="block"):a.length&&"mode-selected"===b.className?(programChecked=$("input[name=program]:checked").val(),statusChecked=$("input[name=status]:checked").val(),programChecked="All"===programChecked?["EMJD","EMJMD"]:"EMJMD"===programChecked?["EMJMD"]:["EMJD"],statusChecked="All"===statusChecked?[1,0]:"1"===statusChecked?[1]:[0],a.forEach(function(a){a=
a.properties;var b=a.lat,c=a.lon,e=a.city;a=document.createElement("a");a.target="_blank";a.innerHTML='<div style ="display:inline;">'+e+'</div><div style ="display:inline; margin-left: 5px; color: #5094e1;"><b>'+countProgramsPerCity(e,programChecked,statusChecked)+"</b></div>";a.addEventListener("mouseover",function(){map.setFilter("uni_select",["==","city",e]);map.setLayoutProperty("uni_select","visibility","visible")});a.addEventListener("click",function(){map.flyTo({center:[c,b],zoom:7});map.setFilter("point_animation",
["==","city",e]);map.setLayoutProperty("point_animation","visibility","visible");map.setFilter("uni_icon",["==","city",e]);map.setLayoutProperty("uni_icon","visibility","visible");map.setLayoutProperty("uni_icon","text-field","")});a.addEventListener("mouseout",function(){map.setLayoutProperty("uni_select","visibility","none")});listingEl.appendChild(a)}),filterEl.parentNode.style.display="block"):(a=document.createElement("p"),document.getElementById("program_title"),b=document.getElementById("city"),
c=document.getElementById("program"),document.getElementById("country"),"mode-selected"===b.className?console.log("citymode"):(document.getElementById("dropbtn").textContent="Degree",document.getElementById("ongoing").textContent="Status"),a.innerHTML="<p><div>Drag map to populate list!</div></p>",a.style.color="rgba(245, 245, 245, 0.9)",a.style.textAlign="center",a.id="appended-p",a.textAlign="center",a.style.fontSize="125%",listingEl.appendChild(a),filterEl.parentNode.style.display="none")}animateMarker();
map.on("load",function(){function a(a){a=a.target.id;var b=document.getElementById("changeLayer"),f=document.getElementById("menu");document.getElementById("program");"dark"===a?(map.setStyle("mapbox://styles/geomundus/cj4k9343e2zk92rmi9cq8kzoh"),b.style.backgroundColor="rgba(240, 240, 240, 1)",f.style.backgroundColor="rgba(240, 240, 240, .7)",f.style.color="black",prgAll.checked=!0,ongAll.checked=!0):"bright"===a?(b.style.backgroundColor="rgba(24, 24, 24, 0.0)",f.style.backgroundColor="rgba(24, 24, 24, 0.9)",
f.style.color="#ccc",map.setStyle("mapbox://styles/geomundus/cj4b2b6pk43hm2rmpu7q9kil3"),prgAll.checked=!0,ongAll.checked=!0):console.log(c)}function b(a,b){setTimeout(function(){var b=map.queryRenderedFeatures({layers:["uni","uni_icon"]});b&&(sorted=getUniqueFeatures(b,a).sort(function(b,f){return b.properties[a]<f.properties[a]?-1:b.properties[a]>f.properties[a]?1:0}),renderListings(sorted),programs=sorted)},b)}map.on("mousemove",function(a){a=map.queryRenderedFeatures(a.point,{layers:["state-fills"]});
a.length?map.setFilter("state-border-hover",["==","admin",a[0].properties.admin]):map.setFilter("state-border-hover",["==","admin",""])});map.on("mouseout",function(){map.setFilter("state-border-hover",["==","admin",""])});map.on("click",function(a){a=map.queryRenderedFeatures(a.point,{layers:["state-fills"]});a[0]&&map.fitBounds([[a[0].properties.xmin,a[0].properties.ymin],[a[0].properties.xmax,a[0].properties.ymax]])});var c=document.getElementById("menu").getElementsByTagName("input");program.className=
"mode-selected";document.getElementById("city").className="mode";for(var g=0;g<c.length;g++)c[g].onclick=a;var k,h,e,l,m,d=document.getElementById("feature-filter");$("#program, #city, #radio1, #radio2, #radio3, #radio4, #radio5, #radio6, #interest-close").click(function(){m=$("input[name=program]:checked").val();l=$("input[name=status]:checked").val();h="1"===l?["==","ongoing2015_2017",1]:"0"===l?["!=","ongoing2015_2017",1]:[];e=["==","cat",m];k="All"===m&&"All"!==l?h:"All"===l&&"All"!==m?e:"All"===
m&&"All"===l?["!=","cat","select_all"]:["all",e,h];map.setFilter("uni",k);map.setLayoutProperty("uni","visibility","visible");map.setLayoutProperty("uni_select","visibility","none");map.setLayoutProperty("uni_icon","visibility","none");map.setLayoutProperty("point_animation","visibility","none")});$("#city").click(function(){$("#program").attr("class","mode");$("#city").attr("class","mode-selected");d.placeholder="\ud83d\udd0d Filter results by city name";b("city",100)});$("#program").click(function(){$("#program").attr("class",
"mode-selected");$("#city").attr("class","mode");d.placeholder="\ud83d\udd0d Filter results by program or abbreviation name";b("code",100)});document.getElementById("zoom-all").addEventListener("click",function(){map.flyTo({center:[0,40],zoom:1.5})});$("#interest-close").on("click",function(){listingEl.innerHTML="";$("#ema_title").show();document.getElementById("feature-filter");map.setLayoutProperty("uni","visibility","visible");map.setLayoutProperty("uni_select","visibility","none");map.setLayoutProperty("uni_icon",
"visibility","none");map.setLayoutProperty("point_animation","visibility","none");map.flyTo({center:[15.2551,50.526],zoom:3});$("#interest").fadeOut("slow");$("#program_title").fadeOut("slow")});map.on("moveend",function(){$("#program").hasClass("mode-selected")?b("code",100):b("city",100)});filterEl.addEventListener("keyup",function(a){var b=normalize(a.target.value);a=programs.filter(function(a){var f=normalize(a.properties.title),c=normalize(a.properties.code);a=normalize(a.properties.city);return-1<
f.indexOf(b)||-1<c.indexOf(b)||-1<a.indexOf(b)});renderListings(a);map.setFilter("uni",["in","code"].concat(a.map(function(a){return a.properties.code})))});renderListings([]);map.on("mousemove",function(a){var b=document.getElementById("program");document.getElementById("country");var c=document.getElementById("city");if("mode-selected"===b.className){var d=map.queryRenderedFeatures(a.point,{layers:["uni_icon","uni"]});b=map.getLayoutProperty("uni","visibility");map.getCanvas().style.cursor=d.length?
"pointer":"";d.length?(a=d[0],"none"===b?popup.setLngLat(a.geometry.coordinates).setHTML("<div><b>"+a.properties.title+"</div></b><div><i>"+a.properties.uni+"</div></b><div>"+a.properties.city+", "+a.properties.country+'</div><div><a href="'+a.properties.website+'" target="_blank">website</a></div>').addTo(map):popup.setLngLat(a.geometry.coordinates).setHTML("<div><b>"+a.properties.city+", "+a.properties.country+"</b></div>").addTo(map)):popup.remove()}else if("mode-selected"===c.className)if(d=map.queryRenderedFeatures(a.point,
{layers:["uni_icon","uni"]}),map.getCanvas().style.cursor=d.length?"pointer":"",d.length){a=d[0];var f;b="<div><strong>"+a.properties.city;b+="</strong></div>";c=[];d=$jscomp.makeIterator(d);for(f=d.next();!f.done;f=d.next()){a=f.value;var e=a.properties;if(-1===c.indexOf(e.code)){c.push(e.code);var g=acro_title[e.code];f="NEW"===e.status?"NEW":" ";var h=1===e.ongoing2015_2017?" ":"Discontinued";b+="<div class='link'><a href='"+e.website+"'style='color: rgb(0,255,0)'; target='_blank';><span id = 'crs'>"+
g+"</span><span id ='acr'>"+e.code+'</span></a><div style ="display:inline; margin-left: 5px; opacity: 0.9; color: RoyalBlue;"><i><span id ="stat">'+f+'</span></i></div><div style ="display:inline; margin-left: 5px; opacity: 0.6; color:LightCoral;"><i><span id ="ong">'+h+"</span></i></div></div>"}}popup.setLngLat(a.geometry.coordinates).setHTML(b).addTo(map)}else popup.remove();else console.log("error bei city or program selection")})});map.addControl(new mapboxgl.NavigationControl);