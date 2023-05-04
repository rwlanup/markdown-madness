# Markdown Madness

Markdown Madness is a game designed for code contributors to create markdown files that would allow them to share any madness content:- memes, jokes, feelings, ideas, silly things, educational contents, Just any thing fun. Users can add like and dislike reaction on the madness content and this would help contributors to get score and clear challenges and get medals and badges.

---

### OPTIONAL TODO

Maybe add some police and thief in the game where contributor can buy protection for their madness content and thief can be used to rob the score of the madness content. But the contributors who wants to rob the score cannot know the number of police assigned for madness content. If madness content has less police than thief then score is robbed from original contributors and passed to robbing contributor, but the number of thieves of robbing contributor will be decrement by the number of police found on madness content. Also if police can successfully protect the score then extra 10 score is added to the madness content.

---

### System Requirements

- Node.js (16.8.0) or later

---

### How to play?

- Create a markdown file in the `public/madness` folder with random names. Add your madness content. Content can be anything like memes, jokes, feelings, ideas, etc. Just make it fun guys.
- Then create a pull request against `master` branch and wait for the checks to pass.
- Your madness content will be added to the database and available in the game.
- Once you are a contributor, your github username will be used as username and password for the account in the game.
- Be sure to change your password or else other can login with your account.
- Add like or dislike reaction to the madness content of others.
- Guest user can also add reactions.
- Score to the madness content will be added based on the number of like reaction.

---

### Tech Stack & How it's built?

- Rowy is used as a low-code backend for the game
- Next.js for the web application
- Github actions is used:
  - to deploy application in Vercel
  - to check for pull request sent to `master` branch and send the content to Rowy
  - to create contest after 2 hours have passed from previous contest
