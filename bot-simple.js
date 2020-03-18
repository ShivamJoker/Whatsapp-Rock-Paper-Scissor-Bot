const http = require("http");

//get a random emoji
const randomRPSEmo = () => {
  //rock paper scissors emoji
  const emojis = ["✌", "✊", "🖐"];
  const random = Math.floor(Math.random() * 3);
  return emojis[random];
};

const emos = { paper: "🖐", scissor: "✌", rock: "✊" };

const {rock, paper, scissor} = emos; //destructre

//login what will beat what
const matches = {
  [scissor]: paper,
  [paper]: rock,
  [rock]: scissor
};

  const runGame = userEmo => {
    // get a random emoji
    const botEmo = randomRPSEmo();

    //winning condition for bot user will lose
    const isitWin = () => {
      //get object values in array and check if emoji is there
      if (!Object.values(emos).includes(userEmo)) {
        return `You sen't an unknown emoji 😒`;
      } // if both emoji are same then its a draw
      else if (userEmo === botEmo) {
        return `Oh! It's a draw 🤐`;
      }
      //now if our condition is matched with bot then user lost
      else if (matches[userEmo] === botEmo) {
        return `You los't the game 😂\n Try again`;
      } // if none is true then user has won the game
      else {
        return `Oh No!\n You won 🏆 congrats`;
      }
    };

    //now return the message in this format 
    return { replies: [{ message: botEmo }, { message: isitWin() }] };
  };

console.log(randomRPSEmo());

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
      res.end("Whatsup go to hell");
    }
  });
});

server.listen(5000);
