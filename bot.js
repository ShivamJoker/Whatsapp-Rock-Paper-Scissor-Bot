const http = require("http");

const randomRPCEmo = () => {
  //rock paper scissors emoji
  const emojis = ["✌", "✊", "🖐"];
  const random = Math.floor(Math.random() * 3);
  return emojis[random];
};

const allEmos = {
  papers: ["🖐", "✋", "🤚"],
  scissors: ["✌"], //it's a yellow hand u cant see it
  rocks: ["✊", "👊", "🤛", "🤜"]
};
const emos = { paper: "🖐", scissor: "✌", rock: "✊" };

const runGame = userEmo => {
  const botEmo = randomRPCEmo();

  const emojiEntry = Object.entries(allEmos).find(emoji =>
    emoji.startsWith(userEmo)
  );

  if (!emojiEntry) {
    return console.log("no valid emoji found");
  }

  const [type, allColorVariants] = emojiEntry;

  console.log(type, allColorVariants);

  // const isEmoThere = emoj => {
  //   allEmos[emoj + "s"].forEach(el => {
  //     console.log(el);

  //     if (userEmo.startsWith(el)) {
  //       userEmo = emoj;
  //     }
  //   });
  // };
  // for (const emoji in emos) {
  //   console.log(emoji);

  //   isEmoThere(emoji);
  // }

  const isitWin = () => {
    //winning condition for bot user will lose
    if (
      (userEmo == emos.paper && botEmo == emos.scissor) ||
      (userEmo == emos.rock && botEmo == emos.paper) ||
      (userEmo == emos.scissor && botEmo == emos.rock)
    ) {
      return "You lost the game!";
    } else if (
      (userEmo == emos.scissor && botEmo == emos.paper) ||
      (userEmo == emos.paper && botEmo == emos.rock) ||
      (userEmo == emos.rock && botEmo == emos.scissor)
    ) {
      return "You won! *Congrats*";
    } else if (userEmo == botEmo) {
      return "It's draw!";
    } else {
      return "You sent unknown emoji";
    }
  };

  return { replies: [{ message: botEmo }, { message: isitWin() }] };
};

console.log(randomRPCEmo());

const server = http.createServer((req, res) => {
  let data = [];
  req.on("data", chunk => {
    data.push(chunk);
  });

  let msg;
  req.on("end", () => {
    try {
      const response = JSON.parse(data);
      console.log(response);
      msg = response.query.message;

      console.log(msg);

      const reply = runGame(msg);

      res.end(JSON.stringify(reply));
    } catch (error) {
      console.log(error);
      res.end("Whatsup");
    }
  });
});

server.listen(5000);
