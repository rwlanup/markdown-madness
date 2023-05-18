# Markdown Madness

Markdown Madness is a game designed for code contributors to create markdown files that would allow them to share any madness content:- memes, jokes, feelings, ideas, silly things, educational contents, Just any thing fun. Users can add like and dislike reaction on the madness content and this would help contributors to get score and clear challenges and get medals and badges.

Preview link: [https://markdown-madness.vercel.app/](https://markdown-madness.vercel.app/)

---

### System Requirements

- [Node.js (16.8.0) or later](https://nodejs.org/)

---

### How to play?

- Create a markdown file in the `public/madness` folder with random names. Add your madness content. Content can be anything like memes, jokes, feelings, ideas, etc. Just make it fun guys.
- Then create a pull request against `master` branch and wait for the checks(github actions) to complete.
- Once github action completes, your account will be created in firestore database and your markdown contents will be added to the game.
- You can login to your account using credentials:
  - username: `your github username`
  - password: `your github username`. Make sure to change your password or else other can login with your account using username.
- Add reaction to madness contents and this will update their contents score.
- You can collect points from your contents or rob points from other contributor's contents.
- You can buy police(to protect your content points) and thief(to rob other's content points) from store.

---

### RULES

- A random points between 0 and 100 is given to first time contributor.
- A random points between 0 and 20 is added to every content you contribute. You can collect that points to increase your points and win challenge.
- If you try to rob points from the content that is police protected, then you will lose all your thief if there are more police assigned than the number of thief you have. If you have more thief than police assigned to the content, then your rob is success.
- Multiple contributors might complete challenge at the same time, so in order to win the challenge you have to claim points from the challenge.
- I do not guarantee the protection of your account.

---

### Tech Stack & How it's built?

- [Rowy](https://www.rowy.io/) is used as a low-code backend for the game to manage the store items.
- [Next.js](https://nextjs.org/) for the web application
- [Github actions](https://github.com/features/actions) is used:
  - to check for pull request sent to `master` branch and add madness content and create account on firestore database.
  - to create challenges every 4 hours if previous challenge has been completed.
