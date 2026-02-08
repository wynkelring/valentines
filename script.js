const app = document.getElementById("app");
const flash = document.getElementById("flash");
const heartbeat = document.getElementById("heartbeat");
const ouch = document.getElementById("ouch");

/* ========= ZMIENNE DO EDYCJI ========= */
const resignURL = "https://www.instagram.com/p/DRC6sB4jMOV/";
const hotelText = "B&B HOTEL";
const hotelLink = "https://www.booking.com/hotel/pl/b-amp-b-wrocaaw.pl.html";
/* =================================== */

let noHoverCount = 0;
const noTexts = ["nie","na pewno?","zastanów się","serio?","ostatnia szansa..."];

function vibrate(ms=120){ if(navigator.vibrate) navigator.vibrate(ms);}
function flashRed(){ flash.style.opacity="0.5"; setTimeout(()=>flash.style.opacity="0",120); }

/* ================= INTRO ================= */
function showIntro(){
    heartbeat.pause();
    app.innerHTML = `
        <h1 class="glitch">
            Zosiu,<br>zbyt długo z tym zwlekałem<br>ale powinnaś to wiedzieć..
        </h1>
        <button id="detailsBtn">CHCĘ POZNAĆ SZCZEGÓŁY</button>
    `;
    setTimeout(()=>{document.getElementById("detailsBtn").style.display="block";},3000);
    document.getElementById("detailsBtn").onclick = showQuestion;
}

/* ================= PYTANIE ================= */
function showQuestion(){
    heartbeat.loop = true; heartbeat.currentTime=0; heartbeat.play();
    noHoverCount = 0;
    app.innerHTML = `
        <h2 class="glitch">Czy zostaniesz moją walentynką?</h2>
        <div id="questionWrapper" style="position: relative; height: 300px; margin-top: 30px;">
            <button class="yes" style="position: relative;">TAK</button>
            <button class="no" style="left: 50%; top: 60px; transform: translateX(-50%);">${noTexts[0]}</button>
        </div>
    `;
    const yesBtn = document.querySelector(".yes");
    const noBtn = document.querySelector(".no");
    yesBtn.onclick = finalQuestion;

    noBtn.addEventListener("mouseenter",()=>handleNo(noBtn,yesBtn));
    noBtn.addEventListener("touchstart",()=>handleNo(noBtn,yesBtn));
}

/* ================= OBSŁUGA NIE ================= */
function handleNo(noBtn, yesBtn) {
    if(noHoverCount >= 5) return;

    noHoverCount++;
    ouch.currentTime = 0; ouch.play();
    vibrate();
    flashRed();

    noBtn.textContent = noTexts[noHoverCount] || "nie masz wyjścia...";

    yesBtn.style.transform = `scale(${1 + noHoverCount * 0.15})`;
    noBtn.style.transform = `scale(1)`;

    const padding = 10;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const yesRect = yesBtn.getBoundingClientRect();

    const wrapper = document.getElementById("questionWrapper");
    const wrapperRect = wrapper.getBoundingClientRect();

    const maxX = wrapper.clientWidth - btnWidth - padding;
    const maxY = wrapper.clientHeight - btnHeight - padding;

    let x, y, attempts = 0;
    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
        attempts++;
    } while (
        (wrapperRect.left + x + btnWidth > yesRect.left &&
         wrapperRect.left + x < yesRect.right &&
         wrapperRect.top + y + btnHeight > yesRect.top &&
         wrapperRect.top + y < yesRect.bottom) &&
        attempts < 100
    );

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    if(noHoverCount === 5){
        setTimeout(()=>{
            noBtn.style.opacity = "0";
            setTimeout(()=>noBtn.remove(), 600);
        }, 500);
    }
}

/* ================= PO TAK ================= */
function finalQuestion(){
    app.innerHTML = `
        <h2>Miło mi.. ❤️</h2>
        <p>Może teraz Twoja kolej,<br>by mnie zapytać czy ja chcę<br>być Twoim Walentynem?</p>
        <button class="final-btn" id="askBtn">ZAPYTAJ</button>
        <button class="final-btn" id="resignBtn">REZYGNUJĘ</button>
    `;
    document.getElementById("resignBtn").onclick = ()=>{ window.location.href=resignURL; };
    document.getElementById("askBtn").onclick = showFinalMessageWithFade;
}

/* ================= FINAŁ Z LOVELY TŁEM ================= */
function showFinalMessageWithFade(){
    heartbeat.pause();
    heartbeat.currentTime = 0;

    app.style.transition = "opacity 1.5s ease";
    app.style.opacity = 0;

    setTimeout(()=>{
        document.body.style.background = "#ffb6c1";
        document.body.style.color = "#4b0033";
        app.style.backgroundColor = "transparent";

        app.innerHTML = `
            <div style="position: relative; text-shadow: 1px 1px 4px rgba(0,0,0,0.5); padding:20px; max-width:600px; margin:50px auto; text-align:center;">
                <h2>❤️ Skarbie ❤️</h2>
                <p>
                    Nasze walentynki spędzimy podwójnie:<br><br>
                    💕 <b>14 lutego</b> – romantyczna kolacja<br><br>
                    💕 <b>21 lutego</b> – Wrocław<br>
                    nocleg w <a href="${hotelLink}" target="_blank" style="color:#4b0033; text-decoration:underline;">${hotelText}</a>
                </p>

                <!-- Kontener baloników bliżej tekstu, większe serduszka i większy odstęp -->
                <div style="position:absolute; top:-40px; left:50%; transform:translateX(-50%); display:flex; gap:45px;">
                    <!-- lewe serduszko -->
                    <svg class="heart-balloon" viewBox="0 0 32 32" style="width:60px; height:60px;">
                        <path fill="#ff6666" d="M16 29s-13-7.4-13-16c0-4.4 3.6-8 8-8 2.2 0 4.2 1 5.5 2.6C18.8 6 20.8 5 23 5c4.4 0 8 3.6 8 8 0 8.6-13 16-13 16z"/>
                    </svg>

                    <!-- środkowe serduszko (czerwone, większe, wyżej) -->
                    <svg class="heart-balloon middle-heart" viewBox="0 0 32 32" style="width:82px; height:82px;">
                        <path fill="red" d="M16 29s-13-7.4-13-16c0-4.4 3.6-8 8-8 2.2 0 4.2 1 5.5 2.6C18.8 6 20.8 5 23 5c4.4 0 8 3.6 8 8 0 8.6-13 16-13 16z"/>
                    </svg>

                    <!-- prawe serduszko (zmienione na taki sam kolor jak lewe) -->
                    <svg class="heart-balloon" viewBox="0 0 32 32" style="width:52.5px; height:52.5px;">
                        <path fill="#ff6666" d="M16 29s-13-7.4-13-16c0-4.4 3.6-8 8-8 2.2 0 4.2 1 5.5 2.6C18.8 6 20.8 5 23 5c4.4 0 8 3.6 8 8 0 8.6-13 16-13 16z"/>
                    </svg>
                </div>
            </div>
        `;

        app.style.opacity = 1;

        // animacja unoszenia baloników
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatHeart {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            @keyframes floatMiddleHeart {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-25px); } /* wyżej niż pozostałe */
            }
            .heart-balloon {
                animation: floatHeart 2s ease-in-out infinite;
            }
            .heart-balloon:nth-child(1) { animation-delay: 0s; }
            .heart-balloon.middle-heart { animation: floatMiddleHeart 2s ease-in-out infinite; animation-delay: 0.3s; }
            .heart-balloon:nth-child(3) { animation-delay: 1s; }
        `;
        document.head.appendChild(style);

    }, 1500);
}





showIntro();
