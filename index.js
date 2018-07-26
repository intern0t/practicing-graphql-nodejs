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

    type Mutation {
        updateCourseTopic (id: Int!, topic: String!) : Course
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
        topic: "Pew Pew Pew",
        url:
            "https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230/ref=zg_bs_3508_26?_encoding=UTF8&psc=1&refRID=ZFFA098DJNKE8WW3DWSD"
    }
];

// Get Course & Courses functions.
var getCourse = args => {
    const { id } = args;
    return dummyCourseData.filter(coursesData => coursesData.id === id)[0];
};

var getCourses = args => {
    const { topic } = args;
    return dummyCourseData.filter(
        coursesData => coursesData.topic.toLowerCase() === topic.toLowerCase()
    );
};

var updateCourseTopic = ({ id, topic }) => {
    dummyCourseData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });

    return dummyCourseData.find(course => course.id === id);
};

// Root Resolver
var rootResolver = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
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
