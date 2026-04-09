const daten = [
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-anna-lena.png",
"https://www.carlsen.de/sites/default/files/styles/s_390_auto/public/2020-10/OD_9783551652461_SDMT-Tagebuch_Inh_A01_143_06_preview.png",
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-benni.png",
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-eddie.png",
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-ida.png",
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-jo.png",
"https://www.carlsen.de/sites/default/files/styles/s_330_auto/public/2025-08/die-schule-der-magischen-tiere-portrait-schoki.png"
];
const main = document.getElementById("main");
function spawnCircle(){
    let circle=document.createElement("div");
    circle.classList.add("circle");
    let size=Math.random()*80+60;
    circle.style.width=size+"px";
    circle.style.height=size+"px";
    circle.style.left=Math.random()*100+"%";
    circle.style.animationDuration=(Math.random()*4+6)+"s";
    circle.style.backgroundImage=
    `url(${daten[Math.floor(Math.random()*daten.length)]})`;
    main.appendChild(circle);
    setTimeout(()=>{
        circle.remove();
    },10000);
}
setInterval(()=>{
    spawnCircle();
},500);
