| METHOD | PATH                               | DESCRIPTION                                 | JSON |
|--------|------------------------------------|---------------------------------------------|------|
| GET    | /                                  | index page render                           |      |
| GET    | /contact                           | contact page render                         |      |
| POST   | /contact                           | contact page handler                        |      |
| GET    | /about-us                          | about us page render                        |      |
| GET    | /signup                            | signup form render                          |      |
| POST   | /signup                            | signup form handler                         |      |
| GET    | /login                             | signin form render                          |      |
| POST   | /login                             | signin form handler                         |      |
| POST   | /logout                            | logout user handler                         |      |
| GET    | /restrooms                         | list of restrooms render                    |      |
| POST   | /restrooms                         | list of restrooms handler                   |      |
| GET    | /restrooms/:id                     | restroom details render                     |      |
| POST   | /restrooms/:id/comments            | list comments render                        |      |
| POST   | /restrooms/:id/comments/create     | create comment handler                      |      |
| GET    | /restrooms/:id/comments/:id/edit   | edit comment render                         |      |
| POST   | /restrooms/:id/comments/:id/edit   | edit comment handler                        |      |
| POST   | /restrooms/:id/comments/:id/delete | delete comment handler                      |      |
| GET    | /users                             | list of users render - ONLY ADMIN           |      |
| GET    | /users/my-profile                  | profile render                              |      |
| GET    | /users/:id                         | specific user profile render  -  ONLY ADMIN |      |
| GET    | /users/:id/edit                    | edit user render                            |      |
| POST   | /users/:id/edit                    | edit user handler                           |      |
| POST   | /users/:id/delete                  | delete user handler - ONLY ADMIN            |      |
| GET    | /api/restrooms/:id/                | get specific restrooms from handler         | ✅   |
