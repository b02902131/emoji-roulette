const sections = [
    { color: '#FF4136', text: 'Angry', imgSrc: "https://cdn.shopify.com/s/files/1/1061/1924/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png?v=1571606036" },
    { color: '#FFED2E', text: 'Blue', imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpG7olBFb79doQi_iNyMxgEBa8DbKYWxL7A&usqp=CAU" },
    { color: '#B10DC9', text: 'Disgust', imgSrc: "https://media.istockphoto.com/id/1133643203/vector/sick-emoticon-with-tongue-out-vector-illustration.jpg?s=612x612&w=0&k=20&c=l9yLhDVlvrJse6ZP4fLod9vJQa5kjRvP_bgyyvzACBE=" },
    { color: '#FF851B', text: 'Wordless', imgSrc: "https://cdn-icons-png.flaticon.com/512/4397/4397927.png" },
    { color: '#2ECC40', text: 'Evil', imgSrc: "https://media.istockphoto.com/id/1389421230/vector/purple-face-devil-emoji-vector-illustration.jpg?s=612x612&w=0&k=20&c=xC89R6xRP8IfIYxLFQL1ucm37fh2votMKoqx97x_Ii0=" },
    { color: '#0074D9', text: 'Happy', imgSrc: "https://dg.imgix.net/do-you-think-you-re-happy-jgdbfiey-en/landscape/do-you-think-you-re-happy-jgdbfiey-9bb0198eeccd0a3c3c13aed064e2e2b3.jpg?ts=1520525855&ixlib=rails-4.3.1&fit=crop&w=2000&h=1050" },
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const face = document.getElementById('face');

canvas.width = 400;
canvas.height = 400;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2;
const markerOffsetAngle = Math.PI * 4 / 3;  // canvas.arc 從 3 點鐘方向開始順時針畫圖，marker 在上面的話要加 4/3 PI

var sectionState = { offsetAngle: 0 };

const drawSections = (offsetAngle) => {

    sections.forEach((section, index) => {

        const startAngle = (index / sections.length) * 2 * Math.PI + offsetAngle + markerOffsetAngle;
        const endAngle = 2 * Math.PI / sections.length + startAngle;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = section.color;
        ctx.fill();
    });
}

drawSections(sectionState.offsetAngle);

const spinButton = document.getElementById('spin');

const easeInOutQuint = (t) => {
    if ((t /= 0.5) < 1) {
        return 0.5 * t ** 5;
    }
    return 0.5 * ((t -= 2) ** 5 + 2);
}

spinButton.addEventListener('click', () => {
    spinButton.disabled = true;

    const spinInterval = setInterval(() => {
        // 旋轉輪盤
        spin()
    }, 10);

    const spinTime = 3000; // 旋轉時間
    const baseRound = 10;
    const startTime = Date.now();
    const rand = Math.random();
    const targetAngle = 2 * Math.PI * (rand + baseRound); // 停止位置的角度
    const targetIndex = Math.round(rand * sections.length);
    const offsetAngle = sectionState.offsetAngle;
    console.log("(targetAngle % (2 * Math.PI)): " + (targetAngle % (2 * Math.PI)));
    console.log("targetAngle: " + targetAngle % (2 * Math.PI) + ", targetIndex: " + targetIndex);

    const spin = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / spinTime, 1);

        if (elapsedTime >= spinTime) {
            clearInterval(spinInterval);
            spinButton.disabled = false;
            return;
        }

        // 繪製輪盤
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSections((targetAngle - offsetAngle) * easeInOutQuint(progress) + offsetAngle)
    };

    const changeFace = () => {
        face.setAttribute("src", sections[targetIndex].imgSrc);
    }

    setTimeout(() => {
        clearInterval(spinInterval);
        spin();
        changeFace();
        sectionState.offsetAngle = targetAngle % (2 * Math.PI);
        spinButton.disabled = false;
    }, spinTime);
});       
