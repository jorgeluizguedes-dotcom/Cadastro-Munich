const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const timing=fs.readFileSync('timing.json','utf8');
let html=fs.readFileSync('anim.html','utf8').replace('__TIMING__',timing);fs.writeFileSync('page.html',html);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/page.html');await p.waitForTimeout(800);
const only=process.argv[2];
if(only){for(const t of only.split(',')){await p.evaluate(t=>render(+t),t);await p.screenshot({path:`prev_${t}.jpg`,type:'jpeg',quality:80});}}
else{fs.mkdirSync('frames',{recursive:true});const N=59*30;
for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/30);await p.screenshot({path:`frames/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});if(i%300==0)console.log(i);}}
await b.close();})();
