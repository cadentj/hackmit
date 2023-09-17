## Inspirations
For many college students, university life marks their first experience living away from home. It necessitates newfound responsibilities like cooking, maintaining a regular schedule, and prioritizing self-care. College also represents a period of significant personal and professional growth, requiring students to balance academics, social interactions, extracurricular activities, and the exploration of career paths and self-identity.

Amidst these myriad responsibilities and novel experiences, it's easy to lose sight of long-term goals and even short-term objectives. The motivation behind creating this application arises from the recognition of this common challenge faced by nearly every college student. The app functions as a "personal assistant," digitally aiding students in articulating and monitoring their overarching visions, immediate goals, and desired personal growth.

The app incorporates calendar and journaling features, serving as daily checkpoints to encourage users to contemplate their daily experiences and how they contribute to their broader goals. This is especially beneficial for students balancing numerous commitments, who might find it challenging to pause and consider their overarching life aspirations.

By amalgamating goal-setting, daily journaling, and self-reflection within a unified platform, the application strives to empower college students to navigate this critical phase of their lives with increased self-awareness and intentionality. It's not merely about surviving college; it's about thriving during these transformative years and establishing a robust foundation for the future.

## What it does
Users can create an account to access Janus on our website. From there, Janus prompts for an initial list of attributes, goals, and visions. 
- **Visions** are long-term goals and aspirations. 
- **Goals** are concrete objectives you want to accomplish in the near future.
- **Attributes** are mechanisms and paths for change. These are the stepping stones along which you wish to achieve your goals. 
Then, Janus encourages users to maintain a daily journal. By processing these entries alongside your goals, Janus provides insightful analyses and suggestions to achieve your aspirations and optimize your every day.

## How we built it
For the front-end, we used React.js and Next.js which enables seamless hosting on Vercel.

We developed the back-end with a combination of Python and JavaScript. These back-end scripts served a dual purpose: interfacing with AI APIs and storing user data in a Firebase server.


## Challenges we ran into
- Two of our members had never attended a hackathon. As such, it was a struggle to ideate and work under the time constraints, but we quickly adapted.
- We spent a lot of time engineering prompts for the model to fit cleanly with the backend.  
- We didn’t put enough time into planning at the start so putting parts together at the end was a struggle. 

## Accomplishments we're proud of
- A complete, full stack web app that integrates seamlessly with our model.
- Janus gives detailed, helpful advice for achieving your goals. 
- It all looks pretty sweet too. 

## What we learned
- How to use OpenAI’s API.
- ChatGPT 4 is exponentially better than 3.5.
- Live collaboration with other team members on a code project. 
- Deploying firebase to host a platform with multiple users.

## What's Next?

### Short-term
- Engineer compatibility with Google Calendar API so Janus can schedule and order events based on how they align with your aspirations. 
- Append a place for users to interact with Janus to ask questions about advice. 
- Attend more hackathons😊

### Long-term
- Build distributed systems to process a large number of users.
- Compress or summarize past context to provide better advice.  
- Allow users to visualize their progress and statistics. 
