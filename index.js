var express = require("express"),
    expressGraphQL = require("express-graphql"),
    { buildSchema } = require("graphql");

const PORT = process.env.port || 1337;

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        course (id: Int!) : Course
        courses (topic: String): [Course]
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

// Dummy data
var dummyCourseData = [
    {
        id: 1,
        title:
            "Cracking the Coding Interview: 189 Programming Questions and Solutions",
        author: "Gayle Laakmann McDowell",
        description:
            "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I've been through this as a candidate and as an interviewer. ",
        topic: "Computer Science",
        url:
            "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=zg_bs_3508_1?_encoding=UTF8&psc=1&refRID=ZFFA098DJNKE8WW3DWSD"
    },
    {
        id: 2,
        title:
            "Grokking Algorithms: An illustrated guide for programmers and other curious people",
        author: "Aditya Bhargava",
        description:
            "Grokking Algorithms is a fully illustrated, friendly guide that teaches you how to apply common algorithms to the practical problems you face every day as a programmer. You'll start with sorting and searching and, as you build up your skills in thinking algorithmically, you'll tackle more complex concerns such as data compression and artificial intelligence. Each carefully presented example includes helpful diagrams and fully annotated code samples in Python.",
        topic: "Computer Science",
        url:
            "https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230/ref=zg_bs_3508_26?_encoding=UTF8&psc=1&refRID=ZFFA098DJNKE8WW3DWSD"
    }
];

// Get Course & Courses functions.
var getCourse = args => {
    const { id } = args;
    return dummyCourseData.filter(coursesData => coursesData.id === id)[0];
};

/**
 * ! In order to get course data that equals the ID provided as an argument.
 * * Client side
 query getSingleCourse($courseID: Int!) {
  course(id: $courseID) {
    title
    author
    description
    topic
    url
  }
}

{ "courseID" : 1 }
 */

var getCourses = args => {
    const { topic } = args;
    return dummyCourseData.filter(
        coursesData => coursesData.topic.toLowerCase() === topic.toLowerCase()
    );
};

/**
 * ! In order to get course data that equals the topic (String) provided.
 * * Client side
query getSingleCourses($courseTopic: String!) {
  courses(topic: $courseTopic) {
    title
    author
    description
    topic
    url
  }
}

{
  "courseTopic": "Computer Science"
}
 */

/**
 * Using Fragments
 query getCoursesWithFragments($courseID1:Int!, $courseID2:Int!){
  course1: course(id: $courseID1){
    ...courseFields
  }
  
  course2: course(id: $courseID2){
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  description
  author
  topic
  url
}
 
 */

// Root Resolver
var rootResolver = {
    course: getCourse,
    courses: getCourses
};

// Setting up an Express server and associate GraphQL endpoint.
var app = express();
app.use(
    "/graphql",
    expressGraphQL({
        schema: schema,
        rootValue: rootResolver,
        graphiql: true
    })
);

app.listen(PORT, () =>
    console.log(`Express GraphQL server now running at *:${PORT}.`)
);
