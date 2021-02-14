![Banner](https://imgur.com/lW03Okg.png)
DoDates is team 50's submission for Calgary Hacks 2020. It is a website that allows users to upload course assignment schedules, then add them to their calendars.

Search from available courses
![Courses page](https://imgur.com/dExqXgx.png)
Upload a new course if not offered to your liking
![Upload page](https://i.imgur.com/Jwv02Xk.png)

## Inspiration
Over the course of the past year, students have been facing new challenges as they have adapted to the reality of online education. One problem that has become relevant is the increase in apathy and lack of motivation amongst students, and one of the root causes for this is the lack of organization and structure when it comes to school. This is what inspired us to create DoDate - to allow students to stay organized and on top of their school work and deadlines.

## What it does
DoDate is a web application that students can use in order to automatically add due dates for a given university course directly into their Google Calendars or preferred online calendar service. By simply providing DoDate with a course syllabus or schedule which outline important assessment and assignment dates, DoDates will automatically extract these dates for you and integrate them seamlessly into your existing calendar. This prevents the need of a manual calendar updating process - saving both time and the likelihood of making errors.
How We built it 
DoDate’s backend is built with Javascript, Node.js, and MongoDB and communicates through RESTful APIs to the frontend built with HTML/CSS and Javascript. Calendars are generated through an iCal link on the server when requested by users or applications to allow for calendar integration into DoDate. The primary server is hosted on Google Cloud, using Caddy for static files, reverse proxy, and https. The database is hosted using mongodb atlas.

## Challenges we ran into
A notable challenge that we encountered during our development was parsing user-provided documents to extract the necessary information. Different syllabi have varying formats, and thus it was difficult to standardize the parsing of documents to extract relevant and needed information.

## What's next for DoDates
One feature that we hope to be able to implement in the future is user authentication. By allowing users to create an account, we could provide a more customizable experience where individuals can save/flag courses they are interested in, and have a more personalized experience using the application.

## Built With 
Javascript, Node.js, HTML/CSS, MongoDB, Express, Google Cloud

## Conclusion
COVID-19 has had a huge impact on the wellbeing of individuals, drastically changing our day to day life. We hope that through DoDates, students will be provided with an additional tool to take online classes effectively.

