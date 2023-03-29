var running = false;
const cards = [];
const suits = ["♥", "♣", "♦", "♠"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const faceDown = new Event('faceDown', {
    bubbles: false,
    cancelable: false,
    composed: false
});

const change = new Event('change', {
    bubbles: false,
    cancelable: false,
    composed: false
});

const faceUp = new Event('faceUp', {
    bubbles: false,
    cancelable: false,
    composed: false
});

function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array)
{
    for (let i = array.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isSorted(array)
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i] < array[i + 1]) return false;
    }
    return true;
}

function createCard(i)
{
    const suit = document.createElement("p");
    suit.innerHTML = suits[Math.floor(i / 13)];

    const rank = document.createElement("p");
    rank.innerHTML = ranks[i % 13];

    if (Math.floor(i / 13) % 2) 
    {
        suit.style.color = "black";
        rank.style.color = "black";
    }
    else
    {
        suit.style.color = "red";
        rank.style.color = "red";
    }

    const front = document.createElement("div");
    front.classList.add("flip-card-front");
    front.appendChild(suit);
    front.appendChild(rank);

    const back = document.createElement("div");
    back.classList.add("flip-card-back");

    const inner = document.createElement("div");
    inner.classList.add("flip-card-inner");
    inner.appendChild(front);
    inner.appendChild(back);

    const card = document.createElement("div");
    card.classList.add("flip-card");
    // card.setAttribute("id", i.toString());
    card.appendChild(inner);

    document.body.appendChild(card);

    card.addEventListener("faceDown", function()
    {
        inner.style.transform = "rotateY(180deg)";
    });

    card.addEventListener("change", function()
    {
        if (Math.floor(cards[i] / 13) % 2) 
        {
            suit.style.color = "black";
            rank.style.color = "black";
        }
        else
        {
            suit.style.color = "red";
            rank.style.color = "red";
        }
        suit.innerHTML = suits[Math.floor(cards[i] / 13)];
        rank.innerHTML = ranks[cards[i] % 13];
    });

    card.addEventListener("faceUp", function()
    {
        inner.style.transform = "rotateY(0deg)";
    });
}

for (let i = 0; i < 52; i++)
{
    cards.push(i);
    createCard(i);
}

document.addEventListener("click", async (event)=>
{
    running = !running;
    console.log(running);
    
    while (running && !isSorted(cards))
    {
        console.log("Bru");
        shuffle(cards);
        document.body.childNodes.forEach(element => {
            element.dispatchEvent(faceDown);
        });
        await sleep(250);

        document.body.childNodes.forEach(element => {
            element.dispatchEvent(change);
            element.dispatchEvent(faceUp);
        });
        await sleep(750);
    }
});

