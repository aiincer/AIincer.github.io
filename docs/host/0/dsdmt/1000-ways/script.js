let story = [];
fetch("../src/db/1000-ways.json")
.then(r => r.json())
.then(data => {
    story = data;
    show("start");
});
const text = document.getElementById("text");
const question = document.getElementById("question");
const choices = document.getElementById("choices");
function show(id){
    const s = story.find(x => x.id === id);
    if(!s) return;
    text.textContent = s.txt;
    question.textContent = s.question;
    choices.innerHTML = "";
    s.ans.forEach(a => {
        const btn = document.createElement("button");
        btn.textContent = a[0];
        btn.onclick = () => show(a[1]);
        choices.appendChild(btn);
    });
}
