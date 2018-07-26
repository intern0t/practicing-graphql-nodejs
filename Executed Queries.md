Queries:
---
```graphql
mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
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
```

Query Variables:
---
```json
{
  "id": 2,"topic": "Computer Science"
}
```