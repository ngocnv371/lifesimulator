# README

# Game mechanics:

- The player can unlock skills by spending money or by completing certain tasks.
- The player can apply to different types of jobs, each with different requirements and rewards.
- The player can invest their money into different types of investments, each with different risks and rewards.
- The player can interact with other characters in the game, each with different personalities and backgrounds.
- The player can participate in different events, each with different challenges and rewards.

# Game design:

- The game should have a storyline that is engaging and relevant to the target audience.
- The game should have a simple and intuitive user interface.
- The game should have a tutorial to help the player understand the game mechanics.
- The game should have a leaderboard to show the player’s progress and achievements.
- The game should have a feedback system to allow the player to provide feedback and suggestions.

# Jobs

Scraped from this site: https://money.usnews.com/careers/best-jobs/rankings/the-100-best-jobs

```javascript
var bag = [];
document
  .querySelectorAll("article section ol li div[class*=DetailCardJob]")
  .forEach((e, c) => {
    const name = e.querySelector(".card-body-container h2 a").textContent;
    const listings = e.querySelector(
      ".card-details-container dd a[href*=listings]"
    ).textContent;
    const salary = e.querySelector(
      ".card-details-container dd a[href*=salary]"
    ).textContent;
    const education = e.querySelector(
      ".card-details-container dd a[href*=reviews]"
    );
    console.log(name, salary, education && education.textContent);
    bag.push({
      name,
      salary: +salary.replace(",", "").replace("$", ""),
      listings: +listings.replace(",", ""),
      education: (education && education.textContent) || "",
    });
  });
```

Result: `/src/data/best-jobs-titles-us-2023.json.json`

# Milestones

- Milestone 1: Concept Development - In this milestone, you will finalize the core concept and gameplay mechanics of the game. This includes creating the initial design document, storyboarding, and outlining the game's major systems and features.

- Milestone 2: Prototype Development - In this milestone, you will develop a working prototype of the game. This includes creating the game's basic UI, character creation system, and core gameplay loop.

- Milestone 3: Skill System Development - In this milestone, you will focus on developing the skill system. This includes designing the skill trees, implementing the skill progression system, and balancing the skills to ensure they are useful and engaging for players.

- Milestone 4: Job System Development - In this milestone, you will focus on developing the job system. This includes creating the job market, implementing job requirements, and balancing job benefits and challenges.

- Milestone 5: Investment System Development - In this milestone, you will focus on developing the investment system. This includes creating investment opportunities, implementing the investment system mechanics, and balancing investment risk and reward.

- Milestone 6: Quest System Development - In this milestone, you will focus on developing the quest system. This includes creating a variety of quests, implementing quest mechanics, and balancing quest rewards and challenges.

- Milestone 7: Personal Growth and Victory Condition Development - In this milestone, you will focus on developing the personal growth and victory condition mechanics. This includes implementing personal goal setting and tracking, designing the victory condition milestones, and balancing the game's overall progression.

- Milestone 8: User Interface Development - In this milestone, you will focus on developing the game's user interface. This includes refining the game's UI design, optimizing UI responsiveness and accessibility, and testing the UI with focus groups.

- Milestone 9: Cross-Platform Testing and Optimization - In this milestone, you will focus on testing and optimizing the game for cross-platform compatibility. This includes testing the game on various platforms, optimizing game performance and stability, and ensuring that the game is accessible to all players.

- Milestone 10: Beta Testing and Release - In this milestone, you will focus on conducting beta testing and releasing the game. This includes testing the game with beta testers, gathering feedback, and implementing any necessary changes before releasing the game to the public.